# CRUD Practice

## Aim
- Create a CRUD application using Node.js, Express, TypeScript and MySQL.
- Use Jest to test the application.

## Requirements
- Node.js
- MySQL

## Setup
- Clone the repository
- Run `npm install` to install the dependencies
- Create a `.env` file in the root directory and add the following:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=crud
```

## Run
- Run `npm start` to start the server
- Run `npm run dev` to start the server in development mode

## Test
- Run `npm test` to run the tests

## API
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get a user by id
- POST `/api/users` - Create a new user
- PUT `/api/users/:id` - Update a user by id
- DELETE `/api/users/:id` - Delete a user by id

## Database
- Create a database named `crud`
- Create a table named `users` with the following columns:
```
id: int
name: varchar(255)
email: varchar(255)
```

## References
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [Jest](https://jestjs.io/)