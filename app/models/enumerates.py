import enum

from sqlalchemy import Enum


class StatusEnum(enum.Enum):
    new = 'new'
    assigned = 'assigned'
    reject = 'reject'
    in_progress = 'in_progress'
    done = 'done'


STATUS_ENUM_SCHEMA = Enum(StatusEnum)