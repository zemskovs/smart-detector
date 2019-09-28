from sqlalchemy import Column, Text, Integer, ForeignKey, Boolean

from app.models.base import BaseModel
from app.models.author import TblAuthors
from app.models.enumerates import STATUS_ENUM_SCHEMA, StatusEnum
from app.models.status_changes import TblStatusChanges


class TblRequests(BaseModel):
    __tablename__ = 'requests'

    text = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey('authors.id'), nullable=True)
    category_id = Column(Integer, ForeignKey('task_categories.id'), nullable=True)
    task_status = Column(STATUS_ENUM_SCHEMA, nullable=False, default=StatusEnum.new)
    on_control = Column(Boolean, nullable=False, default=False)

    def json(self):
        changes = TblStatusChanges.query.filter_by(request_id=self.id) \
            .order_by(TblStatusChanges.creation_time.desc())\
            .all()
        statuses = [change.json() for change in changes]
        return {
            'id': self.id,
            'text': self.text,
            'authorId': self.author_id,
            'categoryId': self.category_id,
            'taskStatus': self.task_status.value,
            'isOnControl': self.on_control,
            'statuses': statuses
        }
