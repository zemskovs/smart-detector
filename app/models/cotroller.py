from sqlalchemy import Column, String

from app.models.base import BaseModel


class TblControllers(BaseModel):
    __tablename__ = 'controllers'

    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    middle_name = Column(String, nullable=False)
    email = Column(String, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'middleName': self.middle_name,
            'email': self.email,
        }
