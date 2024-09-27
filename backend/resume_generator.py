import subprocess
import os
import traceback
import sys
import re

def remove_special_unicode(text):
    # Replace the Unicode replacement character (U+FFFD) with a space
    return re.sub('\ufffd', ' ', text)

def generate_resume_pdf(latex_content, output_path):
    # Ensure the output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
   
    # Remove special Unicode characters
    latex_content = remove_special_unicode(latex_content)

    # Write the LaTeX content to a temporary .tex file
    tex_file_path = output_path + '.tex'
    try:
        with open(tex_file_path, 'w', encoding='utf-8') as file:
            file.write(latex_content)
        print(f"LaTeX file created: {tex_file_path}")
    except Exception as e:
        print(f"Error creating LaTeX file: {str(e)}")
        traceback.print_exc()
        return False

    # Compile the .tex file to PDF
    try:
        print("Running pdflatex...")
        process = subprocess.Popen(
            ['latexmk', '-pdf', '-interaction=nonstopmode', '-outdir=./output', tex_file_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )
       
        # Set a timeout of 60 seconds
        try:
            stdout, stderr = process.communicate(timeout=60)
        except subprocess.TimeoutExpired:
            process.kill()
            print("Error: pdflatex process timed out after 30 seconds")
            stdout, stderr = process.communicate()
       
        # Print the full output
        print("pdflatex stdout:")
        print(stdout)
        print("pdflatex stderr:")
        print(stderr)
       
        if not os.path.exists(output_path + ".pdf") and process.returncode != 0:
            print(f"Error: pdflatex returned non-zero exit code: {process.returncode}")
            return False
       
        print(f"Resume generated: {output_path}.pdf")
        return True
    except Exception as e:
        print(f"Error during PDF generation: {str(e)}")
        traceback.print_exc()
        return False

if __name__ == "__main__":
    # This block only runs if the script is executed directly
    # It's useful for testing the function
    latex_content = r"""
    \documentclass[11pt]{article}
    \begin{document}
    \centerline{\Huge John Doe�Special Character}
    \end{document}
    """
    success = generate_resume_pdf(latex_content, 'output/test_resume')
    if not success:
        print("PDF generation failed.")
    sys.exit(0 if success else 1)