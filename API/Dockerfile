FROM pytorch/pytorch

COPY . . 
WORKDIR /api
RUN pip install requirements.txt
RUN flask run
