from datetime import datetime, time
from peewee import Model, CharField, DateTimeField, TimeField

from app.app import database


class BaseModel(Model):
    class Meta:
        database = database


class CallLog(BaseModel):
    number_user = CharField(max_length=32)
    number_answerer = CharField(max_length=32)
    datetime_call: datetime = DateTimeField(formats=['%Y-%m-%d %H:%M:%S'],
                                            default=datetime.today())
    duration_call: time = TimeField(formats=['%Y-%m-%d %H:%M:%S'])

    def __str__(self):
        return 'User with number {} has called to user with number {}'. \
            format(self.number_user, self.number_answerer)

    def jsonify(self):
        return {
            'number_user': self.number_user,
            'number_answerer': self.number_answerer,
            'datetime_call': self.datetime_call.strftime('%b %d, %Y %H:%M:%S'),
            'duration_call': str(self.duration_call),
        }
