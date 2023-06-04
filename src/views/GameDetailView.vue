<template>
    <div v-if="activeGame">
        <h1>{{ activeGame.name }}</h1>
        <p>{{ activeGame.tagline }}</p>
        <p>Released: {{ activeGame.released }}</p>
        <p>Players: {{ activeGame.players.min }} to {{ activeGame.players.max }}</p>
        <p>Recommended Age: {{ activeGame.age }}</p>
        <h2>Creators</h2>
        <ul>
            <li v-for="creator in activeGame.creators" :key="creator">{{ creator }}</li>
        </ul>
        <h2>Categories</h2>
        <ul>
            <li v-for="category in activeGame.categories" :key="category">{{ category }}</li>
        </ul>
    </div>
    <div v-else>
        <p>No game selected. Please go back and select a game.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useGamesStore } from '../stores/gamesStore'

export default defineComponent({
    setup() {
        const gamesStore = useGamesStore()
        const activeGame = computed(() => gamesStore.activeGame)
        return { activeGame }
    },
})
</script>