import json
import os
import hashlib
import pandas as pd
import redis
from flask import Flask, flash, jsonify, redirect, request, url_for
from helper_fxns import *
from redis.commands.json.path import Path
from werkzeug.utils import secure_filename

client = redis.Redis(
    host = '0.0.0.0',
    port = 6379,
    db = 0
)

UPLOAD_FOLDER = 'resumes-Users'
BUCKET = "resumedatadsa310106"

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
    listings = pd.read_csv("data/listings.csv")
    cluster_num = dict(request.args)["clusterNum"]    
    return jsonify(listings[listings["cluster_num"] == cluster_num].to_dict(orient = "records"))