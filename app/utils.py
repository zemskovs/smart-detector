from app.factories.database import get_db

from app.models.executor import TblExecutors
from app.models.task_category import TblTaskCategories


def write_record(record, session):
    session.add(record)
    session.commit()


def fill_database():
    executor1 = TblExecutors()
    executor1.name = 'Николай'
    executor1.surname = 'Петров'
    executor1.middle_name = 'Андреевич'
    write_record(executor1, get_db().session)

    executor2 = TblExecutors()
    executor2.name = 'Владимир'
    executor2.surname = 'Никифоров'
    executor2.middle_name = 'Витаельевич'
    write_record(executor2, get_db().session)

    task_category1 = TblTaskCategories()
    task_category1.name='Сантехнические работы'
    write_record(task_category1, get_db().session)

    task_category2 = TblTaskCategories()
    task_category2.name='Малярные работы'
    write_record(task_category1, get_db().session)

    task_category3 = TblTaskCategories()
    task_category3.name='Облицовочные работы'
    write_record(task_category3, get_db().session)

    task_category4 = TblTaskCategories()
    task_category4.name='Обойные работы'
    write_record(task_category4, get_db().session)

    task_category5 = TblTaskCategories()
    task_category5.name='Плотничные работы'
    write_record(task_category5, get_db().session)

    task_category6 = TblTaskCategories()
    task_category6.name='Стекольные работы'
    write_record(task_category6, get_db().session)

    task_category7 = TblTaskCategories()
    task_category7.name='Штукатурные работы'
    write_record(task_category7, get_db().session)

    task_category8 = TblTaskCategories()
    task_category8.name='Электромонтажные работы'
    write_record(task_category8, get_db().session)
