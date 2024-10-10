// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const characters = [
  {
    name: "Charlie",
    job: "Janitor"
  },
  {
    name: "Mac",
    job: "Bouncer"
  },
  {
    name: "Dee",
    job: "Aspring actress"
  },
  {
    name: "Dennis",
    job: "Bartender"
  }
];

function MyApp() {
  const [characters, setCharacters] = useState([]); 
  
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
   
  function removeOneCharacter(index) {
    const userId = characters[index].id;

    fetch(`http://localhost:8000/users/${userId}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
        } else if (response.status === 404) {
          throw new Error("User not found.");
        } else {
          throw new Error("Failed to delete the user.")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
    postUser(person)
      
    //chech error code 201 Created
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to add user.");
        }
      })

      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
    })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);

return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp;
