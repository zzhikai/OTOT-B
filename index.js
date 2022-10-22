import "dotenv/config.js";
import apiRoutes from "./api-routes.js";
import express from "express";
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const port = process.env.PORT;

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

app.use("/api", apiRoutes).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});
// App to listen on specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// for testing
export default app;
