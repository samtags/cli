FROM node:14.19.3-alpine3.15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY $appName_DIR/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# # Create app entry point
COPY ./server.js .

# Bundle app source
COPY $appName_DIR/ .

EXPOSE $PORT
CMD [ "node", "server.js" ] 