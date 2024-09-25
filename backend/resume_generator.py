import subprocess
import os

def generate_resume_pdf(latex_content, output_path):
    # Ensure the output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Write the LaTeX content to a temporary .tex file
    tex_file_path = output_path + '.tex'
    # print(tex_file_path)
    with open(tex_file_path, 'w') as file:
        file.write(latex_content)
    # print("latex file created")
    # Compile the .tex file to PDF
    try:
        subprocess.run(['pdflatex', '-output-directory', os.path.dirname(output_path), tex_file_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        # print(f"Resume generated: {output_path}.pdf")
        return True
    except subprocess.CalledProcessError:
        print("Error: PDF generation failed. Check your LaTeX syntax.")
        return False


if __name__ == "__main__":
    # This block only runs if the script is executed directly
    # It's useful for testing the function
    latex_content = r"""
    \documentclass[11pt]{article}
    \begin{document}
    \centerline{\Huge John Doe}
    \end{document}
    """
    generate_resume_pdf(latex_content, 'output/test_resume')