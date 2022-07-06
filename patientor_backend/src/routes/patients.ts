import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewDiagnosisEntry } from "../utils";
const patientsRouter = express.Router()


patientsRouter.get("/", (_req, res) => {
    res.send(patientService.getPatients());
})

patientsRouter.get("/:id", async (_req, res) => {
    const id = _req.params.id
    const patients = await patientService.getPatients()
    const patient = patients.find(p => p.id === id)
    res.send(patient);
})

patientsRouter.get("/:id/entries", async (_req, res) => {
    const id = _req.params.id;
    const patients = await patientService.getPatients();
    const patient = patients.find(p => p.id === id)
    const entries = patient?.entries;
    res.send(entries);
})

patientsRouter.post("/:id/entries", async (_req, res) => {
    const id = _req.params.id;
    try {
        const newDiagnosisEntry = toNewDiagnosisEntry(_req.body);
        const updatedEntries = await patientService.addDiagnosisEntry(id, newDiagnosisEntry);

        res.json({
            patientId: _req.params.id,
            entries: updatedEntries
        });

    } catch (error: unknown) {
        let errorMessage = "Something went wrong."
        if (error instanceof Error) {
            errorMessage += " Error" + error.message;
        }
        res.status(400).send(errorMessage)
    }
})

patientsRouter.post("/", async (_req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(_req.body);
        const addedPatient = await patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong."
        if (error instanceof Error) {
            errorMessage += " Error" + error.message;
        }
        res.status(400).send(errorMessage)
    }
})

export default patientsRouter;