from app import app, db, datetime, Location, Observation

db.create_all()

helsinki = Location(name = 'Helsinki, Finland', latitude = 60.1697530, longitude = 	24.945831, timezone = 2)
tokyo = Location(name = 'Tokyo, Japan', latitude = 35.6584421, longitude = 139.7328635, timezone = 9)
new_york = Location(name = 'New York, USA', latitude = 40.7406905, longitude = -73.9938438, timezone = -5)
amsterdam = Location(name = 'Amsterdam, Netherlands', latitude = 52.3650691, longitude = 4.9040238, timezone = 1)
dubai = Location(name = 'Dubai, UAE', latitude = 25.092535, longitude = 55.1562243, timezone = 4)
locations = [helsinki, tokyo, new_york, amsterdam, dubai]
db.session.bulk_save_objects(locations)
db.session.commit()

helsinki_temperature = Observation(temperature = 270, creation_time = datetime.datetime.now(), location_id = 1)
tokyo_temperature = Observation(temperature = 280, creation_time = datetime.datetime.now(), location_id = 2)
new_york_temperature = Observation(temperature = 285, creation_time = datetime.datetime.now(), location_id = 3)
amsterdam_temperature = Observation(temperature = 290, creation_time = datetime.datetime.now(), location_id = 4)
dubai_temperature = Observation(temperature = 310, creation_time = datetime.datetime.now(), location_id = 5)
temperatures = [helsinki_temperature, tokyo_temperature, new_york_temperature, amsterdam_temperature, dubai_temperature]
db.session.bulk_save_objects(temperatures)
db.session.commit()