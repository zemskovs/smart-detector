from sqlalchemy import Column, String

from app.models.base import BaseModel


class TblAuthors(BaseModel):
    __tablename__ = 'authors'

    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    middle_name = Column(String, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'middleName': self.middle_name
        }
