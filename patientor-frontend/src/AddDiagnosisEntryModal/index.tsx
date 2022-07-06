import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddDiagnosisForm, { DiagnosisFormValues } from "./AddDiagnosisForm";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: DiagnosisFormValues) => void;
    error?: string;
}

const AddDiagnosisModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new diagnosis entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddDiagnosisForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default AddDiagnosisModal;