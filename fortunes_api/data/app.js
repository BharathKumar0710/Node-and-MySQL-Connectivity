const express = require("express");
const bodyParser = require("body-parser");
const fortunes = require("./fortunes.json");
const port = 3000;
const app = express();

app.use(bodyParser.json());

app.get("/fortunes", (req, res) => {
  console.log("Requesting Fortunes");
  //   res.send("Requesting Fortunes");
  res.json(fortunes);
});

app.get("/fortunes/random", (req, res) => {
  console.log("Requesting random fortune");
  // const random_index = Math.floor(Math.random() * fortunes.length);
  // const r_fortune = fortunes[random_index];
  // res.json(r_fortune);

  //----OR----

  res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

app.get("/fortunes/:id", (req, res) => {
  console.log(req.params);
  res.json(fortunes.find((f) => f.id == req.params.id));
});

app.post("/fortunes", (req, res) => {
  // console.log(req.body);

  const { message, lucky_number, spirit_animal } = req.body;
  const fortune_ids = fortunes.map((f) => f.id);
  
  // const fortune = {
  //   id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
  //   message,
  //   lucky_number,
  //   spirit_animal,
  // };
  //-----or-----

  const new_fortunes = fortunes.concat({
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    spirit_animal,
  });
  fs.writeFile("./data/fortunes.json", JSON.stringify(new_fortunes), (err) =>
    console.log(err)
  );
  res.json(new_fortunes);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
