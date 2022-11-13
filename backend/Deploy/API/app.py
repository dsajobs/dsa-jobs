import os
import json
from flask import Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
import redis

client_users = redis.Redis(
    host = '0.0.0.0',
    port = 6379,
    db = 0
)

UPLOAD_FOLDER = 'resumes-Users'
BUCKET = "resumedatadsa310106"

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/dsa-jobs/users/upload", methods=['POST'])
def upload():
    if request.method == "POST":
        f = request.files['file']
        f.save(os.path.join(UPLOAD_FOLDER, secure_filename(f.filename)))
        upload_file(f"uploads/{f.filename}", BUCKET)
        return redirect("/")

@app.route('/dsa-jobs/jobs/upload', methods=['PUT'])
def upload_job():
    record = json.loads(request.data)
    
    return jsonify(record)

@app.route('/dsa-jobs/data/listings', methods = ["GET"])
def get_jobs():
    listings = pd.read_csv("data/listings.csv")
    cluster_num = dict(request.args)["clusterNum"]    
    return jsonify(listings[listings["cluster_num"] == cluster_num].to_dict(orient = "records"))