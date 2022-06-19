FROM node:14.19.3-alpine3.15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./
  
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# # Create app entry point
RUN echo 'const app require ("./index.js");app.listen(process.env.PORT, () => console.log(`listening at port: ${process.env.PORT}`));' >> ./server.js

# Bundle app source
COPY . .

EXPOSE $PORT
CMD [ "node", "server.js" ] 