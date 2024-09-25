import os
import re
import uuid
from flask import Flask, request, render_template, jsonify, send_file, send_from_directory
from werkzeug.utils import secure_filename
import PyPDF2
from openai import OpenAI
from flask_cors import CORS
from resume_generator import generate_resume_pdf

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER', '/tmp/uploads')
app.config['OUTPUT_FOLDER'] = os.environ.get('OUTPUT_FOLDER', '/tmp/output')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# Set your OpenAI API key
client = OpenAI(
    api_key=os.environ.get('OPENAI_API_KEY')
)

def extract_info_with_gpt(text):
    prompt = r"""
    Extract the relevant information from the given resume text and use it to populate the following LaTeX resume template. Replace the placeholders (enclosed in double curly braces) with the extracted information. Ensure that the LaTeX syntax remains valid.

    \documentclass[11pt]{article}
    \usepackage[a4paper, top=0.5in, bottom=0.5in, left=0.5in, right=0.5in]{geometry}
    \usepackage{XCharter}
    \usepackage[T1]{fontenc}
    \usepackage[utf8]{inputenc}
    \usepackage{enumitem}
    \usepackage[hidelinks]{hyperref}
    \usepackage{titlesec}
    \raggedright
    \pagestyle{empty}

    \input{glyphtounicode}
    \pdfgentounicode=1

    \titleformat{\section}{\bfseries\large}{}{0pt}{}[\vspace{1pt}\titlerule\vspace{-6.5pt}]

    \renewcommand\labelitemi{$\vcenter{\hbox{\small$\bullet$}}$}
    \setlist[itemize]{itemsep=-2pt, leftmargin=12pt}

    \begin{document}

    % NAME
    \centerline{\Huge {{full_name}}}

    \vspace{5pt}

    % CONTACT INFORMATION (email, website, github, phone number, etc)
    \centerline{\href{mailto:{{email}}}{{{email}}} | \href{{{website}}}{{{website_display}}} | \href{{{github}}}{{{github_display}}}}

    \vspace{-10pt}

    % SKILLS
    \section*{Skills}
    \textbf{Category} Skill 1, Skill 2, etc ...

    \vspace{-10.5pt}

    % EXPERIENCE
    \section*{Experience}
    {{#each work_experience}}
    \textbf{{{position}},} {{{company}}} -- {{location}} \hfill {{start_date}} -- {{end_date}}
    \vspace{-9pt}
    \begin{itemize}
        {{#each bullet_points}}
        \item {{this}}
        {{/each}}
    \end{itemize}

    {{/each}}

    \vspace{-18.5pt}

    % PROJECTS
    \section*{Projects}
    {{#each projects}}
    \textbf{{{name}}} \hfill {{start_date}} -- {{end_date}
    \vspace{-9pt}
    \begin{itemize}
        \item {{description}}
        \item Technologies used: {{technologies}}
        {{#each bullet_points}}
        \item {{this}}
        {{/each}}
    \end{itemize}

    {{/each}}

    \vspace{-18.5pt}

    % VOLUNTEERING
    \section*{Volunteering}
    {{#each volunteer_experience}}
    \textbf{{{role}},} {{{organization}}} \hfill {{start_date}} -- {{end_date}}
    \vspace{-9pt}
    \begin{itemize}
        {{#each bullet_points}}
        \item {{this}}
        {{/each}}
    \end{itemize}

    {{/each}}

    \vspace{-18.5pt}

    % EDUCATION
    \section*{Education}
    \textbf{{{school}}} -- {{program}} \hfill {{start_date}} -- {{graduation_date}}

    \end{document}

    Instructions:
    1. Extract the following information from the resume if it is available:
    - Full name
    - Phone number
    - Address
    - Email address
    - Website
    - GitHub profile
    - Skills (mostly one word skills, likely languages, tools, frameworks, etc)
    - Work experience (including company, position, location, dates, and bullet points)
    - Projects (including name, dates, description, technologies, and bullet points)
    - Volunteer experience (including organization, role, dates, and bullet points)
    - Education (including school, program, start date, and expected graduation date)

    2. Replace the placeholders in the template with the extracted information.
    3. For dates, use the format Month Year (Jan, Feb, Mar, Apr, May, June, July, Aug, Sept, Oct, Nov, Dec) if month is available, or Year if only year is available. Use 'Present' for current positions or ongoing projects.
    4. Ensure that all LaTeX syntax remains valid, especially when filling in bullet points.
    5. If any section is not present in the resume (e.g., no projects or volunteer experience), remove that entire section from the template.
    6. Escape all hashtags and percentage signs with a \
    7. Instead of using an emdash (which will cause an error), use 3 hyphens. e.g. "---"
    8. Do NOT use these quotes: '. Whenever you need to use a quote, use this: '
    9. Create sections as needed (e.g. research, etc)
    10. Remove sections as needed (e.g. if there is no github link, don't create the divider for it)
    11. Shorten long role names or teams. Use abbreviations like Dept. for department. 
    12. You can update job position names 

    Please provide the complete, filled-out LaTeX document as your response. Do NOT include ANY other text, this especially includes backticks (`) at the beginning and end, as well as the mention of 'latex' after the first backticks. I repeat, DO NOT includes (```latex at the beginning and ``` at the end of the message)

    Resume text:
    """ + text

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that extracts information from resumes."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=2500
    )

    return response.choices[0].message.content

def validate_latex(latex_content):
    prompt = f"""
    Please validate and correct the following LaTeX content for a resume. Ensure it meets these specific criteria in addition to having correct LaTeX syntax:
    2. Each experience header (position, company, location, date range) should be on a single line and less than 80 characters.
    3. There should be no empty sections. Remove any section that doesn't have content.
    11. Ensure there is the correct spacing between subsections (e.g. under Experience use vspace -9pt before the bullet point list)

    LaTeX content to validate and correct:

    {latex_content}

    Please provide ONLY the corrected LaTeX content that meets all these criteria. Do not provide any preamble or explanations. Do not begin with 'latex' or triple backticks or quotes.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a LaTeX expert specialized in resume formatting. Your task is to validate and correct LaTeX resume content to ensure it meets specific formatting criteria. You only respond with a complete LaTeX document."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=2500
    )

    # Extract the corrected LaTeX content and any explanations
    full_response = response.choices[0].message.content
    return full_response

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        if file and file.filename.endswith('.pdf'):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            with open(filepath, 'rb') as pdf_file:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                text = ''
                for page in pdf_reader.pages:
                    text += page.extract_text()
            
            latex_content = extract_info_with_gpt(text)
            
            validated_latex_content = latex_content
            print(validated_latex_content)
            
            os.remove(filepath)
            
            # Generate a unique identifier
            unique_id = uuid.uuid4().hex[:8]
            
            # Create a unique filename for the output
            output_filename = f"resume_{filename.rsplit('.', 1)[0]}_{unique_id}"
            output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
            
            success = generate_resume_pdf(validated_latex_content, output_path)
            
            if success:
                return jsonify({
                    "message": "Resume generated successfully",
                    "pdf_url": f"/pdf/{output_filename}.pdf",
                    "download_url": f"/download/{output_filename}.pdf"
                })
            else:
                return jsonify({
                    "error": "Failed to generate PDF. Please check the LaTeX syntax.",
                }), 500
    
    return render_template('upload.html')

@app.route('/pdf/<filename>')
def serve_pdf(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename, mimetype='application/pdf')

@app.route('/download/<filename>')
def download_file(filename):
    return send_file(os.path.join(app.config['OUTPUT_FOLDER'], filename),
                     as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)