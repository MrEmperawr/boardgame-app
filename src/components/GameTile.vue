<template>
    <div class="game-tile">
        <h2 class="game-title">{{ game.name }}</h2>
        <p class="game-release">Released: {{ game.released }}</p>
        <router-link class="game-details" :to="{ name: 'GameDetail', params: { id: game.id } }" @click="setActiveGame">
            Details
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '../models'
import { useGamesStore } from '../stores/gamesStore'

export default defineComponent({
    props: {
        game: {
            type: Object as () => Game,
            required: true,
        },
    },
    setup(props) {
        const gamesStore = useGamesStore()
        const setActiveGame = () => {
            gamesStore.setActiveGame(props.game)
        }
        return {
            setActiveGame
        }
    },
})
</script>