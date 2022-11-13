import pandas as pd
import matplotlib.pyplot as plt
import sklearn
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np
from mpl_toolkits.mplot3d import Axes3D
import seaborn as sns

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

no_time_df["TechSkill"] = no_time_df["TechSkill"].str.split(",").apply(lambda x:list(map(str.strip, x)))
no_time_df["SoftSkill"] = no_time_df["SoftSkill"].str.split(",").apply(lambda x:list(map(str.strip, x)))

unique_tech = list(set([item.strip() for sublist in no_time_df["TechSkill"] for item in sublist]))
unique_soft = list(set([item.strip() for sublist in no_time_df["SoftSkill"] for item in sublist]))

no_time_at_all_df = no_time_df.reindex(no_time_df.columns.tolist() + unique_tech + unique_soft, axis=1, fill_value=0)

for index, row in no_time_at_all_df.iterrows():
    for val in row.TechSkill:
        if val != 'NA':
            no_time_at_all_df.loc[index, val] = 1
    for val in row.SoftSkill:
        if val != 'NA':
            no_time_at_all_df.loc[index, val] = 1 

no_time_at_all_df = no_time_at_all_df.fillna(0)

no_time_at_all_df.iloc[:, 3:11] = no_time_at_all_df.iloc[:, 3:11].apply(lambda x:
                 (1/x) /sum([1/y for y in range(1, 9)]))
# 1/x -> higher priority, x will be smaller, 1/x will be bigger, then normalize across sum of inverse of 1-8


no_time_at_all_df = pd.get_dummies(no_time_at_all_df, columns=
    ["Gender", "Major"]).drop(columns = 
    ["TechSkill", "SoftSkill"])

scaled_vals = StandardScaler().fit_transform(no_time_at_all_df.values)

pca = PCA(n_components = 3)
new_dat = pca.fit_transform(scaled_vals)
df["cluster"] = KMeans(n_clusters = 4, random_state=3101).fit(new_dat).labels_

labels = df["cluster"]
pca_scale = pd.DataFrame(new_dat, columns=['pc1','pc2','pc3'])
clusters_pca_scale = pd.concat([pca_scale, pd.DataFrame({'pca_clusters':labels})], axis=1)
df.to_csv("Clustering-People/data/processed_survey.csv")

plt.figure(figsize = (10,10))
sns.scatterplot(clusters_pca_scale.iloc[:,0],clusters_pca_scale.iloc[:,1], hue=labels, palette='Set1', s=100).set_title('KMeans Clusters (4) Derived from PCA', fontsize=15)
plt.legend()
plt.show()

fig = plt.figure(figsize=(12, 12))
ax = fig.add_subplot(projection='3d')
ax.scatter(clusters_pca_scale.iloc[:,0], clusters_pca_scale.iloc[:,1], clusters_pca_scale.iloc[:,2], c = labels)
ax.set_xlabel('pc1')
ax.set_ylabel('pc2')
ax.set_zlabel('pc3')
plt.show()

cluster_pca_profile = pd.merge(no_time_at_all_df, clusters_pca_scale['pca_clusters'], left_index=True, right_index=True )
for c in cluster_pca_profile:
    grid = sns.FacetGrid(cluster_pca_profile, col='pca_clusters')
    grid.map(plt.hist, c)