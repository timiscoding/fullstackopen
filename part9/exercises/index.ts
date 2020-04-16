import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.post("/exercises", (req, res) => {
  const {
    daily_exercises: dailyExercises,
    target,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { daily_exercises: any; target: any } = req.body;
  if (!target || !dailyExercises) {
    throw new Error("parameters missing");
  }
  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((e) => isNaN(Number(e))) ||
    isNaN(Number(target))
  ) {
    throw new Error("malformatted parameters");
  }
  const exRes = calculateExercises(dailyExercises, target);
  res.json(exRes);
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  const ht = Number(height);
  const wt = Number(weight);
  if (isNaN(ht) || isNaN(wt)) {
    throw new Error("malformatted parameters");
  }
  res.json({
    weight: wt,
    height: ht,
    bmi: calculateBmi(ht, wt),
  });
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (
      err.message === "malformatted parameters" ||
      err.message === "parameters missing"
    ) {
      res.status(400).json({
        error: err.message,
      });
    }
    next(err);
  }
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}...`);
});
