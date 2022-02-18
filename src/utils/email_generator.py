from flask import jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from src.routes.weather_info_routes import selected_cities
from datetime import date
import yagmail
import os
import atexit

from src.database import Subscriber
from src.utils.http_status_codes import HTTP_200_OK

def mail_gen():
    today = date.today().strftime("%b/%d/%Y")
    subject = f"Weather Info for {today}"
    data = selected_cities(for_mail=True)
    
    yagmail.register(os.environ.get('EMAIL_ACCT'), os.environ.get('EMAIL_PASS'))
    yag = yagmail.SMTP(os.environ.get('EMAIL_ACCT'))
    
    all_subscribers = Subscriber.query.all()
    sub_list = [subscriber.email for subscriber in all_subscribers]
    # print(sub_list)
    
    for each_mail in sub_list:
        yag.send(to=str(each_mail),
                subject=subject,
                contents=data)

    return jsonify({'data': "mail sent!"}), HTTP_200_OK

# scheduler = BackgroundScheduler()
# scheduler.add_job(func=mail_gen, trigger="interval", seconds=30)
# scheduler.start()

# atexit.register(lambda: scheduler.shutdown())