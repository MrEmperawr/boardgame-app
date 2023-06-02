import { defineStore } from 'pinia'
import { gameClient } from '@/services/boardgameClient'

export const useGamesStore = defineStore({
    id: 'games',
    state: () => ({
        games: [],
        gameDetail: null,
    }),
    actions: {
        async fetchGames() {
            gameClient.get('/boardgames')
                .then(response => {
                    this.games = response.data
                })
        },
    },
})

