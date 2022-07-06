/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    if (!isNaN(height) && !isNaN(weight)) {
        res.send({
            height: height,
            weight: weight,
            bmi: calculateBmi(height, weight)
        });
    } else {
        res.send({
            error: "malformatted parameters"
        });
    }

});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post("/exercises", (_req, res): any => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = _req.body;

    if (!daily_exercises || !target) {
        return res.send({ error: 'missing parameters' }).status(400);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (daily_exercises.map((v: any) => isNaN(Number(v)) ? "NaN" : "number").includes("NaN") || isNaN(Number(target))) {
        return res.send({ error: 'malformatted parameters' }).status(400);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, Number(target));
    res.json(result);

});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});