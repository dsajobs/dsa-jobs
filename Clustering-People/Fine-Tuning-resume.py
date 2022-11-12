import transformers
from transformers import AutoTokenizer, AutoModel
import pandas as pd
import numpy as np
from tqdm import tqdm
import torch
from torch.optim import Adam
from Models import Model
from torch.utils.data import Dataset, DataLoader

resume_data = pd.read_csv("Clustering-People/data/UpdatedResumeDataSet.csv")
resume_data_proc = pd.get_dummies(data = resume_data, columns=["Category"])

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

class ResumeDataset(Dataset):

    def __init__(self, data, tokenizer, max_len):
        
        self.data = data
        self.tokenizer = tokenizer
        self.max_len = max_len
    
    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        data_row = self.data.iloc[idx]
        resume_text = data_row.Resume
        labels = data_row[1:].astype(np.float)

        encoding = self.tokenizer.encode_plus(
            resume_text,
            add_special_tokens=True,    
            max_length=self.max_len,
            return_token_type_ids=False,
            padding="max_length",
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        return dict(
            resume_text=resume_text,
            input_ids=encoding["input_ids"].flatten(),
            attention_mask=encoding["attention_mask"].flatten(),
            labels=torch.FloatTensor(labels)
        )


train_dataset = ResumeDataset(
  resume_data_proc,
  tokenizer,
  128
)

model = Model()

for param in model.bert.parameters():
    param.requires_grad = False

opt = Adam(model.parameters(), lr = 1e-5)

res_loader = DataLoader(
    dataset = train_dataset,
    batch_size = 32,
    shuffle = True
)

for epoch in range(100):
    loss_total = 0
    for data in tqdm(res_loader):
    
        opt.zero_grad()
        loss, output = model(data)
        loss.backward()
        loss_total += loss.detach()
        opt.step()
    
    if epoch == 70:
        for param in model.bert.parameters():
            param.requires_grad = True
        opt = Adam(model.parameters(), lr = 1e-6)

    print(loss_total)

torch.save(model.state_dict(), f"Clustering-People/DL-Models/res_classifier")