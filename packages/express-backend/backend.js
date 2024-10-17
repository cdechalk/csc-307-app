// backend.js
import express from "express";
import cors from "cors";

import {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob, findUserByNameAndJob
} from "./Models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// const generateId = () => {
//   return Math.random().toString(36).substring(2,8);
// };

// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };

// const findUserByNameAndJob = (name, job) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name && user["job"] === job
//   );
// }

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const addUser = (user) => {
//   user.id = generateId(); //generate id when user is added
//   users["users_list"].push(user);
//   return user;
// };

// const deleteUserById = (id) => {
//   const index = users["users_list"].findIndex((user) => user["id"] === id);
//   if (index !== -1) {
//     users["users_list"].splice(index, 1);
//     return true;
//   }
//   return false;
// };


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {

    //   let result = findUserByNameAndJob(name, job);
    //   result = { users_list: result };
    //   res.send(result);

    findUserByNameAndJob(name, job)
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));

  } else if (name !== undefined) {

    //   let result = findUserByName(name);
    //   result = { users_list: result };
    //   res.send(result);

    findUserByName(name)
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));

  } else if (job !== undefined) {

    findUserByJob(job)
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));

  } else {

    //   res.send(users);

    getUsers()
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  //let result = findUserById(id);
  findUserById(id)
    .then(result => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch(error => res.status(500).send(error));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  //userToAdd.id = generateId(); //generate id when user is posted
  addUser(userToAdd)
    .then(result => res.status(201).send(result))
    .catch(error => res.status(500).send(error));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  //const result = deleteUserById(id);
  deleteUserById(id)
    .then(result => {
      if (result) {
        res.status(204).send('User deleted successfully');
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     },
//   ]
// };
//
