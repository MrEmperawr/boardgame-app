<template>
    <v-container>
        <v-row v-for="category in categories" :key="category" justify="center">
            <v-col>
                <h2>{{ category }}</h2>
                <v-row>
                    <v-col md="4" sm="6" cols="12" v-for="game in getGamesByCategory(category)" :key="game.id">
                        <GameTile :game="game" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useGamesStore } from '../stores/gamesStore'
import GameTile from '../components/GameTile.vue'

export default defineComponent({
    name: 'CategoriesView',
    components: {
        GameTile,
    },
    setup() {
        const gamesStore = useGamesStore()
        const games = computed(() => gamesStore.games)

        const categories = computed(() => {
            const allCategories = games.value.flatMap((game) => game.categories)
            return Array.from(new Set(allCategories))
        })

        const getGamesByCategory = (category: string) => {
            return games.value.filter((game) => game.categories.includes(category))
        }

        return {
            categories,
            getGamesByCategory,
        }
    },
})
</script>