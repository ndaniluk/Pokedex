import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Details from '../components/details/Details';
import Preview from '../components/preview/Preview';
import './DetailsModal.css';

export interface DetailsModalProps {
    pokemonId: number
}

export interface DetailsModalState {
    pokemonId: number,
    showModal: boolean
}

class DetailsModal extends React.Component<DetailsModalProps, DetailsModalState> {
    constructor(props: DetailsModalProps) {
        super(props);
        this.state = {
            pokemonId: this.props.pokemonId,
            showModal: false
        };
    }

    close = () => {
        this.setState({
            showModal: false
        });
    }

    open = () => {
        this.setState({
            showModal: true
        });
    }

    next = () => {
        this.setState({
            pokemonId: this.state.pokemonId + 1
        });
    }

    previous = () => {
        if (this.state.pokemonId === 1)
            return;

        this.setState({
            pokemonId: this.state.pokemonId - 1
        });
    }

    render() {
        return (
            <>
                <div className="modalPreview" data-dismiss="Modal" onClick={this.open}>
                    <Preview id={this.state.pokemonId} />
                </div>

                <Modal centered show={this.state.showModal} onHide={this.close} dialogClassName="detailsModal">
                    <Modal.Body key={this.state.pokemonId}>
                        <Details id={this.state.pokemonId} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.previous}>
                            Previous
                        </Button>
                        <Button variant="secondary" onClick={this.next}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DetailsModal;
