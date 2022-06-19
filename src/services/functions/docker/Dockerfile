FROM node:14.19.3-alpine3.15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./
  
RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --only=production

# # Create app entry point
RUN mkdir /usr/src/app/.config/
RUN touch /usr/src/app/.config/server.js
RUN echo 'import app from "/usr/src/app/index.js"; app.listen(process.env.PORT, () => console.log(`listening at port: ${process.env.PORT}`));' >> /usr/src/app/.config/server.js

# Bundle app source
COPY . .

EXPOSE $PORT
CMD [ "nodemon", "./.config/server.js" ] 