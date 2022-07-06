import diagnoses from "../../data/diagnoses";

import { DiagnosisEntry } from "../types";

const getDiagnoses = (): DiagnosisEntry[] => {
    return diagnoses;
}

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};