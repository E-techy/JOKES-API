
# JOKES-API

This is a simple jokes API where anyone can add and receive jokes in any Language (eg. ENGLISH, JAPANESE, HINDI, etc).

It uses a simple nodejs backend and frontend server and a local or cloud MongoDB instance which is used to store the jokes.


## Run Locally

Clone the project

```bash
  git clone https://github.com/E-techy/JOKES-API.git
```

Go to the project directory

```bash
  cd JOKES-API
```

Install dependencies

```bash
  npm install
```
Then start your MongoDB application and set the MONGODB_URL in the .env file to your local MongoDB URI.
By default it is set to 

MONGODB_URL=mongodb://mongo:27017/JOKES

Start the server

```bash
  npm run start
```
 Now you can visit the frontend to add or receive jokes at:
 
 ```bash
  http://localhost:3000/
```
To get jokes directly from the jokes-api use:
```bash
 http://localhost:4000/jokes?LANGUAGE=<Any language>&NO_OF_JOKES=<Any integer value>
```
For example:
```bash
 http://localhost:4000/jokes?LANGUAGE=ENGLISH&NO_OF_JOKES=5
```

### To add jokes to the database without the frontend. You can use POSTMAN and in the URL type:
```bash
  http://localhost:4000/addjokes?LANGUAGE=ENGLISH
```
You can modify the LANGUAGE query to point to the language of your jokes.


Set the request type to POST and then
Set the body of the request to json and add the jokes in the following format:
```json
  {
    "jokes" : [
      "Add your first joke here",
      "Add your second joke here",
      "Add the other jokes in the similar manner."
    ]
  }
```

You have to always use this format to add jokes. It is REQUIRED. Otherwise the jokes will be not added.
![App Screenshot](https://github.com/E-techy/JOKES-API/blob/main/Screenshots/Screenshot%202024-11-12%20at%207.17.26%E2%80%AFPM.png?raw=true)


## Deploy the project using docker-compose:

Clone the project

```bash
  git clone https://github.com/E-techy/JOKES-API.git
```

Go to the project directory

```bash
  cd JOKES-API
```
If you want to run the jokes-api with the default configuration you can leave the environment variables section.
### Environment Variables

To run this project, you will need to add the following environment variables in your .env file

`MONGODB_URL`  Default mongodb://mongo:27017/JOKES .

If you want to use a cloud instance of MongoDB like Mongodb atlas you can set this to point to the URI of the cloud cluster and dont forget to add the username and password value in the URI.

Example
```bash
  mongodb+srv://<db_username>:<db_password>@jokes-api-testing.c2tlr.mongodb.net/?retryWrites=true&w=majority&appName=jokes-api-testing"
```


`FRONTEND_PORT` Default 3000

`BACKEND_PORT` Default 4000

### Start the docker daemon
Then come to the JOKES-API directory in the CMD and run
```bash
  docker-compose up --build
```
Now all the containers will be started:

You can visit the frontend and backend on the localhost port you specified in the .env file.

The URLs will be in the format:
```bash
  http://localhost:<FRONTEND_PORT>
  http://localhost:<BACKEND_PORT>
```


## USAGE / EXAMPLES

### Frontend Page:
Getting jokes:
![App Screenshot](https://github.com/E-techy/JOKES-API/blob/main/Screenshots/Screenshot%202024-11-12%20at%207.12.24%E2%80%AFPM.png?raw=true)

Adding JOKES:
![App Screenshot](https://github.com/E-techy/JOKES-API/blob/main/Screenshots/Screenshot%202024-11-12%20at%207.11.03%E2%80%AFPM.png?raw=true)

Getting jokes directly from the backend:
![App Screenshot](https://github.com/E-techy/JOKES-API/blob/main/Screenshots/Screenshot%202024-11-12%20at%207.13.22%E2%80%AFPM.png?raw=true)




## Contributing

Contributions are always welcome!

Add changes to the frontend or backend service to make them more useful.

PRs will be merged if they do not introduce any new conflicts and crashes

Please adhere to this project's `code of conduct`.


## License

Everyone is free to use this jokes-api for private as well as commercial uses.

[MIT](https://choosealicense.com/licenses/mit/)

