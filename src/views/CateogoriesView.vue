<template>
    <main class="categories">
        <section v-for="category in categories" :key="category">
            <h2>{{ category }}</h2>
            <div v-for="game in getGamesByCategory(category)" :key="game.id">
                <GameTile :game="game" />
            </div>
        </section>
    </main>
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
            return Array.from(new Set(allCategories))  // remove duplicates
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