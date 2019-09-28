from sqlalchemy import Column, Text, Integer, ForeignKey, Boolean

from app.models.base import BaseModel
from app.models.author import TblAuthors
from app.models.enumerates import STATUS_ENUM_SCHEMA, StatusEnum


class TblRequests(BaseModel):
    __tablename__ = 'requests'

    text = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey('authors.id'), nullable=True)
    executor_id = Column(Integer, ForeignKey('executors.id'), nullable=True)
    category_id = Column(Integer, ForeignKey('task_categories.id'), nullable=True)
    task_status = Column(STATUS_ENUM_SCHEMA, nullable=False, default=StatusEnum.new)
    on_control = Column(Boolean, nullable=False, default=False)

    def json(self):
        statuses = []
        return {
            'id': self.id,
            'authorId': self.authorId,
            'executorId': self.executor,
            'categoryId': self.category_id,
            'taskStatus': self.task_status.value,
            'isOnControl': self.on_control,
            'statuses': []
        }
