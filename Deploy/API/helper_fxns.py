import nltk
from PyPDF2 import PdfReader

def read_resume(filename):
    reader = PdfReader(filename)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text