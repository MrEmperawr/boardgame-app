<template>
  <main>
    <div>
      <h1>Games</h1>
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
    const games = computed(() => gamesStore.games)
    const loading = computed(() => gamesStore.loading)
    const error = computed(() => gamesStore.error)

    gamesStore.fetchGames()

    return {
      games,
      loading,
      error,
    }
  },
}
</script>