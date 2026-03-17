import { Modal, Button, Form } from "react-bootstrap";
export default function ModuleEditor({
  dialogTitle,
  moduleName,
  setModuleName,
  addModule,
  verifyAndAddModule
}: {
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
  verifyAndAddModule: () => void;
}) {
  return (
    <Modal show={true} onHide={() => setModuleName("")} backdrop="static">
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
        <Button variant="secondary" onClick={() => setModuleName("")}>
          Cancel
        </Button>
        <Button variant="primary" onClick={verifyAndAddModule}>
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
