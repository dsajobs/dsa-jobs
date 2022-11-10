import transformers
from transformers import AutoTokenizer, AutoModel
import pandas as pd
import numpy as np
from tqdm import tqdm
import torch
from torch.optim import Adam
from torch.nn import LazyLinear, Softmax, Sequential, Module, CrossEntropyLoss
from torch.utils.data import Dataset, DataLoader

resume_data = pd.read_csv("Clustering-People/data/UpdatedResumeDataSet.csv")
resume_data_proc = pd.get_dummies(data = resume_data, columns=["Category"])

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

class Model(Module):
    def __init__(self):
        super().__init__()
        self.bert = AutoModel.from_pretrained("bert-base-cased")
        self.lin = LazyLinear(resume_data.Category.nunique())
        self.sMax = Softmax()
        self.lossFxn = CrossEntropyLoss()

    def forward(self, data_dict):
        output = self.bert(data_dict["input_ids"], attention_mask=data_dict["attention_mask"])
        output = self.lin(output.pooler_output)
        output = self.sMax(output)
        loss = self.lossFxn(output, data_dict["labels"])
        return loss, output

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

opt = Adam(model.parameters(), lr = 1e-6)

res_loader = DataLoader(
    dataset = train_dataset,
    batch_size = 16,
    shuffle = True
)

for epoch in range(10):
    for data in tqdm(res_loader):
    
        opt.zero_grad()
        loss, output = model(data)
        loss.backward()
        opt.step()
    print(loss.detach())

model.save_pretrained(f"./DL-Models/res_classifier")