import { defineStore } from 'pinia'
import router from '@/router';

import { Game } from '@/models';
import { fetchGames } from '@/services/boardgameClient';

export const useGamesStore = defineStore({
    id: 'games',
    state: () => ({
        games: [] as Game[],
        allCategories: [] as string[],
        activeGame: null as Game | null,
        selectedCategory: null as string | null,
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

                const categorySet = new Set<string>();

                games.forEach(game => {
                    game.categories.forEach(category => {
                        categorySet.add(category);
                    })
                });

                this.allCategories = Array.from(categorySet);

            } catch (e) {
                console.log(e)
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
        },
        selectCategory(category: string | null) {
            this.selectedCategory = category
        },
        getFilteredGames() {
            if (!this.selectedCategory) {
                return this.games
            }
            return this.games.filter(game => game.categories.includes(this.selectedCategory!))
        },
        navigateToGameDetails(game: Game) {
            this.setActiveGame(game)
            router.push({ name: 'gamedetail', params: { id: game.id } })
        },
    },
})