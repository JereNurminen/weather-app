from flask import Flask, request, render_template, redirect, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from config import db_config, secret_key
import json, datetime
# This line calls the constructor for the Flask app, issuing the name of the file (app.py) as a parameter
app = Flask(__name__)
# And we set the DEBUG to be 'true' - this allows making changes to the app visible without rebooting the whole server
app.config['DEBUG'] = True
# db_config is a struct stored in another file (config.py), 
# so it can easily be added to .gitignore in order to avoid exposing database connection details
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % db_config
# Same as db_config, the secret key is stored in config.py
app.secret_key = secret_key
db = SQLAlchemy(app)
# We define a Post class to be used by SQLAlchemy when accessing the database
class Observation(db.Model):
	# As per usual, the primary key is an auto incrementing integer called 'id'
	# The other attributes should be pretty self explanatory as well
	id = db.Column(db.Integer, primary_key=True)
	temperature = db.Column(db.Integer, unique=False, nullable=False)
	creation_time = db.Column(db.DateTime, unique=False, nullable=False)
	location_id = db.Column(db.Integer, db.ForeignKey('location.id'))
	location = relationship("Location")
	# This is needed in order to jsonify the object properly
	@property
	def serialize(self):
		return {
			'id': self.id,
			'temperature': self.temperature,
			'creation_time': self.creation_time,
			'location': self.location.name
		}

class Location(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(64), unique=False, nullable=False)
	latitude = db.Column(db.Float, unique=False, nullable=False)
	longitude = db.Column(db.Float, unique=False, nullable=False)
	timezone = db.Column(db.Integer, unique=False, nullable= False)
	@property
	def serialize(self):
		return {
			'id': self.id,
			'name': self.name,
			'latitude': self.latitude,
			'longitude': self.longitude
		}

#####################
### API ENDPOINTS ###
#####################
'''
@app.route('/api/observations/', methods = ['POST'])
def save_post():
	observation_json = request.json
	observation = Observation(temperature = observation_json['temperature'], location_id = observation_json['location_id'], last_updated = datetime.datetime.now())
	db.session.add(observation)
	db.session.commit()
	return jsonify(observation.serialize)

'''
@app.route('/api/observations/', methods = ['POST'])
def save_observation():
	observation_data = request.data
	observation = Observation(temperature = observation_data.temperature, creation_time = observation_data.creation_time, location_id = observation_data.location_id)
	if 150 > observation.temperature > 450:
		

@app.route('/api/observations/', methods = ['GET'])
def load_posts():
	group_by = request.args.get('group_by', default = 'location', type = str)
	if group_by not in ['location', 'observation']:
		return 'Invalid \'group_by\' -value', 402
	observations = []
	if group_by == 'observation':
		observations_from_db = Observation.query.all()
	elif group_by == 'location':
		observations_from_db = Observation.query.group_by(Observation.location_id).all()
	for post in observations_from_db:
		observations.append(post.serialize)
	return jsonify(observations)

@app.route('/', methods = ['GET'])
def index():
	return 'Hello world!'
'''
@app.route('/api/observations/<int:post_id>', methods = ['DELETE'])
def delete_post(post_id):
	Post.query.filter_by(id = post_id).delete()
	db.session.commit()
	return str(post_id)
'''
# Only used when using the dev server.
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

