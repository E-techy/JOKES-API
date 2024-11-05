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

# Exposing the port on which the app runs
EXPOSE 3000

# Command to run the application
CMD [ "npm","start"]