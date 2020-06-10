# Backend Study
 This project consists of a backend project for an online game account subscription and login, acquiring the request public IP of the user (with request-ip library) and registering in a postgresql database (with knex management) the user accounts and the current game rooms available.

## Technologies Used:
- [NodeJS](https://nodejs.org/en/ "NodeJS")
- [Express](https://expressjs.com/ "Express") 
- [Nodemon](https://nodemon.io/)
- [Pg](https://node-postgres.com/)
- [Knex](http://knexjs.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Request-Ip](https://www.npmjs.com/package/request-ip)
- [Celebrate](https://github.com/arb/celebrate) - (yet to be used for validation)

## Usage

 To use this repository it is necessary to create a role (account) in PostgreSQL with login: admin and password: password, or else adapt the [createdb](./models/createdb.js) (in models folder)  and [knexfile](./knexfile.js) configuration files to your user preferences.


#### Installing Dependencies

 The first necessary requirement is to install the dependencies using the following command:

```
  npm install 
```

 **Warning:** the nodemon package was installed globaly in the local repository so if you don't share this configuration, it should be installed with `npm install nodemon`.



#### Setup the database
 After installing the dependencies the database environment is prepared with the command:


```
  npm run setup
```

 Running the above commands without errors should create a postgres database called "database", in which the data will be stored. The next step consists in creating the "users" table (which will store the user data with a hash encrypted password) and the "rooms" table (which will store online games information, with IP for connection and the room info).


#### Creating Tables
 In order to create these tables, knex provides migrations functions to control the database history. The following script will create the tables:


```
  npm run migrate
```

and for testing porpuse if you want to populate the rooms table you can run the command:

```
  npm run seed
```

 If during any step of your application you want to change the table schema you can rollback (note you will lose the data stored in the tables) the migrations running the command:

```
  npm run unmigrate
```
followed by a migrate script run to recreate the tables.


#### Running the Application

 Finally you can run the application by running the dev script as following:

```
  npm run dev
```

 making the express application listen to requests on port 3333 at your [localhost](http://localhost:3333/api)

## Routes

 The main routes of this application are located inside the [api](./routes/api) folder linked by the [routes.js](./routes/routes.js) file.

- api/user
- api/room

## Results
 Here are some of the results for the HTTPRequest developed in the [Godot Engine](https://godotengine.org/ "Godot Engine") using a simple GUI:


User Checking  |  Password Checking 
:-------------------------:|:-------------------------:
![Username](https://media.discordapp.net/attachments/694667289383010318/719775852941803541/unknown.png "No Username Found" )  | ![Password](https://media.discordapp.net/attachments/694667289383010318/719775930155008051/unknown.png "Password Match Failed" )







