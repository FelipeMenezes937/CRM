import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Felipe!");
});

app.post("/", (req, res) => {
  const { name, email } = req.body;
  res.send(`Hello ${name}, your email is ${email}`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
