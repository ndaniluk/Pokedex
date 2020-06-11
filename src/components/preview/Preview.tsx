import React from 'react';
import ApiInfo from '../../api.json';
import './Preview.css';
import Types from '../types/Types';
import { TypeOrCounter } from '../types/TypeOrCounter';
import { firstLetterToUpperCase, getImage, formatIdToPokedex } from '../../utils/Utils';
import { Image } from 'react-bootstrap';

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
        if (this.state.name)
            return (
                <div className="preview">
                    <Image src={this.state.img} />
                    <p>#{formattedId} {pokemonName}</p>
                    <Types id={this.state.id} requestType={TypeOrCounter.Type} />
                </div>
            );
        return (
            <></>
        );
    }
}

export default Preview;