import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function MeetupLinkInfo() {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);


    return (
        <React.Fragment>
           <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                 <Modal.Title>Information about Google-Meet Link</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <p>You are reading content in modal</p>
              </Modal.Body>
              <Modal.Footer>
                 <Button variant="danger" onClick={handleClose}>Close</Button>
              </Modal.Footer>
           </Modal>
        </React.Fragment>
    )
}
