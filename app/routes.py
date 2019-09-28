from app import app
from flask import jsonify, request

from app.core.parsers.vk import VKParser
from app.core.predictors.classify import classify_text
from app.factories.database import get_db
from app.models.cotroller import TblControllers
from app.models.executor import TblExecutors

from app.models.request import TblRequests
from app.models.task_route import TblTaskRoutes
from app.utils import write_record


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/new', methods=['POST', 'GET'])
def import_from_post():
    data = request.get_json()
    if True:  # not data:
        data = {
            'socialNetwork': 'vk',
            'fromUrl': 'https://vk.com/club184648030?w=wall-184648030_32%2Fall',
        }
    net = data['socialNetwork']
    if net != 'vk':
        raise NotImplementedError

    parser = VKParser()
    post = parser.parse(data['fromUrl'])

    db_request = TblRequests()
    db_request.text = post.title + post.text
    write_record(db_request, get_db().session)

    db_request.category = classify_text(db_request.text)
    write_record(db_request, get_db().session)

    return jsonify(db_request.json())


@app.route('/requests/all', methods=['GET'])
def get_all():
    res = []
    for request in TblRequests.query.all():
        if not request:
            continue

        res.append({
            **request.json()
        })
    return jsonify(res)


@app.route('/rotes/new', methods=['GET', "POST"])
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


@app.route('/rotes/all', methods=['GET', "POST"])
def create_route():
    data = request.get_json()
    return jsonify({"ok": 200})


@app.route('/categories/all', methods=['GET', "POST"])
def all_categories():
    data = request.get_json()
    return jsonify({"ok": 200})


@app.route('/controllers/all', methods=['GET', "POST"])
def all_controllers():
    res = []
    for request in TblControllers.query.all():
        res.append({
            **request.json()
        })
    return jsonify(res)


@app.route('/executors/all', methods=['GET', "POST"])
def all_executors():
    res = []
    for request in TblExecutors.query.all():
        res.append({
            **request.json()
        })
    return jsonify(res)


@app.route('/feedback', methods=['GET', "POST"])
def feedback():
    data = request.get_json()
    return jsonify({"ok": 200})
