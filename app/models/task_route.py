from sqlalchemy import Column, String

from app.models.base import BaseModel

class TblTaskRoutes(BaseModel):
    __tablename__ = 'task_routes'

    name = Column(String, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'name': self.name
        }
