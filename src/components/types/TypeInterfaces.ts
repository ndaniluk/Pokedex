interface TypeDescription {
    name: string,
    url: string
}

interface TypeResponse {
    slot: number,
    type: TypeDescription
}

interface CounterResponse {
    damage_relations: {
        double_damage_from: TypeDescription[]
    }
}

export {
    TypeDescription,
    TypeResponse,
    CounterResponse
};