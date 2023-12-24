# Task 3: Optimize a RESTful API

## Overview

The following is an existing RESTful API implemented using Express.js and MongoDB. The task is to optimize the API's performance and maintainability.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/mydb';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number
});

const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
```

## Areas for Optimization

Consider the following areas for optimization:

1. **Refactor the Code**: Follow best practices for modularization and separation of concerns to enhance maintainability.

2. **Implement Input Validation**: Ensure robust input validation for all incoming requests to improve data integrity and security.

3. **Add Comprehensive Error Handling and Logging**: Enhance error handling mechanisms and implement comprehensive logging for better diagnostics and debugging.

4. **Implement Rate Limiting**: Protect against abuse and denial-of-service attacks by implementing rate limiting mechanisms.

5. **Optimize Database Queries and Indexing**: Improve database performance by optimizing queries and utilizing effective indexing strategies.

6. **Refactor to TypeScript**: Migrate the codebase to TypeScript to leverage static typing and enhance code maintainability.

**Please provide a detailed report outlining the changes made, the rationale behind them, and any performance improvements observed.**

## Steps taken to improve the code:

1. **Database Connection Update**: Removed `useCreateIndex: true` from the DB connection configuration as it's deprecated in the latest Mongoose versions.

2. **Code Modularization and Structure**: Separated the code into corresponding folders and files, following a classic project structure (controller - service - repository). This structure enhances code readability, maintainability, and scalability.

3. **Rate Limiter and Validation Middlewares**: Implemented rate limiter middleware, limiting requests to 100 per minute. In case of exceeding this limit, the server responds with a status code of 429. The validation middleware handles POST requests, ensuring proper error handling.

4. **Performance Optimization**:
    - **Pagination**: Added pagination to the GET endpoint, reducing the load on the API by returning only 10 results per request.
    - **Indexing**: The "unique: true" option in the user schema for the email field, providing an index under the hood.

5. **Code Refactoring using TypeScript**: Refactored the codebase using TypeScript, enhancing type safety and overall code quality.
