import { ChainExtended } from '../components/evolutionChain/EvolutionChainInterfaces';
import ApiInfo from '../api.json';

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

function formatIdToPokedex(id: number) {
    return id.toString().padStart(3, '0');
}


function getImage(id: number) {
    const formattedId = formatIdToPokedex(id);
    return ApiInfo.IMAGES + formattedId + '.png';
}

export {
    firstLetterToUpperCase,
    getIdFromPokemonSpeciesUrl,
    makeEvolutionArray,
    formatIdToPokedex,
    getImage
};