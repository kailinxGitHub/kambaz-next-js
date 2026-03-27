import { Modal, Button, Form } from "react-bootstrap";
export default function ModuleEditor({
  dialogTitle,
  moduleName,
  setModuleName,
  addModule,
  show,
  handleClose,
}: {
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
  show: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      id="wd-add-module-dialog"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Module Name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            addModule();
            handleClose();
          }}
        >
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
