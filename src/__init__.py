from flask import Flask, jsonify
import requests
import os 
from flask_cors import CORS
from dotenv import load_dotenv 
from flasgger import Swagger
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import schedule


#   blueprints
from .routes.routes import subscribers, weather_info
from .utils.email_generator import mail_gen
from .database import db

load_dotenv()

def create_app(test_config=None):
    
    app = Flask(__name__, instance_relative_config=True)
    
    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("SECRET_KEY"),
            SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI"),
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
        )
    
    else:
        app.config.from_mapping(test_config)
    
    
    db.app = app
    db.init_app(app)
    # db.create_all()
    
    CORS(app)
    
    os.environ['ROOT_PATH'] = app.root_path
    
    # rootPath = app.root_path
    app.register_blueprint(subscribers, url_prefix='/api/v1/subscribers')
    app.register_blueprint(weather_info, url_prefix='/api/v1/info')
    
    @app.route('/all-data', methods=['GET'])
    def all_data():
        APP_ID = os.environ.get('APP_ID')
        URL = f'https://api.openweathermap.org/data/2.5/weather?q=London&appid={APP_ID}'

        response = requests.get(URL).json()

        data_dict = {
            "temp": response['main']['temp'],
            "humidity": response['main']['humidity'],
            "city": response['name'],
            "country": response['sys']['country'],
            "timezone": response['timezone'],
            "desc": response['weather'][0]['description'],
            "main": response['weather'][0]['main'],
            "icon":  response['weather'][0]['icon'],
            "wind_speed": response['wind']['speed']
        }
        return jsonify(data_dict), 200
    
    # scheduler = BackgroundScheduler()
    # scheduler.add_job(func=mail_gen, trigger="interval", seconds=100000)
    # scheduler.start()

    # atexit.register(lambda: scheduler.shutdown())
    
    # schedule.every(10).seconds.do(mail_gen)
    # schedule.every().day.at("07:00").do(mail_gen)
    # schedule.run_pending()
    
    Swagger(app)
    
    
    return app