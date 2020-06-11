import React from 'react';
import Preview from '../preview/Preview';
import ApiInfo from '../../api.json';
import { EvolutionChainUrlFromPokemonSpecies, EvolutionChainResponse } from './EvolutionChainInterfaces';
import { makeEvolutionArray } from '../../utils/Utils';
import DetailsModal from '../../hoc/DetailsModal';

export interface EvolutionChainProps {
    id: number
}

export interface EvolutionChainState {
    chain: Preview[]
}

class EvolutionChain extends React.Component<EvolutionChainProps, EvolutionChainState> {
    constructor(props: EvolutionChainProps) {
        super(props);
        this.state = {
            chain: []
        };
    }

    componentDidMount() {
        this.setEvolutionChain(this.props.id);
    }

    getChain = () => {
        fetch(ApiInfo.API_BASE_URL + ApiInfo.EVOLUTION_CHAIN + this.props.id)
            .then(response => response.json())
            .then(response => {
                return response;
            });
    }

    setEvolutionChain = (pokemonId: number) => {
        fetch(ApiInfo.API_BASE_URL + ApiInfo.POKEMON_SPECIES + pokemonId)
            .then(response => response.json())
            .then(response => {
                const res: EvolutionChainUrlFromPokemonSpecies = response;
                this.resolveEvolutionChain(res.evolution_chain.url);
            });
    }

    resolveEvolutionChain = (evolutionChainUrl: string) => {
        fetch(evolutionChainUrl)
            .then(response => response.json())
            .then(response => {
                const evolutionChain: EvolutionChainResponse = response;
                let evolutionChainPokemons: number[] = [];
                const evolutionArray = makeEvolutionArray(evolutionChainPokemons, evolutionChain.chain);
                evolutionArray.map(pokemonId => {
                    return this.setState(prevState => {
                        let newState = prevState.chain;
                        newState.push(new Preview({ id: pokemonId }));
                        return ({ chain: newState });
                    });
                });
            });
    }

    render() {
        const evolutionChain = this.state.chain.map(element => <DetailsModal key={element.props.id} pokemonId={element.props.id} />);
            return (
            <>
                {evolutionChain}
            </>
        );
    }
}

export default EvolutionChain;