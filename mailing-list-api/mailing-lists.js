const fs = require("fs").promises;
const express = require("express");
const app = express();
const port = 3000;
const moduleData = require("./data");
const lists = new Map(Object.entries(moduleData));
const newNameList = [];

app.get("/", (req, res) => {
  console.log("you are hitting mailing route!");
  res.send("this is a mailing server!");
});

app.get("/lists", (req, res) => {
  const listNames = Array.from(lists.keys());
  console.log("List Names:", listNames);
  res.json({ lists: listNames });
});
// app.get("/lists", (req, res) => {
//   fs.readFile("./data.json", "utf8").then((getNames) => {
//     //change string into object
//     const names = (getNames = JSON.parse(getNames));
//     res.status(200).send({ names: names });
//   });
//   console.log("you're hitting lists route !");
// });

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}.`);
});
