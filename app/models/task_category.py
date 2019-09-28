from sqlalchemy import Column, String, Integer, ForeignKey

from app.models.base import BaseModel
from app.models.task_route import TblTaskRoutes

class TblTaskCategories(BaseModel):
    __tablename__ = 'task_categories'

    name = Column(String, nullable=False)
    task_route_id = Column(Integer, ForeignKey('task_routes.id'), nullable=True)

    def json(self):
        return {
            'id': self.id,
            'name': self.name
        }
