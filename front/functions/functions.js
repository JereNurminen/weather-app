

function celsiusToKelvin(t) {
	return Math.round(parseInt(t) + 273.15);
}

function kelvinToCelsius(t) {
	return Math.round(parseInt(t) - 273.15);
}

export { kelvinToCelsius, celsiusToKelvin };