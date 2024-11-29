## School Management API
Overview
This project implements a set of APIs to manage school data, including functionality to add new schools and retrieve a list of schools sorted by proximity to a user-specified location. The system is built with Node.js, Express.js, and MySQL.

Features:
Add School API: Allows users to add new schools to the database.
List Schools API: Fetches a list of schools sorted by proximity to a specified location.
Prerequisites
Before you start, make sure you have the following installed on your local machine:

Node.js (version >= 14.x)
MySQL (for database setup)
Postman (for testing the APIs)
Setup
1. Clone the repository
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api

3. Install dependencies
Navigate to the project directory and install the required dependencies using npm:
npm install

3. Configure MySQL Database
Create a MySQL Database:
Log into MySQL:
mysql -u root -p
Create a new database (e.g., school_management):

CREATE DATABASE school_management;

Create the schools table: Use the following SQL script to create the schools table with the required fields:
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

Configure the database connection:
Open the project folder and locate the config.js file.
Update the MySQL connection details as per your local setup (host, username, password, database name).
Example configuration:
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'school_management'
};

4. Start the server
Once the database is set up, start the Node.js server by running:
npm start
The server will run on http://localhost:3000 by default.

5. Test the APIs
Use Postman to test the APIs.

Add School API
Endpoint: POST /addSchool
Payload:
{
  "name": "Sample School",
  "address": "123 School St, City, Country",
  "latitude": 12.9716,
  "longitude": 77.5946
}
Expected Response:
{
  "message": "School added successfully"
}

List Schools API
Endpoint: GET /listSchools
Query Parameters:
latitude: Latitude of the user's location.
longitude: Longitude of the user's location.

Example request:
GET http://localhost:3000/listSchools?latitude=12.9716&longitude=77.5946
Expected Response:

[
  {
    "id": 1,
    "name": "Sample School",
    "address": "123 School St, City, Country",
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  ...
]
