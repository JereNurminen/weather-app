// From https://stackoverflow.com/a/5650012
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Returns the value limited between min and max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

/*
function getTemperatureColorCode(t) {

	let colorCode = '#ffffff'

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
		colorCode = "#ffb26b"
	}

	return colorCode;
}
*/

function getTemperatureColorCode(t) {
	// Limits the temp between certain range
	const MIN_TEMPERATURE = 260; // ~ -20 degrees Celcius
	const MAX_TEMPERATURE = 300; // ~ 20 degrees Celcius
	t = clamp(t, MIN_TEMPERATURE, MAX_TEMPERATURE);

	// Values for the color representations of the temperature at seperator and the extreme
	const WARM = {
		min: {
			'h': 23,
			's': 100,
			'l': 72,
			'a': 1
		},
		max: {
			'h': 21,
			's': 100,
			'l': 50,
			'a': 1
		}
	}

	const COLD = {
		min: {
			'h': 185,
			's': 100,
			'l': 80,
			'a': 1
		},
		max: {
			'h': 195,
			's': 100,
			'l': 100,
			'a': 1
		}
	}
	// Default color as hsla
	let color = {
		'h': 0,
		's': 0,
		'l': 100,
		'a': 1
	}

	// Temperatures below this are considered cold, above hot
	const SEPERATOR = 280; // ~7 degrees Celsius

	if (t <= SEPERATOR) {
		color.h = map_range(t, MIN_TEMPERATURE, SEPERATOR, COLD.min.h, COLD.max.h);
		color.s = map_range(t, MIN_TEMPERATURE, SEPERATOR, COLD.min.s, COLD.max.s);
		color.l = map_range(t, MIN_TEMPERATURE, SEPERATOR, COLD.min.l, COLD.max.l);
	} else if (t > SEPERATOR) {
		color.h = map_range(t, SEPERATOR, MAX_TEMPERATURE, WARM.min.h, WARM.max.h);
		color.s = map_range(t, SEPERATOR, MAX_TEMPERATURE, WARM.min.s, WARM.max.s);
		color.l = map_range(t, SEPERATOR, MAX_TEMPERATURE, WARM.min.l, WARM.max.l);
	}

	return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`;

}

function celsiusToKelvin(t) {
	return Math.round(parseInt(t) + 273.15);
}

function kelvinToCelsius(t) {
	return Math.round(parseInt(t) - 273.15);
}

export { kelvinToCelsius, celsiusToKelvin, getTemperatureColorCode };
