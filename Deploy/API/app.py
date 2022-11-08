import os
import json
from flask import Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import pandas as pd

UPLOAD_FOLDER = 'data/resumes'
ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/dsa-jobs/users/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('download_file', name=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/dsa-jobs/jobs/upload', methods=['PUT'])
def upload_job():
    record = json.loads(request.data)
    data = pd.read_csv("data/listings.csv")
    data.concat(pd.DataFrame.from_records(record))
    data.to_csv("data/listings.csv")
    return jsonify(record)

@app.route('/dsa-jobs/data/listings', methods = ["GET"])
def get_jobs():
    listings = pd.read_csv("data/listings.csv")
    cluster_num = dict(request.args)["clusterNum"]    
    return jsonify(listings[listings["cluster_num"] == cluster_num].to_dict(orient = "records"))