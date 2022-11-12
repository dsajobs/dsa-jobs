import pandas as pd
from transformers import AutoModel, AutoTokenizer
import torch
import numpy as np
from tqdm import tqdm
from torch.utils.data import Dataset, DataLoader
from torch.nn import Module, CosineSimilarity
from Models import Model

enc_model = AutoModel.from_pretrained("Clustering-Jobs/DL-Models")
tokenizer = AutoTokenizer.from_pretrained('t5-small',
     truncate = True,
      padding = True)

res_model = 

def encode_list(model:str, job_desc): 
    job_desc = tokenizer.encode(job_desc, return_tensors = 'pt')
    return torch.mean(model.encoder(input_ids = 
    job_desc).last_hidden_state, dim = 1)[0].detach().numpy()

jdb_bi = pd.read_csv("Clustering-Jobs/data/output-jdb-bi.csv")["Job Description"].dropna()
jdb_ds = pd.read_csv("Clustering-Jobs/data/output-jdb-ds.csv")["Job Description"].dropna()

jdb_bi = jdb_bi[jdb_bi != "Not Found"]
jdb_ds = jdb_ds[jdb_ds != "Not Found"]

res_data = pd.read_csv("Clustering-People/data/UpdatedResumeDataset.csv")
res_ds = res_data[res_data["Category"] == "Data Science"]["Resume"]
res_bi = res_data[res_data["Category"] == "Business Analyst"]["Resume"]
print(len(jdb_bi), len(jdb_ds))
print(len(res_bi), len(res_ds))

class ResumeJobDataset(Dataset):

    def __init__(self, jobs_data, res_data):
        self.jobs_data = jobs_data
        self.res_data = res_data
    
    def __len__(self):
        return (479 + 489) * (40 + 28)

    def __getitem__(self, index):

        if index < 40 * 479:
            return (self.jobs_data[0].iloc[index // 40], self.res_data[0].iloc[index % 40]), 1
        index = index - 40 * 479

        if index < 489 * 40:
            return (self.jobs_data[1].iloc[index // 40], self.res_data[0].iloc[index % 40]), 0
        index = index - 489 * 40

        if index < 479 * 28:
            return (self.jobs_data[0].iloc[index // 28], self.res_data[1].iloc[index % 28]), 1 
        index = index - 479 * 28

        if index < 489 * 28:
            return (self.jobs_data[1].iloc[index // 28], self.res_data[1].iloc[index % 28]), 0

print(ResumeJobDataset((jdb_bi, jdb_ds), (res_bi, res_ds)))

class MatchModel(Module):

    def __init__(self, encoder_jdb, encoder_res):
        super().__init__()
        self.encoder_jdb = encoder_jdb
        self.encoder_res = encoder_res
        self.cos_sim = CosineSimilarity()
    
    def forward(self, jdb, res):
        enc_jdb = self.encoder_jdb.encode(jdb)
        enc_res = self.encoder_res.encode(res) 
        return self.cos_sim(enc_jdb, enc_res)

