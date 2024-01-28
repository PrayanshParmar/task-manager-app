# Task Manager App - MERN Stack

## Overview

Task Manager App is a full-stack web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It supports user authentication and CRUD operations on tasks. The user data is stored in MongoDB for authentication, while AWS DynamoDB is used for task-related operations. The server is hosted on AWS Lambda, and the React frontend is hosted on AWS Amplify.

## Features

- **User Authentication:**

  - Register new users with MongoDB.
  - Authenticate users securely.

- **Task Operations:**

  - Create, Read, Update, and Delete tasks.
  - Tasks are stored in AWS DynamoDB.

- **Serverless Architecture:**

  - Backend server is hosted on AWS Lambda for scalability and cost-effectiveness.

- **Frontend Hosting:**
  - React frontend is hosted on AWS Amplify for easy deployment and continuous integration.

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB (for user authentication)
- AWS Lambda (serverless)

### Frontend

- React
- AWS Amplify (hosting)

### Database

- MongoDB (user authentication)
- AWS DynamoDB (tasks)

## Getting Started

To run the Task Manager App locally, follow the steps below.

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/PrayanshParmar/task-manager-app
   ```
2. Navigate to the backend folder:
   ```bash
   cd server
   ```
3. Install dependencies using Yarn:
   ```bash
   yarn install
   ```
4. Create .env file in root folder and enter credentials:
   ```bash
   PORT=8080
   MONGODB_URL=""
   SALT_SECRET=""
   JWT_SECRET=""
   AWS_DYNAMO_ACCESS_KEY=""
   AWS_DYNAMO_SECRET_ACCESS_KEY=""
   DYNAMODB_TASKS_TABLE=""
   ```

5. Start the development server:
   ```bash
   yarn run dev
   ```
6. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
7. Install dependencies using Yarn:
   ```bash
   yarn install
   ```
8. Start the development client:
   ```bash
   yarn start
   ```
## Notes

- Ensure you have MongoDB set up and running locally or provide the connection string to a MongoDB instance in the environment variables.

- AWS credentials should be configured on your development machine for deploying and interacting with AWS services.

- Adjust the MongoDB and DynamoDB configurations according to your needs.

## Author

Prayansh Parmar

Feel free to reach out for any questions or issues related to the Task Manager App. Happy coding!
