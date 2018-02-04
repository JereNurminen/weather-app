
//Temperature conversions:
function convertTemperature(from, to, temperature) {
	const errormsg = 'First and second arguments must be either \'c\', \'f\' or \'k\' (only one of each)';
	if (isNaN(temperature)) throw 'Temperature has to be a number!';
	switch (from) {
		case 'c':
			if (to === 'f') {
				return Math.round(toFahrenheit(fromCelsius(temperature)));
			} else if (to === 'k') {
				return Math.round(fromCelsius(temperature));
			} else {
				throw errormsg;
			}
		case 'f':
			if (to === 'c') {
				return Math.round(toCelsius(fromFahrenheit(temperature)));
			} else if (to === 'k') {
				return Math.round(fromFahrenheit(temperature));
			} else {
				throw errormsg;
			}
		case 'k':
			if (to === 'c') {
				return Math.round(fromCelsius(temperature));
			} else if (to === 'f') {
				return Math.round(fromFahrenheit(temperature));
			} else {
				throw errormsg;
			}
		default:
			throw errormsg;
	}

}

function fromCelsius(temperature) {
	return temperature - 273.15;
}

function fromFahrenheit(temperature) {
	return ((temperature - 32) / 1.8) + 273.15;
}

function toCelsius(temperature) {
	return temperature + 273.15;
}

function toFahrenheit(temperature) {
	return ((temperature - 273.15) * 1.8) + 32;
}

export { convertTemperature };