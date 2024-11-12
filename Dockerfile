# Using a stable Node.js image
FROM node:16

# Setting the working directory
WORKDIR src

# Copying package.json and package-lock.json to src folder
COPY package*.json ./

# Installing dependencies
RUN npm install 

# Copying the rest of the folders to ./src
COPY . .

# Define MONGODB_URL with a default fallback to the local url of the mongodb container
ARG MONGODB_URL="mongodb://mongo:27017/JOKES"
ENV MONGODB_URL=$MONGODB_URL

# Exposing the port on which the backend of the app runs with the default value of 4000
ARG BACKEND_PORT=4000
ENV BACKEND_PORT=$BACKEND_PORT
EXPOSE $BACKEND_PORT

# Command to run the backend of the application which handles adding and getting jokes from the database
CMD [ "node","./Backend/server.js"]