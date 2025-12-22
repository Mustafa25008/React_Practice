import React, {useState} from "react";
import { Modal } from "react-bootstrap";

function Boot() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="container-fluid bg-warning p-3 m-3">
            <div className="container bg-success text-white mb-3">
                This is a container
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleShow}>Show Pop</button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button className="btn btn-primary" onClick={handleClose}>Save changes</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
export default Boot;