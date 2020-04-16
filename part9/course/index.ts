import express from "express";
import { calculator, Operation } from "./calculator";
const app = express();

app.get("/calculate", (req, res) => {
  const { value1, value2, op } = req.query;
  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send(result);
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
