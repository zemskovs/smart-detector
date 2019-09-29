from app.factories.database import get_db
from app.models.cotroller import TblControllers
from app.models.enumerates import StatusEnum

from app.models.executor import TblExecutors
from app.models.request import TblRequests
from app.models.task_category import TblTaskCategories
from app.models.task_route import TblTaskRoutes


def write_record(record, session):
    session.add(record)
    session.commit()


def fill_database():
    executor1 = TblExecutors()
    executor1.surname = 'Петров'
    executor1.name = 'Николай'
    executor1.middle_name = 'Андреевич'
    executor1.email = 'monadv@yandex.ru'
    write_record(executor1, get_db().session)

    executor2 = TblExecutors()
    executor2.surname = 'Никифоров'
    executor2.name = 'Владимир'
    executor2.middle_name = 'Витаельевич'
    executor2.email = 'monadv@yandex.ru'
    write_record(executor2, get_db().session)

    controller1 = TblControllers()
    controller1.surname = 'Иванов'
    controller1.name = 'Сергей'
    controller1.middle_name = 'Андреевич'
    controller1.email = 'monadv@yandex.ru'
    write_record(controller1, get_db().session)

    controller2 = TblControllers()
    controller2.surname = 'Сидоров'
    controller2.name = 'Артём'
    controller2.middle_name = 'Витальевич'
    controller2.email = 'monadv@yandex.ru'
    write_record(controller2, get_db().session)

    route1 = TblTaskRoutes()
    route1.name = 'Базовый маршрут без аварий'
    route1.controller_id = controller1.id
    route1.executor_id = executor1.id
    route1.assign_time_required = 2
    route1.execution_time_required = 6
    write_record(route1, get_db().session)

    task_category1 = TblTaskCategories()
    task_category1.name='Сантехнические работы'
    task_category1.task_route_id = route1.id
    write_record(task_category1, get_db().session)

    task_category2 = TblTaskCategories()
    task_category2.name='Малярные работы'
    task_category2.task_route_id = route1.id
    write_record(task_category1, get_db().session)

    task_category3 = TblTaskCategories()
    task_category3.name='Облицовочные работы'
    task_category3.task_route_id = route1.id
    write_record(task_category3, get_db().session)

    task_category4 = TblTaskCategories()
    task_category4.name='Обойные работы'
    task_category4.task_route_id = route1.id
    write_record(task_category4, get_db().session)

    task_category5 = TblTaskCategories()
    task_category5.name='Плотничные работы'
    task_category5.task_route_id = route1.id
    write_record(task_category5, get_db().session)

    task_category6 = TblTaskCategories()
    task_category6.name='Стекольные работы'
    task_category6.task_route_id = route1.id
    write_record(task_category6, get_db().session)

    task_category7 = TblTaskCategories()
    task_category7.name='Штукатурные работы'
    task_category7.task_route_id = route1.id
    write_record(task_category7, get_db().session)

    task_category8 = TblTaskCategories()
    task_category8.name='Электромонтажные работы'
    task_category8.task_route_id = route1.id
    write_record(task_category8, get_db().session)

    task_category8 = TblTaskCategories()
    task_category8.name='Электромонтажные работы'
    task_category8.task_route_id = route1.id
    write_record(task_category8, get_db().session)

    request1 = TblRequests()
    request1.text = """
        Прошу устранить проблемы со скачками электроэнергии в первой половине квартиры.
        В данный момент с мая 2014 г. я отключила через щиток подачу электричества в половину квартиры.
        В мае 2014 г. я вызывала электрика в связи с тем, что в квартире часто лопались лампочки 
        (и обычные, и энергосберегающие) и искрился переключатель в электрощитке.
        Электрик выкрутил оставшиеся в люстре цоколи от лопнувших лампочек и сказал, что все 
        проблемы были связаны с этим. Однако через несколько дней в квартире начались скачки электричества, 
        от чего техника включалась и выключалась с интрвалом в несколько минут. Во избежание порчи техники 
        я отключила подачу электричества в половине квартиры, и опять же переключатель искрил.
        Возможно приходивший в мае электрик не компетентен, поэтому просьба прислать другого электрика."
    """
    request1.category_id = task_category8.id
    request1.task_status = StatusEnum.new
    write_record(request1, get_db().session)
