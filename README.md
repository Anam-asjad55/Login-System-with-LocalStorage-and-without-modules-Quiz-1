Login & Signup System (React + Node + MongoDB + LocalStorage)

This repository contains a Login & Signup application in which user data is stored in MongoDB, and after successful login a JWT token is created by backend and stored in LocalStorage on the frontend side.

This project is created using React with Vite (Custom CSS) for front-end and Node.js + Express + MongoDB for back-end.
Token based authentication is used.

How to Run this Repo’s Code
How to Run this Project
Step 1: Download Code
a. Click Code button
b. Click Download ZIP

Step 2: Extract Files
a. Right-click ZIP → Extract Here
b. A new folder will appear

Step 3: Open Project in VS Code
Open both folders:
myapp-js → Frontend
backend → Backend

Step 4: Install Dependencies
In backend terminal:
npm install
In frontend (myapp-js) terminal:
npm install

Step 5: Create .env in Backend
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Step 6: Run Backend
nodemon index.js
If successful:
MongoDB Connected ✅
Server running on http://localhost:5000

Step 7: Run Frontend
npm run dev


You will get:
http://localhost:5173/
Step 8: View Output
Copy & paste the URL in browser
OR
Ctrl + Click the link from terminal

Tech Used : 
React + Vite (Frontend)
Node.js + Express (Backend)
MongoDB (Database)
JWT + LocalStorage
