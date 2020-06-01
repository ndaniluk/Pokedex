import { ChainExtended } from '../components/evolutionChain/EvolutionChainInterfaces';

function firstLetterToUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getIdFromPokemonSpeciesUrl(url: string) {
    const urlComponents = url.split('/');
    return urlComponents[urlComponents.length - 2];
}

function makeEvolutionArray(evolutionChainPokemons: number[], evolutionChain: ChainExtended) {
    const pokemonId = getIdFromPokemonSpeciesUrl(evolutionChain.species.url);
    evolutionChainPokemons.push(+pokemonId);
    const nextChain = evolutionChain.evolves_to;

    if (nextChain.length > 0) {
        evolutionChainPokemons = makeEvolutionArray(evolutionChainPokemons, nextChain[0]);
    }
    return evolutionChainPokemons;

}

export {
    firstLetterToUpperCase,
    getIdFromPokemonSpeciesUrl,
    makeEvolutionArray
};