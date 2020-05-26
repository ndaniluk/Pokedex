import React from 'react';
import './type-icons.css';
import ApiInfo from '../../api.json';

export enum TypeOrCounter {
    Type,
    Counter
}

export interface TypeResponse {
    slot: number,
    type: TypeDescription
}

export interface TypeDescription {
    name: string,
    url: string
}

export interface PokemonTypesProps {
    id: number,
    requestType: TypeOrCounter
}

export interface PokemonTypesState {
    types: TypeDescription[]
}

class PokemonTypes extends React.Component<PokemonTypesProps, PokemonTypesState> {
    constructor(props: PokemonTypesProps) {
        super(props);
        this.state = {
            types: []
        };
    }

    componentDidMount() {
        fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON + this.props.id)
            .then(response => response.json())
            .then(response => {
                const types = response.types;
                types.map((typeResponse: TypeResponse) => {
                    return this.setState(prevState => {
                        let newState = prevState.types;
                        newState.push(typeResponse.type);
                        return ({
                            types: newState
                        });
                    });
                });
            });
    }

    render() {
        const pokemonTypes = this.state.types.map((element) => {
            const type = element.name;
            const iconSrc = window.location.origin + '/icons/' + type + '.svg';
            return (
                <div key={type} className={'icon ' + type}>
                    <img src={iconSrc} />
                </div>
            );
        });
        return (
            <div className='wrapper'>
                {pokemonTypes}
            </div>
        );
    }
}

export default PokemonTypes;