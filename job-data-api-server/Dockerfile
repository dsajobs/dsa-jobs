FROM node:alpine

WORKDIR '/data'

# Install some depenendencies
COPY package*.json ./
RUN npm install
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Default command
CMD ["npm", "start"]