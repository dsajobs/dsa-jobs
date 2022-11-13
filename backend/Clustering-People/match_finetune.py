import pandas as pd
from transformers import AutoModel, AutoTokenizer
import torch
import numpy as np
from tqdm import tqdm
from torch.utils.data import Dataset, DataLoader
from torch.nn import Module, CosineSimilarity, LazyLinear
from Models import Model
from torch.optim import Adam

enc_model = AutoModel.from_pretrained("Clustering-Jobs/DL-Models")
tokenizer = AutoTokenizer.from_pretrained('t5-small',
     truncate = True,
      padding = True)

res_model = Model()
res_model.load_state_dict(torch.load("Clustering-People/DL-Models/res_classifier"))
bert_tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

def encode_list(model:str, job_desc): 
    job_desc = tokenizer.encode(job_desc, return_tensors = 'pt')
    return torch.mean(model.encoder(input_ids = 
    job_desc).last_hidden_state, dim = 1)[0].detach().numpy()

jdb_bi = pd.read_csv("Clustering-Jobs/data/output-jdb-bi.csv")["Job Description"].dropna()
jdb_ds = pd.read_csv("Clustering-Jobs/data/output-jdb-ds.csv")["Job Description"].dropna()

jdb_bi = jdb_bi[jdb_bi != "Not Found"]
jdb_ds = jdb_ds[jdb_ds != "Not Found"]

res_data = pd.read_csv("Clustering-People/data/UpdatedResumeDataset.csv")
res_ds =res_data[res_data["Category"] == "Data Science"]["Resume"].dropna()
res_bi = res_data[res_data["Category"] == "Business Analyst"]["Resume"].dropna()
print(len(jdb_bi), len(jdb_ds))
print(len(res_bi), len(res_ds))

class ResumeJobDataset(Dataset):

    def __init__(self, jobs_data, res_data):
        self.jobs_data = jobs_data
        self.res_data = res_data
    
    def __len__(self):
        return (479 + 489) * (40 + 28)

    def __getitem__(self, index):
        if index < 28 * 479:
            return (self.jobs_data[0].iloc[index // 28], 
            self.res_data[0].iloc[index % 28]), 1
        index = index - 28 * 479
        
        if index < 489 * 28:
            return (self.jobs_data[1].iloc[index // 28],
             self.res_data[0].iloc[index % 28]), 0
        index = index - 489 * 28

        if index < 479 * 40:
            return (self.jobs_data[0].iloc[index // 40], 
            self.res_data[1].iloc[index % 40]), 0
        index = index - 479 * 40

        if index < 489 * 40:
            return (self.jobs_data[1].iloc[index // 40],
            self.res_data[1].iloc[index % 40]), 1

class MatchModel(Module):

    def __init__(self, tokenizer, bert_tokenizer, encoder_jdb, encoder_res):
        super().__init__()
        self.tokenizer = tokenizer
        self.bert_tokenizer = bert_tokenizer
        self.encoder_jdb = encoder_jdb.encoder
        self.lin = LazyLinear(512)
        self.encoder_res = encoder_res.bert
        self.cos_sim = CosineSimilarity()
    
    def forward(self, jdb, res):
        job_desc = self.tokenizer(list(jdb), max_length = 1024, 
        padding = True, 
        truncation=True, 
        return_tensors="pt").input_ids
        enc_jdb = torch.mean(self.encoder_jdb(input_ids = job_desc).last_hidden_state, dim = 1)

        encoding_res = self.bert_tokenizer.batch_encode_plus(
            res,
            add_special_tokens=True,    
            max_length=128,
            return_token_type_ids=False,
            padding="max_length",
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )
        res = dict(
            input_ids=encoding_res["input_ids"].flatten().unsqueeze(0),
            attention_mask=encoding_res["attention_mask"].flatten().unsqueeze(0),
        )
        print(res)
        enc_res = self.encoder_res(res["input_ids"], attention_mask = res["attention_mask"]).pooler_output
        enc_res = self.lin(enc_res)
        return self.cos_sim(enc_jdb, enc_res)
    
matchModel = MatchModel(tokenizer, bert_tokenizer, enc_model, res_model)

res_loader = DataLoader(
    dataset = ResumeJobDataset((jdb_bi, jdb_ds), (res_bi, res_ds)),
    batch_size = 320,
    shuffle = True
)

opt = Adam(matchModel.parameters(), lr = 1e-5)

for i in range(100):
    for data, y in tqdm(res_loader):
        opt.zero_grad() 
        output = matchModel(data[0], data[1])

