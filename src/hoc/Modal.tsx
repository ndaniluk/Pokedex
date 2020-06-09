import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Details from '../components/details/Details';
import Preview from '../components/preview/Preview';

export interface DetailsModalProps {
    pokemonId: number
}

function DetailsModal(props: DetailsModalProps) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow}>
                <Preview id={props.pokemonId} />
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Details id={props.pokemonId} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailsModal;