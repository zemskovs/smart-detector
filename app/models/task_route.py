from sqlalchemy import Column, String, Integer, ForeignKey

from app.models.base import BaseModel
from app.models.enumerates import NotificationEnum, NOTIFICATION_ENUM_SCHEMA


class TblTaskRoutes(BaseModel):
    __tablename__ = 'task_routes'

    name = Column(String, nullable=False)
    notification_type=Column(NOTIFICATION_ENUM_SCHEMA, nullable=False, default=NotificationEnum.email)
    assign_time_required=Column(Integer, nullable=False, default=1)
    execution_time_required=Column(Integer, nullable=False, default=1)
    controller_id=Column(Integer, ForeignKey('controllers.id'), nullable=True)
    executor_id=Column(Integer, ForeignKey('executors.id'), nullable=True)

    def json(self):
        return {
            'id': self.id,
            'notificationType': self.notification_type,
            'assignTimeRequired': self.assign_time_required,
            'executionTimeRequired': self.execution_time_required,
            'controllerId': self.controller_id,
            'executorId': self.executor_id,
        }
