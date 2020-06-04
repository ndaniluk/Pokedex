import React from 'react';
import Types from '../types/Types';
import { TypeOrCounter} from     '../types/TypeOrCounter';
import EvolutionChain from '../evolutionChain/EvolutionChain';
import { DetailsResponse, DescriptionResponse } from './DetailsInterfaces';
import { getImage, firstLetterToUpperCase } from '../../utils/Utils';
import ApiInfo from '../../api.json';

export interface DetailsProps {
    id: number
}

export interface DetailsState {
    name: string,
    img: string,
    description: string,
    height: number,
    weight: number,
    types?: Types,
    counters?: Types,
    evolutionChain?: EvolutionChain
}

class Details extends React.Component<DetailsProps, DetailsState> {
    constructor(props: DetailsProps) {
        super(props);
        this.state = {
            name: '',
            img: getImage(this.props.id),
            description: '',
            height: 0,
            weight: 0
        };
    }

    componentDidMount() {
        this.fetchBasicInfo();
        this.fetchDescription();
    }

    fetchBasicInfo = () => {
        fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON + this.props.id)
            .then(response => response.json())
            .then(response => {
                const details: DetailsResponse = response;
                this.setState({
                    name: details.name,
                    height: details.height,
                    weight: details.weight
                });
            });
    }

    fetchDescription = () => {
        fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON_SPECIES + this.props.id)
            .then(response => response.json())
            .then(response => {
                const description: DescriptionResponse = response;
                const entries = description.flavor_text_entries;
                for(let i = 0; i < entries.length; i++){
                    if (entries[i].language.name === 'en') {
                        this.setState({
                            description: entries[i].flavor_text
                        });
                        break;
                    }
                }
            });
    }

    render() {
        const pokemonName = firstLetterToUpperCase(this.state.name);
        return (
            <div>
                <p>{pokemonName}</p>
                <img src={this.state.img} alt={this.state.name} />
                <p>{this.state.description}</p>
                <p>{this.state.height}</p>
                <p>{this.state.weight}</p>
                <p>Types: <Types id={this.props.id} requestType={TypeOrCounter.Type} /></p>
                <p>Counters: <Types id={this.props.id} requestType={TypeOrCounter.Counter} /></p>
                <p>Evolutions: <EvolutionChain id={this.props.id} /></p>
            </div>
        );
    }
}

export default Details;