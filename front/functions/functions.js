// From https://stackoverflow.com/a/5650012
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Returns the value limited between min and max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};


function getTemperatureColorCode(t) {
	// Limits the temp between certain range
	const MIN_TEMPERATURE = 260; // ~ -20 degrees Celcius
	const MAX_TEMPERATURE = 300; // ~ 20 degrees Celcius
	t = clamp(t, MIN_TEMPERATURE, MAX_TEMPERATURE);

	// Values for the color representations of the temperature at seperator and the extreme
	const WARM = {
		start: {
			'h': 47,
			's': 100,
			'l': 100,
			'a': 1
		},
		end: {
			'h': 19,
			's': 100,
			'l': 50,
			'a': 1
		}
	}

	const COLD = {
		start: {
			'h': 277,
			's': 100,
			'l': 67,
			'a': 1
		},
		end: {
			'h': 177,
			's': 100,
			'l': 89,
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
	const SEPERATOR = 273; // ~7 degrees Celsius

	if (t <= SEPERATOR) {
		color.h = map_range(t, MIN_TEMPERATURE, SEPERATOR, COLD.start.h, COLD.end.h);
		color.s = map_range(t, MIN_TEMPERATURE, SEPERATOR, COLD.start.s, COLD.end.s);
		color.l = map_range(t, MIN_TEMPERATURE, SEPERATOR, COLD.start.l, COLD.end.l);
	} else if (t > SEPERATOR) {
		color.h = map_range(t, SEPERATOR, MAX_TEMPERATURE, WARM.start.h, WARM.end.h);
		color.s = map_range(t, SEPERATOR, MAX_TEMPERATURE, WARM.start.s, WARM.end.s);
		color.l = map_range(t, SEPERATOR, MAX_TEMPERATURE, WARM.start.l, WARM.end.l);
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
