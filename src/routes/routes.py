from flask import Blueprint, jsonify
from flasgger import swag_from
from pathlib import Path
import os
import requests

from src.utils.email_generator import mail_gen
from .subscribers_routes import new_subscriber, get_subscribers
from .weather_info_routes import city_data, selected_cities


subscribers = Blueprint('subscribers', __name__)
weather_info = Blueprint('weather_info', __name__)


@subscribers.route('/new', methods=['POST'])
@swag_from("./docs/add_new_subscriber.yaml")
def new_sub():
    return new_subscriber()

@subscribers.route('/get_all', methods=['GET'])
@swag_from("./docs/get_all_subscribers.yaml")
def get_subs():
    return get_subscribers()

@subscribers.route('/send_mail', methods=['POST'])
@swag_from("./docs/send_mail.yaml")
def send_mail():
    return mail_gen()

@weather_info.route('/city-data/<city>', methods=['GET'])
@swag_from("./docs/city_data.yaml")
def cityData(city):
    return city_data(city)

@weather_info.route('/selected-cities', methods=['GET'])
@swag_from("./docs/selected_cities.yaml")
def selectedCities():
    return selected_cities()

