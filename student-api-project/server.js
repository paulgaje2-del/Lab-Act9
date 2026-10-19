const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let students = [];
let nextId = 1;

function validateStudent(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Request body must be a JSON object.";
  }

  const { name, course, yearLevel, email } = data;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof course !== "string" || !course.trim() ||
    typeof email !== "string" || !email.trim() ||
    !Number.isInteger(yearLevel) ||
    yearLevel < 1 || yearLevel > 6
  ) {
    return "Provide name, course, email, and yearLevel from 1 to 6.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Please provide a valid email address.";
  }

  return null;
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Records API is running."
  });
});

app.get("/api/students", (req, res) => {
  res.status(200).json({
    count: students.length,
    data: students
  });
});

app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "ID must be a positive integer."
    });
  }

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found."
    });
  }

  res.status(200).json({ data: student });
});

app.post("/api/students", (req, res) => {
  const error = validateStudent(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const student = {
    id: nextId++,
    name: req.body.name.trim(),
    course: req.body.course.trim(),
    yearLevel: req.body.yearLevel,
    email: req.body.email.trim()
  };

  students.push(student);

  res.status(201).json({
    message: "Student created successfully.",
    data: student
  });
});

app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "ID must be a positive integer."
    });
  }

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Student not found."
    });
  }

  const error = validateStudent(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  students[index] = {
    id,
    name: req.body.name.trim(),
    course: req.body.course.trim(),
    yearLevel: req.body.yearLevel,
    email: req.body.email.trim()
  };

  res.status(200).json({
    message: "Student updated successfully.",
    data: students[index]
  });
});

app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "ID must be a positive integer."
    });
  }

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Student not found."
    });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully.",
    data: deleted
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON request body."
    });
  }

  next(err);
});

app.listen(PORT, () => {
  console.log(`Student Records API running on port ${PORT}`);
});