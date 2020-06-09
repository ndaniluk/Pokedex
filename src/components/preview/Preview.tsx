import React from 'react';
import ApiInfo from '../../api.json';
import './Preview.css';
import Types from '../types/Types';
import { TypeOrCounter } from '../types/TypeOrCounter';
import { firstLetterToUpperCase, getImage, formatIdToPokedex } from '../../utils/Utils';
// import Button from 'react-bootstrap/Button';

export interface PreviewProps {
    id: number
}

export interface PreviewState {
    id: number,
    name: string,
    img: string,
}

class Preview extends React.Component<PreviewProps, PreviewState> {
    constructor(props: PreviewProps) {
        super(props);
        this.state = {
            id: this.props.id,
            name: '',
            img: getImage(this.props.id)
        };
    }

    componentDidMount() {
        fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON + this.props.id)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    name: response.name
                });
            });
    }

    render() {
        const pokemonName = firstLetterToUpperCase(this.state.name);
        const formattedId = formatIdToPokedex(this.props.id);
        return (
                <div className='preview'>
                    <img src={this.state.img} alt={this.state.name} />
                    <p>#{formattedId}</p>
                    <p>{pokemonName}</p>
                    <Types id={this.state.id} requestType={TypeOrCounter.Type} />
                </div>
        );
    }
}

export default Preview;