export interface DiagnosisEntry {
    code: string,
    name: string,
    latin?: string
};

// export interface Entry {
//     description: string,
//     creationDate: string,
//     specialistInfo: string,
//     diagnosisCode?: number
// }

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum EntryType {
    HealthCheckEntry = "HealthCheck",
    HospitalEntry = "Hospital",
    OccupationalHealthcareEntry = "OccupationalHealthcare"
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheckEntry;
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
    date: string;
    criteria: string
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.HospitalEntry;
    discharge?: Discharge
}

interface SickLeave {
    startDate: string;
    endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcareEntry;
    employerName?: string;
    sickLeave?: SickLeave;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
};

export enum Gender {
    Other = 'other',
    Male = 'male',
    Female = 'female',
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = Omit<PatientEntry, "id">;







