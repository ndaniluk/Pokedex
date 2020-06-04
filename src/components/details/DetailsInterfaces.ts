export interface DetailsResponse {
    name: string,
    weight: number,
    height: number,
}

export interface DescriptionResponse {
    flavor_text_entries: [
        {
            flavor_text: string,
            language: {
                name: string
            }
        }
    ]
}