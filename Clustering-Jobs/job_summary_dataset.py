from torch.utils.data import Dataset
from torch import device
import torch
import pandas as pd

class JobSummaryDataset(Dataset):
    
    def __init__(self, data_src:str, tokenizer):
        data = pd.read_excel(data_src)
        texts = data.iloc[:, 7]
        summ = data.iloc[:, 8]
        self.encodings = tokenizer(texts, truncation=True, padding=True , return_tensors="pt").input_ids
        self.labels = tokenizer(summ, truncation = True, padding = True, return_tensors="pt").input_ids
    
    def __getitem__(self, idx:int):
        item = {}
        item["input_ids"] = self.encodings[idx]
        item['labels'] = self.labels[idx]
        return item  
    
    def __len__(self):
        return len(self.data)