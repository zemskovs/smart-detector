import os

ACCESS_TOKEN = 'ask Alexander about VK app'
with open('.secret_access_token') as f:
    ACCESS_TOKEN = f.read()

SENTIMENT_TOKEN = 'ask Alexander about sentiment service token'
with open('.secret_sentiment_token') as f:
    SENTIMENT_TOKEN = f.read()

DATA_FOLDER = '../db'

EMAIL_PASSWORD = 'ask Alexander about sentiment service token'
with open('.secret_mail_password') as f:
    EMAIL_PASSWORD = f.read()


class Config:
    # database config
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}/test.db'.format(DATA_FOLDER)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'autobot.hack2019@gmail.com'
    MAIL_PASSWORD = EMAIL_PASSWORD
