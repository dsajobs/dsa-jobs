import nltk
import string
from nltk import word_tokenize
from PyPDF2 import PdfReader
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))
model = 

def read_resume(filename):
    reader = PdfReader(filename)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = word_tokenize(text)
    words = [word for word in words if word not in stop_words]
    return words

def compute_dist_score(co_coords, us_coords): 
    return (co_coords[0] - us_coords[0])**2 + (co_coords[1] - us_coords[1])**2

def compute_skill_match(resume, job):
    return model()