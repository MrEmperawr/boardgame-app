<template>
    <v-card class="bg-teal-darken-4 text-white">
        <v-card-title class="game-title">{{ game.name }}</v-card-title>
        <v-card-subtitle class="game-release">Released: {{ game.released }}</v-card-subtitle>
        <v-card-text>
            <div class="body-2 my-2">Rating: {{ ratingValue }}/10</div>
            <div class="body-2 my-2">Average Play Duration: {{ durationValue }}h</div>
            <div class="body-2 my-2">Number of Owners: {{ ownersValue }}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn :to="{ name: 'gamedetail', params: { id: game.id } }" @click="setActiveGame">
                Details
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Game } from '../models'
import { useGamesStore } from '../stores/gamesStore'

export default defineComponent({
    props: {
        game: {
            type: Object as () => Game,
            required: true,
        },
        rating: Number,
        duration: Number,
        owners: Number,
    },
    setup(props) {
        const gamesStore = useGamesStore()
        const setActiveGame = () => {
            gamesStore.setActiveGame(props.game)
        }

        const ratingValue = computed(() => props.rating ?? 0);
        const durationValue = computed(() => props.duration ?? 0);
        const ownersValue = computed(() => props.owners ?? 0);

        return {
            setActiveGame,
            ratingValue,
            durationValue,
            ownersValue
        }
    },
})
</script>
