import { PatientEntry, Gender, EntryType, HealthCheckRating, EntryWithoutId } from "./types";

const parseValue = (value: any): string => {
    if (!value && !isString(value)) {
        throw new Error("Incorrect or missing value")
    }
    return value;
};


const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
}

const parseEntryType = (type: any): EntryType => {
    if (!Object.values(EntryType).includes(type)) {
        throw new Error(`Incorrect or missing type: ${type || ""}`);
    }
    return type;
}
const isCheckHealthRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating && !isCheckHealthRating) {
        throw new Error(`Icorrect or missing healt check rating: ${healthCheckRating}`)
    }
    return healthCheckRating
}

export const toNewDiagnosisEntry = (object: any): EntryWithoutId => {
    const newEntry: EntryWithoutId = {
        type: parseEntryType(object.type),
        description: parseValue(object.description),
        date: parseDate(object.date),
        specialist: parseValue(object.specialist),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        // discharge: object.discharge,
        // sickLeave: object.sickLeave,
        // employerName: parseValue(object.employerName),
        // diagnosisCodes: object.diagnosisCodes
    }
    return newEntry
}

export const toNewPatientEntry = (object: any): PatientEntry => {
    const newEntry: PatientEntry = {
        id: parseValue(object.id),
        name: parseValue(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseValue(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseValue(object.occupation),
        entries: object.entries
        // entries: object.entries.map((entry: { id: string; }) => {
        //     const object = toNewDiagnosisEntry(entry)
        //     object.id = entry.id;
        //     return object;
        // })
    }
    return newEntry;
}



