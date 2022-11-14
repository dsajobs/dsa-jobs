FROM python:3.8-slim-buster

COPY ./requirements.txt /app/requirements.txt

RUN apt-get -y update && \
   apt-get install -y --no-install-recommends build-essential  \
   curl wget nginx ca-certificates npm \
   && npm install pm2 -g \
   && pip install --upgrade pip setuptools \
   && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN python3 -m venv venv
RUN . venv/bin/activate

RUN pip3 install --default-timeout=100 -r requirements.txt

COPY . .

EXPOSE 8080

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]