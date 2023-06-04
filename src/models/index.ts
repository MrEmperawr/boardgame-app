export interface PlayerInfo {
    min: number,
    max: number
}

export interface Game {
    id: string,
    name: string,
    released: string,
    tagline: string,
    players: PlayerInfo,
    age: number,
    creators: string[],
    categories: string[]
}
