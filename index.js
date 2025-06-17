const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const port = process.env.port || 8080;
const path = require("path");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));

let tasks = [
  {
    id: uuidv4(),
    title: "assignment 1",
    content: "assignment of the backend to practice ",
  },
  {
    id: uuidv4(),
    title: "Coding challange",
    content: "preparation of the coding challange",
  },
  {
    id: uuidv4(),
    title: "incomplete homework",
    content: "to complete the homw work of the classes",
  },
];

app.get("/tasks", (req, res) => {
  res.render("index.ejs", { tasks });
});

app.get("/tasks/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/tasks", (req, res) => {
  console.log(req.body);
  let { title, content } = req.body;
  let id = uuidv4();
  tasks.push({ id, title, content });
  res.redirect("/tasks");
});

app.get("/tasks/:id", (req, res) => {
  let { id } = req.params;
  let task = tasks.find((p) => id === p.id);
  console.log(task);

  if (task) {
    res.render("show.ejs", { task });
  } else {
    res.status(404).send("task not found");
  }
});

app.patch("/tasks/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let task = tasks.find((p) => id === p.id);
  task.content = newContent;
  console.log(task);
  // console.log(newContent);
  res.redirect("/tasks");
//   res.send("patch request working");
});

app.get("/tasks/:id/edit", (req, res) => {
  let { id } = req.params;
  let task = tasks.find((p) => id === p.id);
  res.render("edit.ejs", { task });
});

app.delete("/tasks/:id", (req, res) => {
    let { id } = req.params;
    tasks = tasks.filter((p) => id !== p.id);
    res.redirect("/tasks");
  });

app.listen(port, () => {
  console.log(`the Quora task server is listening on ${port}`);
});
