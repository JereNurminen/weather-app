from flask import Flask, request, render_template, redirect, jsonify, session, send_from_directory
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
# We define a Observation class to be used by SQLAlchemy when accessing the database
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
	observations = []
	@property
	def serialize(self):
		return {
			'id': self.id,
			'name': self.name,
			'latitude': self.latitude,
			'longitude': self.longitude,
			'observations': self.observations
		}	
	def load_observations(self):
		observations_from_db = Observation.query.filter_by(location_id = self.id).filter(Observation.creation_time > (datetime.datetime.now() - datetime.timedelta(hours=24, minutes=0, seconds=0))).all()
		self.observations = list(map(lambda x: x.serialize, observations_from_db))
	

#####################
### API ENDPOINTS ###
#####################

@app.route('/api/observations/', methods = ['POST'])
def save_observation():
	observation_data = request.json
	observation = Observation(temperature = observation_data['temperature'], creation_time = datetime.datetime.now(), location_id = observation_data['location_id'])
	if 150 > observation.temperature > 450:
		return 'Too hot/cold'
	db.session.add(observation)
	db.session.commit()
	return jsonify(observation.serialize)


@app.route('/api/observations/', methods = ['GET'])
def get_observations():
	group_by = request.args.get('group_by', default = 'location', type = str)
	if group_by not in ['location', 'observation']:
		return 'Invalid \'group_by\' -value', 402
	observations = []
	if group_by == 'observation':
		observations_from_db = Observation.query.all()
		for observation in observations_from_db:
			observations.append(observation)
	elif group_by == 'location':
		locations_from_db = Location.query.all()
		for location in locations_from_db:
			location.load_observations()
			observations.append(location.serialize)
	return jsonify(observations)

@app.route('/', methods = ['GET'])
def index():
	return send_from_directory('static/dist/', 'index.html')

# Only used when using the dev server.
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

