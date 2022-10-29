from job_summary_dataset import JobSummaryDataset
import torch
from transformers import AutoTokenizer, AutoModel
from transformers import AutoModelForSeq2SeqLM
from transformers import DataCollatorForSeq2Seq
from transformers import Seq2SeqTrainer

dat = "Clustering-Jobs/data/tc_jobs_data.xls"

max_input_length = 768
max_target_length = 256

tokenizer = AutoTokenizer.from_pretrained("t5-small", max_length = max_input_length)

dataset = JobSummaryDataset(dat, tokenizer)

model = AutoModelForSeq2SeqLM.from_pretrained('t5-small')

from transformers import Seq2SeqTrainingArguments

batch_size = 8
num_train_epochs = 1
model_name = 'mt5-small-model'

args = Seq2SeqTrainingArguments(
    output_dir=f"Clustering-Jobs/DL-Models/{model_name}-V1",
    evaluation_strategy="epoch",
    learning_rate=5.6e-5,
    per_device_train_batch_size=batch_size,
    per_device_eval_batch_size=batch_size,
    weight_decay=0.01,
    save_total_limit=3,
    num_train_epochs=num_train_epochs,
    predict_with_generate=True,
)

trainer = Seq2SeqTrainer(
    model,
    args,
    train_dataset=dataset,
)

trainer.train()