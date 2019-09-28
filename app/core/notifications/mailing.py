from flask_mail import Message

from app.factories.mail import get_mail


def send_message(task_id, task_text, recipients=('monadv@yandex.ru',)):
    msg = Message(task_text)
    for r in recipients:
        msg.add_recipient(r)
    msg.sender = ('Smart Detect AutoBot', 'autobot@gmail.com')
    link = 'http://localhost:4200/{}'.format(task_id)
    msg.body = "Статус задачи '{task}' изменился. Просмотрите статус, пройдя по ссылке: {link}".format(task=task_text,
                                                                                                       link=link)
    get_mail().send(msg)
