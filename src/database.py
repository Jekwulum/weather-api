from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.now())
    
    def __repr__():
        return "Subscriber --> {self.created_at}"
    
    