from sqlalchemy import Column, String, Integer, ForeignKey, Boolean

from app.models.base import BaseModel
from app.models.task_route import TblTaskRoutes


class TblTaskCategories(BaseModel):
    __tablename__ = 'task_categories'

    name = Column(String, nullable=False)
    code = Column(String, nullable=False, default='005')
    priority = Column(Integer, nullable=False, default=5)
    task_route_id = Column(Integer, ForeignKey('task_routes.id'), nullable=True)
    inform_about_accident = Column(Boolean, nullable=False, default=True)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'priority': self.priority,
            'taskRouteId': self.task_route_id,
            'shouldInformAboutAccident': self.inform_about_accident,
        }
