from flask_mail import Mail


def get_mail():
    return get_mail.MAIL


get_mail.MAIL = Mail()


def init_db_app(app):
    mail = get_mail()
    with app.app_context():
        mail.init_app(app)
