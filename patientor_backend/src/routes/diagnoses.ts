import express from "express";
import diagnosisService from "../services/diagnosisService";
const diagnosesRouter = express.Router()

diagnosesRouter.get("/", (_req, res) => {
    res.send(diagnosisService.getDiagnoses())
})

diagnosesRouter.post("/", (_req, res) => {
    res.send("saving new diagnosis")
})

export default diagnosesRouter;