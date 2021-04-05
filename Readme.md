# This project is entirely based on nodejs, mongodb and express.s

# pre requesites
1. you need to have node.js version in your local system greater than version 8
2. you need to have mongoDb version in your local system greater than version 3
3. you need to have express.js version in your local system greater than version 4

# local installation steps

# building and running the project 

1. you need to move to project directory eg: cd caw-studios
2. create .env file using touch .env
3. place url = <your local mongodb url>
    eg: url = 'mongodb://127.0.0.1:27017/movie-booling-app'
   place JWT_SECRET_KEY = <your secret>
    eg: JWT_SECRET_KEY = itsdamnsecret
  save the file
4. run the command npm install (installs all node dependencies)
5. after the compleion of above step run the following command node index.js within the project directory

# the app starts listening on http://localhost:8080 
1. the above will be the base url and open index.js file, there you can see all routes that we are using in the project

# user routes
1. use http://localhost:8080/user as base url, remaining urls you can see in routes folder in user.js file 
2. you can use them as eg: http://localhost:8080/user/users with the methods specified in user.js file inside routes folder

# movie routes
1. use http://localhost:8080/movie as base url, remaining urls you can see in routes folder in movie.js file

# theatre routes
1. use http://localhost:8080/theatre as base url, remaining urls you can see in routes folder in theatre.js file

# booking routes
1. use http://localhost:8080/booking as base url, remaining urls you can see in routes folder in reservation.js file



