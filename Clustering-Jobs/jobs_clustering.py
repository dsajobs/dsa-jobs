from sklearn.cluster import KMeans
import pandas as pd
from transformers import AutoModel, AutoTokenizer
import torch
import numpy as np
from tqdm import tqdm

model = AutoModel.from_pretrained("Clustering-Jobs/DL-Models")
tokenizer = AutoTokenizer.from_pretrained('t5-small',
     truncate = True,
      padding = True)
def encode_list(model:str, job_desc): 
    job_desc = tokenizer.encode(job_desc, return_tensors = 'pt')
    return torch.mean(model.encoder(input_ids = 
    job_desc).last_hidden_state, dim = 1)[0].detach().numpy()

linkedin_jobs = pd.read_csv("Clustering-Jobs/data/linkedin_jobs.csv", encoding='latin-1')["Job Description"].dropna()
jdb_bi = pd.read_csv("Clustering-Jobs/data/output-jdb-bi.csv")["Job Description"].dropna()
jdb_da = pd.read_csv("Clustering-Jobs/data/output-jdb-da.csv",  delimiter=';')["Job Description"].dropna()
jdb_ds = pd.read_csv("Clustering-Jobs/data/output-jdb-ds.csv")["Job Description"].dropna()

out_dict = {"job_desc" : [], "encoding" : []}

for i in [linkedin_jobs, jdb_bi, jdb_da, jdb_ds]:
    out_dict["job_desc"].extend(list(i))
    for s in tqdm(list(i)):
      out_dict["encoding"].append(encode_list(model, s))

out = pd.DataFrame.from_dict(out_dict)

out["labels"] = KMeans(n_clusters = 3, random_state=3101).fit(np.array(out_dict["encoding"])).labels_

out.to_csv("Clustering-Jobs/data/processed_jobs.csv")