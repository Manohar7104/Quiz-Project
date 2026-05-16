# Quiz App

Simple full stack quiz application built with Node.js (Express) backend and a plain HTML/CSS/JavaScript frontend. This project uses in-memory question storage.

## Features

- Welcome screen with name entry
- Subject selection (HTML, CSS, JavaScript, Python)
- Question-by-question quiz interface
- Question palette with status (answered / unanswered / review)
- Save, Mark for Review, Clear, and Submit actions
- Backend validation and scorecard with answers review

## Folder structure

quiz-app/
├── backend/
│ ├── server.js # Express server and API
│ ├── questions.js # In-memory questions and answers
│ └── package.json
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
└── README.md

## Installation

1. Open a terminal in `quiz-app/backend`
2. Run `npm install` to install dependencies (express, cors)

## Run

1. Start the backend server:

```bash
cd quiz-app/backend
npm install
npm start
```

2. Open the frontend by opening `quiz-app/frontend/index.html` in a browser or run it using live server. The frontend expects the backend at `http://localhost:4000`.

Note: No database is required, questions are stored in memory in `questions.js`.

## Development notes

- The frontend uses simple DOM updates and avoids large innerHTML blocks.
- The backend exposes `GET /questions/:subject` (does not send answers) and `POST /submit` for score calculation.
