
# WitQuiz-Whiz

## Overview

This project is a full-stack web application built with React for the frontend and FastAPI (Python) for the backend. It provides functionality to generate multiple-choice questions (MCQs) based on a given URL.

[![Watch the video](https://drive.google.com/uc?id=1aEZONtPnIr8cP6aRFZnbuYFAO88ggRwO)](https://github.com/aditya292002/WitQuiz-Whiz-main/issues/1#issue-2053652667)

## Frontend

### Installation and Run

To run the frontend, follow these steps:

1. Open a terminal and navigate to the directory.

2. Install dependencies.
   ```
   npm install
   ```

3. Start the development server.
   ```
   npm run start
   ```

4. Open your web browser and visit [http://localhost:3000](http://localhost:3000).

## Backend

### Installation and Run

To run the backend, follow these steps:

1. Open a terminal and navigate to the backend directory.
   ```
   cd "Backend FastAPI Files"
   ```

2. Activate the virtual environment.
   ```
   source venv/bin/activate
   ```

3. Run the FastAPI server.
   ```
   uvicorn app.main:app --reload
   ```

4. Open your web browser and visit [http://localhost:8000/docs](http://localhost:8000/docs) to access the FastAPI interactive documentation.

## Usage

1. Start the frontend and backend servers as instructed above.

2. Access the web application at [http://localhost:3000](http://localhost:3000).

3. Enter a URL and click the "Generate MCQs" button.

4. The application will communicate with the backend to fetch MCQs based on the provided URL.

5. View the generated MCQs and associated information on the web page.

## Dependencies

### Frontend

- React
- Other dependencies are listed in the `package.json` file.

### Backend
-- virtualenv
-- `pip install virtualenv`

## Additional Notes

- Ensure that both the frontend and backend servers are running simultaneously for the application to work correctly.
- Make sure to activate the virtual environment before running the backend server.

