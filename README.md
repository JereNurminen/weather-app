The source code of a [web app](weather.jerenurminen.me) for recording weather observations. Made as a pre-assignment for Reaktor Summer 2018 recruitment (assignment [here](https://github.com/reaktor/kesa-2018) (in Finnish).)

## Technologies used
### Back end
For the back end I used Flask, as I've used it for a few projects and really liked and wanted to get to know it better. Also, it seemed like the perfect choice for a project where quick prototyping is key.
It uses MySQL for saving the observations, using Flask-SQLAlchemy as an ORM. 

### Front End
The front end is built using React. Mostly because I've been studying it recently and wanted to continue using it.

### General
The app uses WebSockets for real time updates (ie. when some else records an observation).

## Data Validation
Currently, the app doesn't validate user generated data that well by itself. You can't record observations where the temperatures go greatly beyond current world records. For data validation, the app trusts its users: For every location, there is a 'detailed view' where you can inspect last weeks observations, and flag suspicious ones. Once an observation has been flagged 5 or more times, it will not be shown in the future (it will remain in the database, as the flaggings may be unjustified or it may still be valid for 'research'). 

## Configuration
The app uses a file called `config.py` in the root of the project. Here's a sample of what is needed:

```python
# The top secret login details to the database.
db_config = {
    'user': 'REDACTED',
    'pw': 'REDACTED',
    'db': 'REDACTED',
    'host': 'REDACTED',
    'port': 'REDACTED'
}

secret_key = 'REDACTED'
```

To use the `get_weather.py`-utility, you need to have an API key to OpenWeatherMap saved in `util/weather_api.py`.

```python
api_key = 'REDACTED'
```

## Utilities
The directory `util/` contains a few useful utilities for development. `db_initializer.py` creates the database (`config.py` must be set up for this to work). `get_weather.py` is a script that runs continuously, getting the current weather hourly from [OpenWeatherMap](https://openweathermap.org/) and sending it to the server using its API. This way the app always has some recent-ish data to work with, and it will show up on the logs the same way as 'real' observations.

## Logging
The app logs all sent observations in a file in its root in addition to the database.

## Notes
* The app is currently build in a way that may make it hard to deploy elsewhere, as I've been developing it straight on the server. If you want to see how the 'finished' product functions and looks, just take a look at it [online](weather.jerenurminen.me).
