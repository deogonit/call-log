FROM python:3.6-alpine

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

ENV POSTGRES_HOST=database \
    POSTGRES_DB=testdb \
    POSTGRES_USER=user1 \
    POSTGRES_PASSWORD=password \
    POSTGRES_PORT=5432 \
    PYTHONUNBUFFERED=1

WORKDIR /calllog/
COPY requirements.txt /calllog/

#RUN python -m venv venv
#RUN source venv/bin/activate
RUN pip install -r requirements.txt

COPY . /calllog/
#COPY run.sh /call_log/backend

EXPOSE 8000
CMD python run.py
