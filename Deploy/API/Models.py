from torch.nn import LazyLinear, Softmax, Sequential, Module, CrossEntropyLoss, GELU, CosineSimilarity
from transformers import AutoModel
import torch

class Model(Module):
    def __init__(self):
        super().__init__()
        self.bert = AutoModel.from_pretrained("bert-base-cased")
        self.lin = Sequential(
            LazyLinear(250),
            GELU(),
            LazyLinear(25),
            )
        self.sMax = Softmax()
        self.lossFxn = CrossEntropyLoss()

    def forward(self, data_dict):
        output = self.bert(data_dict["input_ids"], attention_mask=data_dict["attention_mask"])
        output = self.lin(output.pooler_output)
        output = self.sMax(output)
        loss = self.lossFxn(output, data_dict["labels"])
        return loss, output

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