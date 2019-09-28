from flask_mail import Message

from app.factories.mail import get_mail


def send_message(text, recipients=('monadv@yandex.ru',)):
    msg = Message(text)
    for r in recipients:
        msg.add_recipient(r)
    msg.sender = ('Smart Detect AutoBot', 'autobot@gmail.com')
    task = '12423456789'
    link = 'http://localhost:4200/456789'
    msg.body = "Статус задачи {task} изменился. Просмотрите статус, пройдя по ссылке: {link}".format(task=task,
                                                                                                     link=link)
    get_mail().send(msg)
