from os import truncate
from transformers import AutoModel, AutoTokenizer
import torch

def encode_list(model_path:str, job_desc):
    tokenizer = AutoTokenizer.from_pretrained('t5-small',
     truncate = True,
      padding = True)
    job_desc = tokenizer.encode(job_desc, return_tensors = 'pt')
    model = AutoModel.from_pretrained(model_path)
    return torch.mean(model.encoder(input_ids = 
    job_desc).last_hidden_state, dim = 1)[0].detach().numpy()

print(encode_list("./Clustering-Jobs/DL-Models/", "Hello Guys"))