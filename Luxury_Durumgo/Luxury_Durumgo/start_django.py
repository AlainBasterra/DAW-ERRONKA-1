from Luxury_Durumgo.wsgi import application

from wfastcgi import WSGIServer

WSGIServer(application).run()
