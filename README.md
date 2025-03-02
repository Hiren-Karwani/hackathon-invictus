SR-31-Invictus

## Project Overview
SR-31-Invictus is a React Native application using Expo for development and an Express.js backend with MySQL for user authentication and research paper search functionality.

## Features
- *User Authentication*: Signup and login with JWT authentication.
- *Research Paper Search*: Fetches academic research papers using the CORE API.
- *Database Integration*: Uses MySQL for storing user data.
- *Protected API Routes*: Secured with JWT authentication.

## Tech Stack
### Frontend
- React Native
- Expo
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MySQL
- JWT for authentication
- Bcrypt for password hashing
- Axios for API integration

## Installation & Setup
### Prerequisites
- Node.js (v14+ recommended)
- MySQL database
- Expo CLI

### Setup Instructions
1. Clone the repository:
   sh
   git clone https://github.com/your-repo/SR-31-Invictus.git
   cd SR-31-Invictus
   

2. Install dependencies:
   sh
   npm install
   

3. Setup environment variables:
   - Create a .env file in the root directory.
   - Add the following:
     env
     JWT_SECRET=your_secret_key
     DB_HOST=your_db_host
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     CORE_API_KEY=your_core_api_key
     

4. Start the backend server:
   sh
   node server.js
   

5. Start the frontend:
   sh
   expo start
   

## API Endpoints
### User Authentication
- *Signup*: POST /signup
- *Login*: POST /login

### Research Papers
- *Search Research Papers* (JWT Protected): GET /search?query=your_query

## Troubleshooting
- If node start throws an error, use npm start instead.
- Ensure your MySQL database is running and properly configured.
- Install missing dependencies with npm install.

## License
This project is licensed under the MIT License