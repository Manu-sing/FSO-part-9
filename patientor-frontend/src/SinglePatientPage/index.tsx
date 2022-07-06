import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Patient, Diagnosis } from '../types';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { FaMale, FaFemale, FaHospitalSymbol } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { setSinglePatient, setDiagnosisList } from '../state';
import AddDiagnosisModal from '../AddDiagnosisEntryModal';

import { Entry } from '../types';


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return (
                <Card>
                    <CardContent>
                        <Typography variant="body1">
                            <p>{entry.date} <FaHospitalSymbol /></p>
                        </Typography>
                        <Typography variant="body2">
                            <p><u>Type</u>: {entry.type}</p>
                        </Typography>
                        <Typography variant="body2">
                            <p><u>Description</u>: {entry.description}</p>
                        </Typography>
                        {entry.diagnosisCodes ?
                            <Typography variant="body2">
                                <p><u>Diagnosis codes</u>: {entry.diagnosisCodes.map((c, i) => <p key={i}>{c}</p>)}</p>
                            </Typography>
                            : null}
                        {entry.discharge ?
                            <Typography variant="body2">
                                <p><u>Discharge</u>: <br />
                                    Date: {entry.discharge?.date} <br />
                                    Criteria: {entry.discharge?.criteria}</p>
                            </Typography>
                            : null}
                        <Typography variant="body2">
                            <p><u>Diagnosed by</u>: {entry.specialist}</p>
                        </Typography>
                    </CardContent>
                </Card>
            );
        case "OccupationalHealthcare":
            return (
                <Card>
                    <CardContent>
                        <Typography variant="body1">
                            <p>{entry.date} <MdWork /> {entry.employerName}</p>
                        </Typography>
                        <Typography variant="body2">
                            <p><u>Type</u>: {entry.type}</p>
                        </Typography>
                        <Typography variant="body2">
                            <p><u>Description</u>: {entry.description}</p>
                        </Typography>
                        {entry.diagnosisCodes ?
                            <Typography variant="body2">
                                <p><u>Diagnosis codes</u>: {entry.diagnosisCodes.map((c, i) => <p key={i}>{c}</p>)}</p>
                            </Typography>
                            : null}
                        {entry.employerName ?
                            <Typography variant="body2">
                                <p><u>Employer name</u>: {entry.employerName}</p>
                            </Typography>
                            : null}
                        {entry.sickLeave ?
                            <Typography variant="body2">
                                <p><u>Sick leave</u>:
                                    Start date: {entry.sickLeave?.startDate}
                                    End date: {entry.sickLeave?.endDate}
                                </p>
                            </Typography>
                            : null}
                        <Typography variant="body2">
                            <p><u>Diagnosed by</u>: {entry.specialist}</p>
                        </Typography>
                    </CardContent>
                </Card>
            );
        case "HealthCheck":
            return (
                <Card>
                    <CardContent>
                        <Typography variant="body1">
                            <p>{entry.date} <GiHealthNormal /></p>
                        </Typography>
                        <Typography variant="body2">
                            <p><u>Type</u>: {entry.type}</p>
                        </Typography>
                        <Typography variant="body2">
                            <p><u>Description</u>: {entry.description}</p>
                        </Typography>
                        {entry.diagnosisCodes ?
                            <Typography variant="body2">
                                <p><u>Diagnosis codes</u>: {entry.diagnosisCodes.map((c, i) => <p key={i}>{c}</p>)}</p>
                            </Typography>
                            : null}
                        <Typography variant="body2">
                            <p><u>Health Check Rating</u>: {entry.healthCheckRating}</p>
                        </Typography>
                        <Typography variant="body2">
                            <p><u>Diagnosed by</u>: {entry.specialist}</p>
                        </Typography>
                    </CardContent>
                </Card>
            );
        default:
            return null;
    }
};





const index = () => {
    const [{ patient, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [error, setError] = React.useState<string>();
    // const [diagnoses, setDiagnoses] = React.useState();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewDiagnosisEntry = () => {
        console.log("we will send the new diagnosis to the backend");
        closeModal();
    };


    React.useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const { data: fetchedDiagnoses } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnosisList(fetchedDiagnoses));
                console.log(diagnoses);

            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setError(String(e?.response?.data?.error) || "Unrecognized axios error");
                } else {
                    console.log(error);
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        };

        const fetchPatient = async () => {
            try {
                if (id) {
                    const { data: fetchedPatient } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    // dispatch({ type: "SET_SINGLE_PATIENT", payload: fetchedPatient });
                    dispatch(setSinglePatient(fetchedPatient));
                }
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setError(String(e?.response?.data?.error) || "Unrecognized axios error");
                } else {
                    console.log(error);
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        };

        if (!patient || patient?.id !== id) {
            void fetchPatient();
        }

        void fetchDiagnoses();

    }, []);


    // const arrayOfArraysOfCodes = patient?.entries.map(obj => obj.diagnosisCodes);

    // const findDiagnosisName = (code: string) => {
    //     const obj = diagnoses?.find(d => d.code === code);
    //     return obj?.name;
    // };


    return (
        <Card >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {patient?.name} - {patient?.gender === "male" ? <FaMale /> : <FaFemale />}
                </Typography>
                <Typography variant="body1">
                    <u>Ssn</u>: {patient?.ssn}
                </Typography>
                <Typography variant="body1">
                    <u>Occupation</u>: {patient?.occupation}
                </Typography>
                <br />
                <Typography gutterBottom variant="h6" component="div">
                    <em>Entries:</em>
                </Typography>
                {patient?.entries.map(e =>
                    <EntryDetails key={e.id} entry={e} />
                )}
                <AddDiagnosisModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewDiagnosisEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button variant="contained" onClick={() => openModal()}>
                    Add New Diagnosis Entry
                </Button>
            </CardContent>
        </Card>

    );
};

export default index;