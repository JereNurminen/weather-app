function getTemperatureColorCode(t) {

	let colorCode = '#ffffff'

	/*
	if (t < 250) {				// < -25
		colorCode = '#bffcff' 
	} else if (t < 260) {		// < -15
		colorCode = "#b2e2ff"
	} else if (t < 260) {		// < -5
		colorCode = "#A1BFFF"
	} else if (t < 270) {		// < 5
		colorCode = "#DFE7FF"
	} else if (t < 280) {		// < 15
		colorCode = "#FFE4CC"
	} else if (t < 290) {		// < 25
		colorCode = "#FFA855"
	} else {					// > 25
		colorCode = "#FF7900"
	}
	*/

	if (t < 260) {		// < -15
		colorCode = "#bffcff"
	} else if (t < 260) {		// < -5
		colorCode = "#b2e2ff"
	} else if (t < 270) {		// < 5
		colorCode = "#A1BFFF"
	} else if (t < 280) {		// < 15
		colorCode = "#DFE7FF"
	} else if (t < 290) {		// < 25
		colorCode = "#FFE4CC"
	} else {					// > 25
		colorCode = "#FFA855"
	}

	return colorCode;
}

function celsiusToKelvin(t) {
	return Math.round(parseInt(t) + 273.15);
}

function kelvinToCelsius(t) {
	return Math.round(parseInt(t) - 273.15);
}

export { kelvinToCelsius, celsiusToKelvin, getTemperatureColorCode };