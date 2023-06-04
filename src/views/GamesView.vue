<template>
  <main>
    <div>
      <h1>Games</h1>
      <select v-model="selectedCategory" @change="onCategoryChange">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="error">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else>
        <game-tile v-for="game in games" :key="game.id" :game="game" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useGamesStore } from '../stores/gamesStore'
import GameTile from '../components/GameTile.vue'

export default {
  components: {
    GameTile,
  },
  setup() {
    const gamesStore = useGamesStore()
    const games = computed(() => gamesStore.getFilteredGames())
    const loading = computed(() => gamesStore.loading)
    const error = computed(() => gamesStore.error)
    const categories = computed(() => {
      const allCategories = games.value.flatMap(game => game.categories)
      return Array.from(new Set(allCategories))  // remove duplicates
    })
    const selectedCategory = computed({
      get: () => gamesStore.selectedCategory,
      set: (value) => gamesStore.selectCategory(value),
    })

    function onCategoryChange() {
      gamesStore.selectCategory(selectedCategory.value)
    }


    gamesStore.fetchGames()

    return {
      games,
      loading,
      error,
      categories,
      selectedCategory,
      onCategoryChange,
    }
  },
}
</script>