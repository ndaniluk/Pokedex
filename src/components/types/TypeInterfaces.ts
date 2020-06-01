export interface TypeDescription {
    name: string,
    url: string
}

export interface TypeResponse {
    slot: number,
    type: TypeDescription
}

export interface CounterResponse {
    damage_relations: {
        double_damage_from: TypeDescription[]
    }
}
