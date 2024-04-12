const fs = require("fs").promises;
const express = require("express");
const app = express();
const port = 3000;
const moduleData = require("./data");
const lists = new Map(Object.entries(moduleData));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("you are hitting mailing route!");
  res.status(200).json(moduleData);
});
//get lists
app.get("/lists", (req, res) => {
  const listNames = Array.from(lists.keys());
  res.json({ lists: listNames });
});

//get by name
app.get("/lists/:name", (req, res) => {
  const names = req.params.name;
  const getNames = lists.get(names);
  typeof getNames === "undefined"
    ? res.status(404).send("Error the route path does not exist")
    : res.status(200).send({ name: names, members: getNames });
});

//put data
//continue working ...
app.put("/lists/:name", (req, res) => {
  const listName = req.params.name;
  // Check if the request body contains 'members' data
  if (!req.body || !req.body.members) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const updatedMembers = req.body.members;
  // Update the list in the 'lists' Map
  lists.set(listName, updatedMembers);
  // Respond with a success message and the updated list details
  res.status(200).json({ name: listName, members: updatedMembers });
});

// GET endpoint to retrieve a list by name
app.get("/lists/:name", (req, res) => {
  const listName = req.params.name;
  // Check if the list name exists in the 'lists' Map
  if (!lists.has(listName)) {
    return res.status(404).json({ error: "List not found" });
  }
  // Retrieve the list members from the 'lists' Map
  const members = lists.get(listName);

  // Respond with the list details
  res.status(200).json({ name: listName, members });
});
// Edit message by ID
// app.put("/messages/:id", (req, res) => {
//   console.log("you are hitting dynamic edit server!");
//   const idShow = req.params.id * 1;
//   const messageIndex = messages.findIndex((ele) => ele.id === idShow);
//   if (messageIndex !== -1) {
//     const { from, text } = req.body;
//     const updatedMessage = {
//       id: idShow,
//       from,
//       text,
//     };
//     messages[messageIndex] = updatedMessage;
//     res.json(updatedMessage);
//   }
// });

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}.`);
});
