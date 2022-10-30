from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
app = Flask(__name__)
api = Api(app)

users.path = '/Users/derekyuen/Desktop/NUS/Y3S1/DSA3101/Github/flask/users.csv'
locations.path = '/Users/derekyuen/Desktop/NUS/Y3S1/DSA3101/Github/flask/locations.csv'

class Users(Resource):
    def get(self):
        data = pd.read_csv(users.path)
        data = data.to_dict()
        return {'data' : data} , 200

    pass
    
class Locations(Resource):
    # methods go here
    pass
    
api.add_resource(Users, '/users')  # '/users' is our entry point for Users
api.add_resource(Locations, '/locations')  # and '/locations' is our entry point for Locations

if __name__ == '__main__':
    # run app in debug mode on port 5050
    app.run(debug=True, port=5050)