import React from 'react';
import Preview from '../preview/Preview';
import ApiInfo from '../../api.json';
import { EvolutionChainUrlFromPokemonSpecies, EvolutionChainResponse } from './EvolutionChainInterfaces';
import { makeEvolutionArray } from '../../utils/Utils';

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

    getChain = () => {
        fetch(ApiInfo.API_BASE_URL + ApiInfo.EVOLUTION_CHAIN + this.props.id)
            .then(response => response.json())
            .then(response => {
                return response;
            });
    }

    componentDidMount() {
        this.setEvolutionChain(this.props.id);
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
        const evo = this.state.chain.map(element => <Preview key={element.props.id} id={element.props.id} />);
            return (
            <div>
                {evo}
            </div>
        );
    }
}

export default EvolutionChain;