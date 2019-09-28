from app import app
from flask import jsonify, request

from app.core.parsers.vk import VKParser
from app.core.predictors.classify import classify_text
from app.factories.database import get_db

from app.models.request import TblRequests
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

    db_request.task_type = classify_text(db_request.text)
    write_record(db_request, get_db().session)

    return jsonify(db_request.json())


@app.route('/all', methods=['GET'])
def get_all():
    res = []
    # for proposal in TblProposals.query.all():
    #     if not proposal:
    #         continue
    #     discussion = TblDiscussions.query.filter_by(proposal_id=proposal.id).first()
    #     answers = TblAnswers.query.filter_by(discussion_id=discussion.id).all()
    #
    #     res.append({
    #         **proposal.json(),
    #         'poll': [a.json() for a in answers]
    #     })
    return jsonify(res)


@app.route('/analyze', methods=['GET', 'POST'])
def analyze_proposal():
    # data = request.get_json()
    # if not data:
    #     data = {
    #         'proposalId': '1'
    #     }
    # fill_sentiments(data['proposalId'])
    return jsonify(
        {
            "category": "vk",
            "date": "28.09.2019",
            "imlementMembers": [
                "Петров Николай Андреевич",
                "Никифоров Владимир Витаельевич"
            ],
            "controlMembers": [
                "Иванова Галина Николаевна",
                "Петрова Валентина Витальевна"
            ],
            "statuses": [
                {
                    "status": "Заявка зарегистрирована",
                    "date": "29.08.2018",
                    "type": "reg"
                },
                {
                    "status": "Назначен исполнитель",
                    "description": "Иванов А.А.",
                    "date": "30.08.2018",
                    "type": "reg"
                }
            ]
        }
    )


@app.route('/feedback', methods=['GET', "POST"])
def feedback():
    data = request.get_json()
    return jsonify({"ok": 200})
