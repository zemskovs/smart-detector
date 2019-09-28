from sqlalchemy import Column, String, Integer, ForeignKey

from app.models.base import BaseModel
from app.models.enumerates import STATUS_ENUM_SCHEMA, StatusEnum


class TblStatusChanges(BaseModel):
    __tablename__ = 'status_changes'

    prev_task_status = Column(STATUS_ENUM_SCHEMA, nullable=False, default=StatusEnum.new)
    new_task_status = Column(STATUS_ENUM_SCHEMA, nullable=False, default=StatusEnum.new)
    request_id = Column(Integer, ForeignKey('requests.id'), nullable=True)

    def json(self):
        return {
            'id': self.id,
            'requestId': self.request_id,
            'previousTaskStatus': self.prev_task_status.value,
            'newTaskStatus': self.new_task_status,
            'creationTimestamp': self.creation_time,
            'lastModifiedTimestamp': self.last_modified,
        }
