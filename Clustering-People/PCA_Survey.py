import pandas as pd
import matplotlib.pyplot as plt
import sklearn
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

df = pd.read_excel('Clustering-People/data/survey.xlsx').dropna()

no_time_df = df.iloc[:, 1:]

no_time_df.columns = ["Age",
                        "Major", 
                        "Gender", 
                        "Rank-Salary",
                        "Rank-WorkLifeBal",
                        "Rank-CareerProg",
                        "Rank-Commute", 
                        "Rank-Benefits",
                        "Rank-Env",
                        "Rank-Flex",
                        "Rank-Var",
                        "TechSkill",
                        "SoftSkill"]

no_time_df["TechSkill"] = no_time_df["TechSkill"].str.split(",").tolist()
no_time_df["SoftSkill"] = no_time_df["SoftSkill"].str.split(",").tolist()

unique_tech = list(set([item.strip() for sublist in no_time_df["TechSkill"] for item in sublist]))
unique_soft = list(set([item.strip() for sublist in no_time_df["SoftSkill"] for item in sublist]))

no_time_at_all_df = no_time_df.reindex(no_time_df.columns.tolist() + unique_tech + unique_soft, axis=1, fill_value=0)

for index, row in no_time_df.iterrows():
    for val in row.TechSkill:
        if val != 'NA':
            no_time_at_all_df.loc[index, val] = 1
    for val in row.SoftSkill:
        if val != 'NA':
            no_time_at_all_df.loc[index, val] = 1 

no_time_at_all_df = no_time_at_all_df.fillna(0)

no_time_at_all_df.iloc[:, 3:11] = no_time_at_all_df.iloc[:, 3:11].apply(lambda x:
                 (1/x) /sum([1/y for y in range(1, 9)]))


no_time_at_all_df = pd.get_dummies(no_time_at_all_df, columns=
    ["Gender", "Major"]).drop(columns = 
    ["TechSkill", "SoftSkill"])

scaled_vals = StandardScaler().fit_transform(no_time_at_all_df.values)

pca = PCA(n_components = 3)
new_dat = pca.fit_transform(scaled_vals)

df["cluster"] = KMeans(n_clusters = 3, random_state=3101).fit(new_dat).labels_

df.to_csv("Clustering-People/data/processed_survey.csv")