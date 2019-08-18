const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const genres = [
  { id: 1, name: "Horror" },
  { id: 1, name: "Comedy" },
  { id: 1, name: "Drama" }
];

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

//Post a Genre
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

//Edit
app.put("/api/genres/:id", (req, res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre does not exist");
  }
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }
  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  let genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre does not exist");
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
