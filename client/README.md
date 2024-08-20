Full-Stack Test Environment Platform
Overview
This project is a Full-Stack Test Environment Platform designed for conducting tests with multiple-choice questions (MCQs). It features user authentication, test environment setup with camera and microphone permissions, and automatic test evaluation. The application uses React.js for the frontend and Node.js with Express and MongoDB for the backend.

Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (version X.X.X or higher)
npm (comes with Node.js)
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <project-directory>
Install backend dependencies:
Navigate to the backend directory and install the required packages:

bash
Copy code
cd server
npm install
Install frontend dependencies:
Navigate to the client directory and install the required packages:

bash
Copy code
cd ../client
npm install
Running the Application
Start the backend server:
Open a terminal, navigate to the backend directory, and start the server:

bash
Copy code
cd ../server
node server.js
Start the frontend client:
Open another terminal window, navigate to the client directory, and start the client:

bash
Copy code
cd ../client
npm start
The frontend application will be available at http://localhost:3000.

Development Mode
The frontend application runs in development mode.
The page will automatically reload if you make changes to the source files.
Features
User Authentication: Secure login and registration process.
Test Environment: Setup with camera and microphone permissions.
MCQ Test Interface: Display and manage multiple-choice questions.
Automatic Evaluation: Test results are evaluated and notifications are sent automatically.
Cron Job Integration: For automated test evaluation.
Technologies Used
Frontend:

React.js
Backend:

Node.js
Express
MongoDB
CORS
Nodemailer
node-cron
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a Pull Request.