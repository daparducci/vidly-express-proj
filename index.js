const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const genres = [
  { id: 1, name: "Horror" },
  { id: 1, name: "Comedy" },
  { id: 1, name: "Drama" }
];

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
