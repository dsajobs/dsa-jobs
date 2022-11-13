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

enc_model = AutoModel.from_pretrained("Clustering-Jobs/")
tokenizer = AutoTokenizer.from_pretrained('t5-small',
     truncate = True,
      padding = True)

res_model = Model()
res_model.load_state_dict(torch.load("Clustering-People/DL-Models/res_classifier"))

bert_tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

model = MatchModel(tokenizer,bert_tokenizer, enc_model, bert_tokenizer)

def read_resume(filename):
    reader = PdfReader(filename)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def process_text():
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = word_tokenize(text)
    words = [word for word in words if word not in stop_words]
    return Counter(words)

def compute_overall_match(resume, job):
    return model(resume, job)

def compute_dist_score(co_coords, us_coords): 
    return (co_coords[0] - us_coords[0])**2 + (co_coords[1] - us_coords[1])**2

def compute_skill_match(resume, job):
    return 0