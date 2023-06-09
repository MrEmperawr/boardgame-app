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
            <game-tile :game="game" :rating="averageRatings.get(game.id)" :duration="averageDurations.get(game.id)"
              :owners="ownerCounts.get(game.id)" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useGamesStore } from '../stores/gamesStore'
import GameTile from '../components/GameTile.vue'
import {
  calculateAverageRating,
  calculateAverageDuration,
  countOwnersForGame
} from '../services/firestoreClient'

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

    const averageRatings = ref(new Map())
    const averageDurations = ref(new Map())
    const ownerCounts = ref(new Map())

    onMounted(async () => {
      const ratingsPromises = games.value.map(game => calculateAverageRating(game.id))
      const durationsPromises = games.value.map(game => calculateAverageDuration(game.id))
      const ownerCountsPromises = games.value.map(game => countOwnersForGame(game.id))

      const ratings = await Promise.all(ratingsPromises)
      const durations = await Promise.all(durationsPromises)
      const totalOwners = await Promise.all(ownerCountsPromises)

      games.value.forEach((game, index) => {
        averageRatings.value.set(game.id, ratings[index])
        averageDurations.value.set(game.id, durations[index])
        ownerCounts.value.set(game.id, totalOwners[index])
      });

      averageRatings.value = new Map(averageRatings.value)
      averageDurations.value = new Map(averageDurations.value)
      ownerCounts.value = new Map(ownerCounts.value)
    });

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
      averageRatings,
      averageDurations,
      ownerCounts
    }
  },
}
</script>
