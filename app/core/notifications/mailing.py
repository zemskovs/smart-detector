from flask_mail import Message

from app.factories.mail import get_mail


def send_message(task_id, task_text, recipients=('monadv@yandex.ru',)):
    msg = Message(subject='Нотификация',
                  sender=('Smart Detect AutoBot', 'autobot@gmail.com'))
    for r in recipients:
        msg.add_recipient(r)
    link = 'http://localhost:1234/card/{}'.format(task_id)
    msg.html = """
    <section>Статус задачи '{task}' изменился.</section>
    
    <p>
        Просмотрите статус, пройдя по ссылке:<a href="{link}">#{task_id}</a>
    </p>
    """.format(task=task_text,
               link=link,
               task_id=task_id)
    get_mail().send(msg)
