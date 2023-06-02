import { defineStore } from 'pinia'

export const useGamesStore = defineStore({
    id: 'games',
    state: () => ({
        games: [],
        gameDetail: null,
    }),
    actions: {
        async fetchGames() {
            // Fetch all games from API
        },
        async fetchGameDetail(gameId: string) {
            // Fetch a game's details from API
        },
        async createGame(/* parameters */) {
            // Create a new game in API
        },
        async updateGame(/* parameters */) {
            // Update a game in API
        },
        async deleteGame(gameId: string) {
            // Delete a game from API
        },
    },
})
