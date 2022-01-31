from flask import Blueprint

from .subscribers_routes import new_subscriber, get_subscribers


subscribers = Blueprint('subscribers', __name__)

@subscribers.route('/new', methods=['POST'])
def new_sub():
    return new_subscriber()

@subscribers.route('/get_all', methods=['GET'])
def get_subs():
    return get_subscribers()

