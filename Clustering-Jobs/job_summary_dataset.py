from torch.utils.data import Dataset
import pandas as pd

class JobSummaryDataset(Dataset):
    
    def __init__(self, data_src:str, tokenizer):
        data = pd.read_excel(data_src).dropna()
        self.data = data
        texts = data.iloc[:, 7].apply(lambda x: "summarize: " + x).values.tolist()
        summ = data.iloc[:, 8].values.tolist()
        self.encodings = tokenizer(texts, max_length = 1024, 
        padding = True, 
        truncation=True, 
        return_tensors="pt").input_ids
        self.labels = tokenizer(summ, 
        truncation = True, padding = True,
         max_length = 256
        ,return_tensors="pt").input_ids
    
    def __getitem__(self, idx:int):
        item = {}
        item["input_ids"] = self.encodings[idx]
        item['labels'] = self.labels[idx]
        return item  
    
    def __len__(self):
        return len(self.data)