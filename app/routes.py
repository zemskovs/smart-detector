from app import app
from flask import jsonify, request

from app.core.notifications.mailing import send_message
from app.core.parsers.vk import VKParser
from app.core.predictors.classify import classify_text, CATEGORIES_MAPPING
from app.factories.database import get_db
from app.models.author import TblAuthors
from app.models.cotroller import TblControllers
from app.models.enumerates import StatusEnum
from app.models.executor import TblExecutors

from app.models.request import TblRequests
from app.models.status_changes import TblStatusChanges
from app.models.task_category import TblTaskCategories
from app.models.task_route import TblTaskRoutes
from app.utils import write_record


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/requests/new', methods=['POST', 'GET'])
def import_from_post():
    data = request.get_json()
    if not data:
        data = {
            'socialNetwork': 'vk',
            'fromUrl': 'https://vk.com/club184648030?w=wall-184648030_32%2Fall',
        }
    net = data['socialNetwork']
    if net != 'vk' and net != 'email':
        raise NotImplementedError

    if net == 'vk':
        parser = VKParser()
        post = parser.parse(data['fromUrl'])

        db_request = TblRequests()
        db_request.text = post.title + post.text
        write_record(db_request, get_db().session)
    else:
        author = TblAuthors()
        author.name = data['name']
        write_record(author, get_db().session)

        db_request = TblRequests()
        db_request.text = data['text']
        db_request.author_id = author.id
        write_record(db_request, get_db().session)

    class_id = classify_text(db_request.text)
    category = TblTaskCategories.query.filter_by(name=CATEGORIES_MAPPING[str(class_id)]).first()
    db_request.category_id = category.id
    write_record(db_request, get_db().session)

    return jsonify(db_request.json())


@app.route('/requests/all', methods=['GET'])
def get_all():
    res = []
    for r in TblRequests.query.all():
        if not r:
            continue

        res.append({
            **r.json()
        })
    return jsonify(res)


@app.route('/requests/update/<int:request_id>', methods=['POST'])
def update_exact_request(request_id):
    data = request.get_json()
    existing_request = TblRequests.query.get(request_id)
    change = TblStatusChanges()
    change.prev_task_status = existing_request.task_status
    change.new_task_status = StatusEnum(data['taskStatus'])
    change.request_id = existing_request.id
    write_record(change, get_db().session)

    existing_request.task_status = StatusEnum(data['taskStatus'])
    if 'categoryId' in data:
        existing_request.category_id = data['categoryId']
    write_record(existing_request, get_db().session)

    category = TblTaskCategories.query.get(existing_request.category_id)
    route = TblTaskRoutes.query.get(category.task_route_id)
    controller = TblTaskRoutes.query.get(route.controller_id)

    send_message(task_id=existing_request.id,
                 task_text=existing_request.text,
                 recipients=(controller.email, ))

    return jsonify({
        'ok': 200
    })


@app.route('/requests/<int:request_id>', methods=['GET'])
def get_exact_request(request_id):
    req = TblRequests.query.get(request_id)
    if req:
        return jsonify(TblRequests.query.get(request_id).json())
    return jsonify({})


@app.route('/routes/new', methods=['GET', "POST"])
def create_route():
    data = request.get_json()
    route = TblTaskRoutes()
    route.name = data['name']
    route.notification_type = data['notificationType']
    route.assign_time_required = data['assignTimeRequired']
    route.execution_time_required = data['executionTimeRequired']
    route.controller_id = data['controllerId']
    route.executor_id = data['executorId']
    write_record(route, get_db().session)

    return jsonify({
        'id': route.id
    })


@app.route('/routes/all', methods=['GET', "POST"])
def all_routes():
    res = []
    for r in TblTaskRoutes.query.all():
        res.append({
            **r.json()
        })
    return jsonify(res)


@app.route('/routes/<int:request_id>', methods=['GET'])
def get_exact_route(request_id):
    req = TblTaskRoutes.query.get(request_id)
    if req:
        return jsonify(TblTaskRoutes.query.get(request_id).json())
    return jsonify({})


@app.route('/categories/all', methods=['GET', "POST"])
def all_categories():
    res = []
    for r in TblTaskCategories.query.all():
        res.append({
            **r.json()
        })
    return jsonify(res)


@app.route('/categories/new', methods=['GET', "POST"])
def new_category():
    data = request.get_json()
    category = TblTaskCategories()
    category.name = data['name']
    category.code = data['code']
    category.priority = data['priority']
    category.task_route_id = data['taskRouteId']
    category.inform_about_accident = data['shouldInformAboutAccident']
    write_record(category, get_db().session)

    return jsonify({
        'id': category.id
    })


@app.route('/controllers/all', methods=['GET', "POST"])
def all_controllers():
    res = []
    for r in TblControllers.query.all():
        res.append({
            **r.json()
        })
    return jsonify(res)


@app.route('/executors/all', methods=['GET', "POST"])
def all_executors():
    res = []
    for r in TblExecutors.query.all():
        res.append({
            **r.json()
        })
    return jsonify(res)
