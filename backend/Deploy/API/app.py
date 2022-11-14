import json
import os
import hashlib
import pandas as pd
import redis
from flask import Flask, flash, jsonify, redirect, request, url_for
from helper_fxns import *
from redis.commands.json.path import Path
from google.cloud import storage
from werkzeug.utils import secure_filename

client = redis.Redis(
    host = '0.0.0.0',
    port = 6379,
    db = 0
)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'keyfile.json'
CLOUD_STORAGE_BUCKET = "res-data-3101-2210"
gcs = storage.Client()
bucket = gcs.get_bucket(CLOUD_STORAGE_BUCKET)

app = Flask(__name__)

@app.route('/dsa-jobs/upload/', methods=['POST'])
def upload():
    uploaded_file = request.files.get('file')
    if not uploaded_file:
        return 'No file uploaded.', 400
    blob = bucket.blob(uploaded_file.filename)
    blob.upload_from_string(
        uploaded_file.read(),
        content_type=uploaded_file.content_type
    )
    blob.make_public()
    request_params = json.loads(request.data)
    user_dat = json.loads(client.json().get(f"user:{hashlib.sha256(request_params['user.email']).hexdigest()}"))
    user_dat["resume_url"] = blob.name
    client.json().set(f"user:{hashlib.sha256(user_dat['user.email']).hexdigest()}",
     Path.rootPath(),
     user_dat) 
    return blob.public_url

@app.route("/dsa-jobs/jobs/upload", methods=['POST'])
def upload_job():
    record = json.loads(request.data)
    client.sadd("jobslist", record['job_id'])
    client.json().set(f"job:{record['job_id']}",
     Path.rootPath(),
     record)
    client.incr("jobNum")
    return jsonify(record)

@app.route('/dsa-jobs/users/upload', methods=['PUT'])
def upload_user():
    record = json.loads(request.data)
    client.json().set(f"user:{hashlib.sha256(record['user.email']).hexdigest()}",
     Path.rootPath(),
     record)
    client.incr("userNum")
    return jsonify(record)

@app.route('/dsa-jobs/data/listings', methods = ["GET"])
def get_jobs():
    request_params = json.loads(request.data)
    user_dat = json.loads(client.json().get(f"user:{hashlib.sha256(request_params['user.email']).hexdigest()}"))
    try:
        blob_name = user_dat["resume_url"]
    except KeyError:
        return {"status" : "resume not available"}
    blob = bucket.blob(blob_name)
    with blob.open('r') as f:
        res_text = read_resume(f)
    out = []
    for i in client.scan_iter("job:*"):
        job_dat = json.loads(client.json().get(i))
        job_desc = job_dat["job_desc"]
        overall_score =compute_overall_match(res_text, job_desc)
        dist_score = compute_dist_score(user_dat["coords"], job_dat["coords"])
        skill_score = compute_skill_match(res_text, job_desc)
        soft_score = compute_soft_match(res_text, job_desc)
        out.append(
            {"job_id" : i, 
            "data" : job_dat, 
            "score": overall_score,
            "dist" : dist_score,
            "skill" : skill_score,
            "soft" : soft_score}
        )
        return json.dumps({"status" : "Success", "listings" : out})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)