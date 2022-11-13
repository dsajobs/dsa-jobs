FROM python:3.8-slim-buster

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app
RUN pip3 install --default-timeout=100 -r requirements.txt

COPY . .

EXPOSE 80

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
