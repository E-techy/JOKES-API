# Web.Dockerfile

# Using a stable Node.js image
FROM node:16

# Setting the working directory
WORKDIR /src/web

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the web application files
COPY Web ./Web

# Define MONGODB_URL with a default fallback
ARG MONGODB_URL="mongodb://mongo:27017/JOKES"
ENV MONGODB_URL=$MONGODB_URL


# Using dynamic port from environment variable with fallback to 3000
ARG FRONTEND_PORT=3000
ENV FRONTEND_PORT=$FRONTEND_PORT
# Exposing the frontend server port
EXPOSE $FRONTEND_PORT

# Command to run the web application
CMD ["node", "./Web/server.js"]
