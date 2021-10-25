const express = require("express");
const users = require("./Users");

const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//get all users

app.get("/api/users", (req, res) => {
  res.send(users);
});

//get one user

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("The user was not found");
  res.send(user);
});

//create a user
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
    job: req.body.job,
  };
  if (!newUser.name || !newUser.age || !newUser.age || !newUser.job)
    return res.status(400).send("Please include the name and the age");
  users.push(newUser);
  res.send(users);
});

//update a user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user was not found");

  const updateUser = req.body;

  if (user.id === parseInt(req.params.id)) {
    user.name = updateUser.name;
    user.age = updateUser.age;
    user.job = updateUser.job;

    res.send(users);
  }
});

//delete a user
app.delete("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("The user was not found");

  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.Port || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
