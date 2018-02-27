import requests, json, sys, schedule, time
from weather_api import api_key

API_URL = 'https://api.openweathermap.org/data/2.5/weather?q={}&appid={}'

def main():
	schedule.every().hour.do(job)
	
	while True:
		schedule.run_pending()
		time.sleep(1000)

def job():
	get_temperature(city = 'helsinki')
	get_temperature(city = 'tokyo')
	get_temperature(city = 'dubai')
	get_temperature(city = 'manhattan')
	get_temperature(city = 'amsterdam')

def get_id(city):
	if city == 'helsinki':
		return 1
	elif city == 'tokyo':
		return 2
	elif city == 'manhattan':
		return 3
	elif city == 'amsterdam':
		return 4
	elif city == 'dubai':
		return 5
	else:
		return 0

def get_temperature(city):
	url = API_URL.format(city, api_key)
	response = requests.get(url)
	temperature = response.json()['main']['temp']
	print('City:\t\t{}\nTemperature:\t{}\n'.format(city, temperature))
	send_temperature(city, temperature)

def send_temperature(city, temperature):
	url = 'http://weather.jerenurminen.me/api/observations/'
	city_id = get_id(city)
	json = {'location_id': city_id, 'temperature': temperature}
	response = requests.post(url, json = json)
	print(response.text)

main()
