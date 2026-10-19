# Lab-Act9

# Laboratory Activity 9: Student Records RESTful API

## Project Description

The Student Records API is a RESTful API developed using Node.js and Express.js. It allows users to create, retrieve, update, and delete student records. It also validates student information, including name, course, year level, and email address.

This project demonstrates CRUD operations, request validation, HTTP status codes, Postman testing, GitHub version control, and deployment using Render.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Postman
- Git and GitHub
- Render

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/paulgaje2-del/Lab-Act9.git
```

### 2. Navigate to the Project Folder

```bash
cd Lab-Act9
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

The API will run locally at:

`http://localhost:3000`

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/api/students` | Retrieve all students |
| GET | `/api/students/:id` | Retrieve a student by ID |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update an existing student |
| DELETE | `/api/students/:id` | Delete a student |

## Student Data Fields

Each student record contains:

- `id` — Automatically generated unique ID
- `name` — Student's full name
- `course` — Student's course
- `yearLevel` — Year level from 1 to 6
- `email` — Student's email address

## Example Request

### Create a Student

**Method:** `POST`

**URL:** `http://localhost:3000/api/students`

**Body:** Select **raw → JSON** in Postman.

```json
{
  "name": "Juan Dela Cruz",
  "course": "BS Information Technology",
  "yearLevel": 2,
  "email": "juan@example.com"
}
```

### Example Response

```json
{
  "message": "Student created successfully.",
  "data": {
    "id": 1,
    "name": "Juan Dela Cruz",
    "course": "BS Information Technology",
    "yearLevel": 2,
    "email": "juan@example.com"
  }
}
```

## Validation and Error Handling

The API checks that:

- Required fields are provided and have the correct data types.
- The year level is an integer between 1 and 6.
- The email address has a valid format.
- The student ID is a positive integer.
- The requested student exists before updating or deleting.
- Invalid JSON request bodies return an error response.

## Testing with Postman

Test the following requests:

1. `GET /` — Check whether the API is running.
2. `GET /api/students` — Retrieve all student records.
3. `POST /api/students` — Create a student record.
4. `GET /api/students/1` — Retrieve a specific student.
5. `PUT /api/students/1` — Update a student record.
6. `DELETE /api/students/1` — Delete a student record.
7. Submit invalid data and nonexistent IDs to verify error handling.

Use the appropriate request method and JSON body for each operation.

## GitHub Repository

https://github.com/paulgaje2-del/Lab-Act9

## Render Deployment

The repository includes a Render Blueprint in `render.yaml`. In Render, create a new Blueprint Instance and select this repository. Render will install dependencies with `npm install` and start the service with `npm start`; the server listens on Render's assigned `PORT`.

**Public API URL:** Add your actual Render deployment URL after deployment.

Example: `https://your-service-name.onrender.com`

After deployment, test the public URL using Postman.

## Known Limitations

- Student records are stored in an in-memory array.
- Records disappear when the server restarts.
- No database is connected to the API.
- This project is intended for educational purposes.

## Author

Paul Gaje

## Subject

Integrative Programming & Technology — ITPE101

## Activity

Laboratory Activity 9: Building, Testing, and Deploying a RESTful API