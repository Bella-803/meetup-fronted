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
                 <p>Use Google-Meet to create an online meeting and the paste the link to the meeting in the field</p>
              </Modal.Body>
              <Modal.Footer>
                 <a href="https://us04web.zoom.us/meeting/schedule" className="btn btn-info">Google Meet</a>
                 <Button variant="danger" onClick={handleClose}>Close</Button>
              </Modal.Footer>
           </Modal>
        </React.Fragment>
    )
}
