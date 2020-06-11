import React from 'react';
import './Types.css';
import ApiInfo from '../../api.json';
import { TypeOrCounter } from './TypeOrCounter';
import { TypeResponse, TypeDescription } from './TypeInterfaces';

export interface TypesProps {
    id: number,
    requestType: TypeOrCounter
}

export interface TypesState {
    types: TypeDescription[]
}

class Types extends React.Component<TypesProps, TypesState> {
    constructor(props: TypesProps) {
        super(props);
        this.state = {
            types: []
        };
    }

    fetchTypes = (typeResponse: TypeResponse) => {
        return this.setState(prevState => {
            let newState = prevState.types;
            newState.push(typeResponse.type);
            return ({
                types: newState
            });
        });
    }

    fetchCounters = (typeResponse: TypeResponse) => {
        fetch(typeResponse.type.url)
            .then(response => response.json())
            .then(response => {
                const counters = response.damage_relations.double_damage_from;
                counters.map((counterResponse: TypeDescription) => {
                    return this.setState(prevState => {
                        let newState = prevState.types;
                        let contains = false;
                        for (let i = 0; i < newState.length; i++) {
                            if (newState[i].name === counterResponse.name) {
                                contains = true;
                            }
                        }
                        if (!contains)
                            newState.push(counterResponse);
                        return ({
                            types: newState
                        });
                    });
                });
            });
    }

    componentDidMount() {   
        fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON + this.props.id)
            .then(response => response.json())
            .then(response => {
                const types = response.types;
                types.map((typeResponse: TypeResponse) => {
                    if (this.props.requestType === TypeOrCounter.Type) {
                        return this.fetchTypes(typeResponse);
                    } else {
                        return this.fetchCounters(typeResponse);
                    }
                });
            });
    }


    render() {
        const pokemonTypes = this.state.types.map((element) => {
            const type = element.name;
            const iconSrc = window.location.origin + '/icons/' + type + '.svg';
            return (
                <div key={type} className={'icon ' + type}>
                    <img src={iconSrc} alt={type} />
                </div>
            );
        });
        
        return (
            <div className="types">
                {pokemonTypes}
            </div>
        );
    }
}

export default Types;