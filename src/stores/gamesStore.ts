import { defineStore } from 'pinia'
import { Game } from '@/models';
import { fetchGames } from '@/services/boardgameClient';

export const useGamesStore = defineStore({
    id: 'games',
    state: () => ({
        games: [] as Game[],
        activeGame: null as Game | null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchGames() {
            this.loading = true
            try {
                const games = await fetchGames()
                this.games = games
                this.loading = false
            } catch (e) {
                if (e instanceof Error) {
                    this.error = `Failed to fetch games: ${e.message}`
                    this.loading = false
                } else {
                    this.error = 'Unknown error'
                    this.loading = false
                }
            }
        },
        setActiveGame(game: Game) {
            this.activeGame = game
        }
    },
})

