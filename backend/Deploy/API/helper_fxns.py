import nltk
from collections import Counter
from Models import Model, MatchModel
import string
from nltk import word_tokenize
from PyPDF2 import PdfReader
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from transformers import AutoModel, AutoTokenizer
import torch 

stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))

enc_model = AutoModel.from_pretrained("DL-Models-dep/job_class")
tokenizer = AutoTokenizer.from_pretrained('t5-small',
     truncate = True,
      padding = True)

res_model = Model()
res_model.load_state_dict(torch.load("DL-Models-dep/res_classifier"))

bert_tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

model = MatchModel(tokenizer,bert_tokenizer, enc_model, res_model)

def read_resume(filename):
    reader = PdfReader(filename)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def process_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = word_tokenize(text)
    words = [stemmer.stem(word) for word in words if word not in stop_words]
    return set(words)

def compute_overall_match(resume, job):
    return model(resume, job)

def compute_dist_score(co_coords, us_coords): 
    return (co_coords[0] - us_coords[0])**2 + (co_coords[1] - us_coords[1])**2

def compute_skill_match(resume, job):
    resume_counts = process_text(resume)
    job_counts = process_text(job)
    with open('data_for_model/Tools.txt', 'r') as file:
        data = set(file.read().rstrip().lower().split(","))
    jdb = job_counts.intersection(data)
    res = resume_counts.intersection(data)
    return len(res.intersection(jdb)) / (len(jdb) + 1)
    
def compute_soft_match(resume, job):
    resume_counts = process_text(resume)
    job_counts = process_text(job)
    with open('data_for_model/Soft_Skills.txt', 'r') as file:
        data = set(file.read().rstrip().lower().split(","))
    jdb = job_counts.intersection(data)
    res = resume_counts.intersection(data)
    return len(res.intersection(jdb)) / (len(jdb) + 1)