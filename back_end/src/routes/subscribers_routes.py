from flask import jsonify, request
import validators

from src.utils.http_status_codes import (HTTP_200_OK, HTTP_201_CREATED, 
                                         HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST)
from src.database import Subscriber, db

def new_subscriber():
    email = request.get_json().get('email', '')
    
    if not validators.email(email):
        return jsonify({'message': 'Enter a valid email'}), HTTP_400_BAD_REQUEST
    
    if Subscriber.query.filter_by(email=email).first():
        return jsonify({'message':"email already exists!"}), HTTP_409_CONFLICT
    
    subscriber = Subscriber(email=email)
    db.session.add(subscriber)
    db.session.commit()
    
    return jsonify({'data': email,
                    'message': "added to subscription list!"}), HTTP_201_CREATED
    
def get_subscribers(only_emails=None):
    subscribers = Subscriber.query.all()
    
    if only_emails is None:
        all_subscribers = [(subscriber.email, subscriber.created_at) for subscriber in subscribers]
        return jsonify({'data': all_subscribers}), HTTP_200_OK
    
    emails = [subscriber.email for subscriber in subscribers]
    return jsonify({'data': emails}), HTTP_200_OK
    
