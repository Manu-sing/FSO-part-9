import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { SelectField, DiagnosisTypeOption, TextField } from "./FormField";
import { EntryType } from "../types";
import { Entry } from "../types";

/*
 * use type Entry, but omit everything apart from type,
 * because those are irrelevant for this stage.
 */
export type DiagnosisFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: DiagnosisFormValues) => void;
    onCancel: () => void;
}

const diagnosisOptions: DiagnosisTypeOption[] = [
    { value: EntryType.HospitalEntry, label: "Hospital" },
];

export const AddDiagnosisForm = ({ onSubmit, onCancel }: Props) => {
    return (
        <Formik
            initialValues={{
                type: EntryType.HospitalEntry,
                date: "",
                specialist: "",
                description: "",
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.name = requiredError;
                }
                if (!values.date) {
                    errors.name = requiredError;
                }
                if (!values.specialist) {
                    errors.name = requiredError;
                }
                if (!values.description) {
                    errors.name = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <SelectField label="Type" name="type" options={diagnosisOptions} />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddDiagnosisForm;