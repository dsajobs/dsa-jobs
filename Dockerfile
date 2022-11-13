FROM node:alpine

WORKDIR '/app'

# Install some depenendencies
COPY package.json .
RUN yarn install
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Default command
CMD ["yarn", "run", "start"]


##Commands To Run The Container

##Developer
##docker build -t dsajobs .
##docker run -p 8080:3000/tcp dsajobs

##User
##docker pull dsajobs
##docker run -p 8080:3000/tcp dsajobs



#FROM node:lts-slim

# set working directory
#WORKDIR /app

# add /app/node_modules/.bin to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
#COPY package*.json ./
#RUN yarn start

# add app
#COPY . ./

# start app
#CMD ["npm", "start"]


#FROM 

#WORKDIR /app

#COPY package.json* ./

#RUN npm config delete proxy

#RUN npm config delete https-proxy

#RUN npm config set registry="http://registry.npmjs.org/"

#RUN npm config set fetch-retry-mintimeout 20000

#RUN npm config set fetch-retry-maxtimeout 120000

#RUN npm cache clean --force

#RUN npm install -g npm@9.1.1

#RUN npm install --legacy-peer-deps

#COPY . .

#ENV PORT=3000

#EXPOSE 3000

#CMD ["npm" , "start"]
