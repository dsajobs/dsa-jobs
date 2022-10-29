from job_summary_dataset import JobSummaryDataset
import torch
from transformers import AutoTokenizer, AutoModel
from transformers import AutoModelForSeq2SeqLM
from transformers import DataCollatorForSeq2Seq
from transformers import Seq2SeqTrainer
from transformers import Seq2SeqTrainingArguments

dat = "Clustering-Jobs/data/tc_jobs_data.xls"

device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device("cpu")

tokenizer = AutoTokenizer.from_pretrained("t5-small")

dataset = JobSummaryDataset(dat, tokenizer)

model = AutoModelForSeq2SeqLM.from_pretrained("t5-small").to(device)

data_collator = DataCollatorForSeq2Seq(tokenizer=tokenizer, model=model)

batch_size = 8
num_train_epochs = 1

model_name = 't5-small-model'

training_args = Seq2SeqTrainingArguments(
    output_dir=f"./DL-Models/{model_name}",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    weight_decay=0.01,
    save_total_limit=3,
    num_train_epochs=3,
)

trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    tokenizer=tokenizer,
    data_collator=data_collator,
)

trainer.train()