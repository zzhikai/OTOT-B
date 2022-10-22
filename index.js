const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// will have request body
app.post("/", (req, res) => {
  res.send("Got a POST request");
});

// will have request body
app.put("/", (req, res) => {
  res.send("Got a PUT request");
});

// will have request body?
app.delete("/", (req, res) => {
  res.send("Got a DELETE request");
});

// App to listen on specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
