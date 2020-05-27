import React from 'react';
import ApiInfo from '../../api.json';
import './pokemonPreview.css';
import PokemonTypes, { TypeOrCounter } from '../pokemonTypes/PokemonTypes';

export interface PokemonPreviewProps {
    id: number
}

export interface PokemonPreviewState {
    id: number,
    name: string,
    img: string,
}

class PokemonPreview extends React.Component<PokemonPreviewProps, PokemonPreviewState> {
    formattedId = this.props.id.toString().padStart(3, '0');

    constructor(props: PokemonPreviewProps) {
        super(props);
        this.state = {
            id: this.props.id,
            name: '',
            img: ApiInfo.IMAGES + this.formattedId + '.png'
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

    firstLetterToUpperCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const pokemonName = this.firstLetterToUpperCase(this.state.name);
        // const pokemonTypes = this.state.types.map((element: PokemonType) => <span key={element.type.name}>{element.type.name} </span>);
        return (
            <div className='preview'>
                <img src={this.state.img} alt={this.state.name} />
                <p>#{this.formattedId}</p>
                <p>{pokemonName}</p>
                <PokemonTypes id={this.state.id} requestType={TypeOrCounter.Type}/>
            </div>
        );
    }
}

export default PokemonPreview;