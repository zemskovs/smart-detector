import enum

from sqlalchemy import Enum


class StatusEnum(enum.Enum):
    new = 'new'
    assigned = 'assigned'
    reject = 'reject'
    in_progress = 'in_progress'
    done = 'done'


STATUS_ENUM_SCHEMA = Enum(StatusEnum)


class NotificationEnum(enum.Enum):
    email = 'email'
    vk = 'vk'
    tg = 'tg'


NOTIFICATION_ENUM_SCHEMA = Enum(NotificationEnum)
