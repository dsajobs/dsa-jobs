from torch.utils.data import Dataset
from torch import device
import pandas as pd

class JobSummaryLoader(Dataset):
    
    def __init__(self, data_src:str, device:device):
        self.data = pd.read_csv(data_src)
        self.device = device
    
    def __getitem__(self, idx:int):
        return (self.data.iloc[idx, 7], self.data.iloc[idx, 8])
    
    def __len__(self):
        return len(self.data)