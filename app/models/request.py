from sqlalchemy import Column, Text, Integer, ForeignKey, Boolean

from app.models.base import BaseModel
from app.models.author import TblAuthors
from app.models.enumerates import STATUS_ENUM_SCHEMA, StatusEnum


class TblRequests(BaseModel):
    __tablename__ = 'requests'

    text = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey('authors.id'), nullable=True)
    executor = Column(Integer, ForeignKey('executors.id'), nullable=True)
    task_type = Column(Integer, ForeignKey('task_categories.id'), nullable=True)
    task_status = Column(STATUS_ENUM_SCHEMA, nullable=False, default=StatusEnum.new)
    on_control = Column(Boolean, nullable=False, default=False)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'middleName': self.middle_name
        }
