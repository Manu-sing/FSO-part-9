export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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


export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

// export interface FetechedPatient {
//   [id: string]: Patient;
// }
