import { defineStore } from 'pinia'
import { boardgameClient } from '@/services/boardgameClient'

export const useGamesStore = defineStore({
    id: 'games',
    state: () => ({
        games: [],
        gameDetail: null,
    }),
    actions: {
        async fetchGames() {
            const response = await boardgameClient.get('/boardgames')
            return response.data;

        },
    },
})

