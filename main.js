import express from "express";
import dotenv from "dotenv";
import User from "./model/Users.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  await User.create(req.body);
  res.json({ status: true, message: "User is inserted" });
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json({ status: true, data: users });
});

app.get("/users/:username", async (req, res) => {
  const requestedUsername = req.params.username;
  const user = await User.findOne({ where: { username: requestedUsername } });
  res.json({ status: true, data: user });
});

app.put("/users/:username", async (req, res) => {
  const requestedUsername = req.params.username;
  const user = await User.findOne({ where: { username: requestedUsername } });
  user.password = req.body.password;
  await user.save();
  res.json({ status: true, message: "data updated" });
});

app.delete("/users/:username", async (req, res) => {
  const requestedUsername = req.params.username;
  await User.destroy({ where: { username: requestedUsername } });
  res.json({ status: true, message: "data deleted" });
});
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
