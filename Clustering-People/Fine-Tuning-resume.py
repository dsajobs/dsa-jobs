import transformers
import pandas as pd

resume_data = pd.read_csv("Clustering-People/data/UpdatedResumeDataSet.csv")
print(pd.get_dummies(data = resume_data, columns=["Category"]))

