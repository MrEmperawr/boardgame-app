<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <h1>Games</h1>
        <v-select v-model="selectedCategory" @change="onCategoryChange" :items="categories" label="Category"></v-select>
        <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
        <v-alert v-else-if="error" type="error">{{ error }}</v-alert>
        <v-row v-else>
          <v-col md="4" sm="6" cols="12" v-for="game in games" :key="game.id">
            <game-tile :game="game" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
    const categories = computed(() => gamesStore.allCategories)
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