A webapp for recording weather observations. Made as a pre-assignment for Reaktor Summer 2018 recruitment (assignment [here](https://github.com/reaktor/kesa-2018) in Finnish.)

## Technologies used
### Back end
For the back end I used Flask, as I've used it for a few projects and really liked and wanted to get to know it better. Also, it seemed like the perfect choice for a project where quick prototyping is key.
It uses MySQL for saving the observations, using Flask-SQLAlchemy as an ORM. 
### Front End
The front end is built using React. Mostly because I've been studying it recently and wanted to continue using it.
### TODO
* Proper validation of observations. Currently allows only temperatures from a set range (somewhere between the lowest and highest temperatures ever recorded by humans).
  
  Don't know yet how to do this.

* Implement WebSockets for signaling the front end when observations are recorded by someone else
  
  This doesn't seem to be practical (if it's even possible) when using mod_wsgi. I may need to use another server for that, maybe Gunicorn.

* Some fancy graphics. (Low priority)
### Notes
* The app is currently build in a way that may make it hard to deploy elsewhere, as I've been developing it straight on the server. If you want to see how the finished product functions and looks, just take a look at [weather.jerenurminen.me](weather.jerenurminen.me).
