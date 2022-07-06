import patients from "../../data/patients"
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId, Entry } from "../types"
import { v1 as uuid } from 'uuid';


const getPatients = (): PatientEntry[] => {
    return patients;
}

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addDiagnosisEntry = (id: string, entry: EntryWithoutId): PatientEntry | string => {

    const newDiagnosisEntry: Entry = {
        id: uuid(),
        ...entry
    }
    const patientToAddEntryTo = patients.find(p => p.id === id);

    if (patientToAddEntryTo) {
        const patientEntries: Entry[] = patientToAddEntryTo.entries.concat(newDiagnosisEntry);
        const patientWithAddedEntry = { ...patientToAddEntryTo, entries: patientEntries };
        patients.find(p => p.id === id)?.entries.push(newDiagnosisEntry);
        return patientWithAddedEntry;

    } else {
        let error = "there is not patient with this id"
        console.log(error);
        return error;
    }
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }

    patients.push(newPatientEntry);
    return newPatientEntry
}

export default { getPatients, getNonSensitivePatients, addPatient, addDiagnosisEntry };
