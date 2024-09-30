import json
import os
import re
import uuid
from flask import Flask, request, render_template, jsonify, send_file, send_from_directory
from werkzeug.utils import secure_filename
import PyPDF2
from openai import OpenAI
from flask_cors import CORS
from dotenv import load_dotenv
from queue import Queue
from threading import Thread
from resume_generator import generate_resume_pdf

from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class ResumeData(BaseModel):
    class ContactInfo(BaseModel):
        email: str
        phone: str
        location: str
        linkedin: Optional[str] = None
        github: Optional[str] = None
        personal_website: Optional[str] = None
        other: Optional[str] = None

    class WorkExperience(BaseModel):
        company: str
        position: str
        start_date: str
        end_date: Optional[str] = None
        bullet_points: List[str]

    class Education(BaseModel):
        school: str
        degree: str
        start_date: str
        end_date: Optional[str] = None

    full_name: str
    contact_info: ContactInfo
    work_experience: List[WorkExperience]
    education: List[Education]
    skills: Optional[List[str]] = None

load_dotenv()

app = Flask(__name__, static_folder='C:\\Users\\musa\\Desktop\\resumeai\\frontend\\dist')
CORS(app)
app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER', 'C:\\Users\\musa\\Desktop\\resumeai\\backend\\uploads')
app.config['OUTPUT_FOLDER'] = os.environ.get('OUTPUT_FOLDER', 'C:\\Users\\musa\\Desktop\\resumeai\\backend\\output')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# Set your OpenAI API key
client = OpenAI()

upload_queue = Queue()
task_results = {}

def process_queue():
    while True:
        task = upload_queue.get()
        process_upload(task)
        upload_queue.task_done()

queue_thread = Thread(target=process_queue, daemon=True)
queue_thread.start()

def load_latex_template(template_id):
    with open(f'./resumetemplates/{template_id}.tex', 'r') as file:
        return file.read()

def convert_resume_to_latex(template_id, text):
    latex_template = load_latex_template(template_id)
    prompt = create_enhanced_prompt(text, latex_template)
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert at extracting information from resumes and converting them into compilable LaTeX documents. Follow the given instructions precisely and respond only with valid LaTeX."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=2500,
        temperature=0.1  # Even lower temperature for more consistent output
    )
    
    return response.choices[0].message.content

def create_enhanced_prompt(text, template):
    return f"""
    Convert the following resume text into a LaTeX document using the provided template. Replace placeholders ({{{{placeholder}}}}) with appropriate information.

    Resume Processing Instructions:
    1. Extract (ONLY IF AVAILABLE) and use: full name, phone number, location, address, email, website, GitHub, other social media links, summary, skills, work experience, projects, volunteer experience, education, and research.
    2. For dates, use 'Month Year' format (e.g., Jan 2023) or just 'Year' if month is unavailable. Use 'Present' for current positions or ongoing projects.
    3. For skills, focus on one-word or short-phrase items like languages, tools, frameworks, etc.
    4. In work experience, include company, position, location, dates, and bullet points for responsibilities/achievements.
    5. For projects, include name, dates, description, technologies used, and bullet points for key features or outcomes.
    6. In education, include school, program, start date, and expected graduation date.

    LaTeX Formatting Instructions:
    1. Remove any sections not present in the resume (e.g., if no projects or volunteer experience, remove that entire section).
    2. Escape all hashtags (\\#) and percentage signs (\\%).
    3. Use three hyphens (---) instead of an emdash.
    4. Use single quotes (') instead of apostrophes (').
    5. Shorten long role names or teams. Use abbreviations like 'Dept.' for department.
    6. Update job position names for clarity if needed.
    7. Do NOT include any Unicode or special characters or emojis.
    8. Remove sections for any not present (e.g., if given text has no projects, don't create the Projects section)
    9. Remove section dividers for any information not present (e.g., if no GitHub link, don't create the divider for it).
    10. Maintain the order of sections as found in the template

    LaTeX Template:
    {template}

    Resume Text:
    {text}

    Your response must contain ONLY the complete, filled-out LaTeX document. Do not include any explanatory text, code block delimiters (```), or the word "latex" at the beginning. The response should start with \documentclass.
    """

def process_upload(task):
    filepath, filename, template_id, task_id = task['filepath'], task['filename'], task['templateId'], task['id']
    try:
        with open(filepath, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ''.join(page.extract_text() for page in pdf_reader.pages)
        
        latex_content = convert_resume_to_latex(template_id, text)

        output_filename = f"resume_{filename.rsplit('.', 1)[0]}_{uuid.uuid4().hex[:8]}"
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        
        success = generate_resume_pdf(latex_content, output_path)

        if success:
            task_results[task_id] = {
                "status": "completed",
                "pdf_url": f"/pdf/{output_filename}.pdf",
                "download_url": f"/download/{output_filename}.pdf"
            }
        else:
            task_results[task_id] = {"status": "failed"}
    except Exception as e:
        print(f"Error processing task {task_id}: {str(e)}")
        task_results[task_id] = {"status": "failed"}
    finally:
        os.remove(filepath)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and file.filename.endswith('.pdf'):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        task_id = uuid.uuid4().hex[:8]
        task = {
            "filepath": filepath,
            "filename": filename,
            "templateId": request.form['templateId'],
            "id": task_id
        }
        print("adding task to queue")
        upload_queue.put(task)
        print("returning...")
        return jsonify({
            "message": "File added to queue",
            "task_id": task_id
        })

@app.route('/task-status/<task_id>', methods=['GET'])
def get_task_status(task_id):
    result = task_results.get(task_id)
    if result:
        return jsonify(result)
    elif task_id in [task['id'] for task in list(upload_queue.queue)]:
        return jsonify({"status": "queued"})
    else:
        return jsonify({"status": "processing"})

@app.route('/extract-resume', methods=['POST'])
def extract_resume():
    task_id = request.json.get('taskId')
    result = task_results.get(task_id)
    if not result or result['status'] != 'completed':
        return jsonify({"error": "Invalid task or task not completed"}), 400

    pdf_filename = result['pdf_url'].split('/')[-1]
    pdf_path = os.path.join(app.config['OUTPUT_FOLDER'], pdf_filename)

    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ''.join(page.extract_text() for page in pdf_reader.pages)

    # Use GPT-4 to extract structured data from the resume text
    prompt = f"""
    Extract information from this resume following the JSON schema provided.
    
    Format dates using Month Year. Use Present for current.

    Resume Text:
    {text}
    """

    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert at structured data extraction. You will be given unstructured text from a resume and should convert it into the given structure."},
            {"role": "user", "content": prompt}
        ],
        response_format=ResumeData
    )
    print(response.choices[0].message.content)
    extracted_data = json.loads(response.choices[0].message.content)
    return jsonify(extracted_data)

@app.route('/pdf/<filename>')
def serve_pdf(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename, mimetype='application/pdf')

@app.route('/download/<filename>')
def download_file(filename):
    return send_file(os.path.join(app.config['OUTPUT_FOLDER'], filename),
                     as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)