from flask import jsonify
import requests
import os


def city_data(city, in_func=None):
    APP_ID = os.environ.get('APP_ID')
    URL = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APP_ID}'

    response = requests.get(URL).json()

    data_dict = {
        "temp": response['main']['temp'],
        "humidity": response['main']['humidity'],
        "city": response['name'],
        "country": response['sys']['country'],
        "timezone": response['timezone'],
        "main": response['weather'][0]['main'],
        "icon":  response['weather'][0]['icon'],
        "wind_speed": response['wind']['speed']
    }
    
    data_dict2 = {
            "city": "London",
            "country": "GB",
            "humidity": 65,
            "icon": "04n",
            "main": "Clouds",
            "temp": 279.5,
            "timezone": 0,
            "wind_speed": 6.17
        }
    
    if in_func is None:
        return jsonify(data_dict), 200
    
    return data_dict

def selected_cities(for_mail=None):
    weather_list = []
    cities = ['London', 'Lagos', 'Accra', 'Belhi', 'Ontario', 
                    'Toronto', 'Edinburgh', 'Birmingham',
                    'Chicago', 'Philadelphia', 'Vancouver', 'Paris', 
                    'Belfast', 'Pittsburgh', 'Bombay'] 
    
    for city in cities:
        # city_info_dict = {city : city_data(city=city, in_func=True)}
        city_info_dict = city_data(city=city, in_func=True)
        weather_list.append(city_info_dict)
    
    if for_mail:
        return weather_list
    
    return jsonify({"data": weather_list}), 200