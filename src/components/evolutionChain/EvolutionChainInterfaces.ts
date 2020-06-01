export interface EvolutionChainUrlFromPokemonSpecies {
    evolution_chain: {
        url: string
    }
}

export interface EvolutionChainResponse {
    chain: ChainExtended 
}

export interface ChainExtended {
    evolves_to: {
        [n: number]: ChainExtended,
        length: number
    }
    species: {
        url: string
    }
}