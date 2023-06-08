<template>
    <v-container>
        <v-card v-if="activeGame">
            <v-card-title>
                <h1 class="display-1">{{ activeGame.name }}</h1>
                <v-row>
                    <v-col cols="12">
                        <p class="subtitle-1">{{ activeGame.tagline }}</p>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <p>Released: {{ activeGame.released }}</p>
                        <p>Players: {{ activeGame.players.min }} to {{ activeGame.players.max }}</p>
                        <p>Recommended Age: {{ activeGame.age }}</p>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h2>Creators</h2>
                        <v-list dense>
                            <v-list-item v-for="creator in activeGame.creators" :key="creator">
                                <v-list-item-content>{{ creator }}</v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <h2>Categories</h2>
                        <v-list dense>
                            <v-list-item v-for="category in activeGame.categories" :key="category">
                                <v-list-item-content>{{ category }}</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card v-else>
            <v-card-text>
                <p>No game selected. Please go back and select a game.</p>
            </v-card-text>
        </v-card>

        <v-row class="mt-4" justify="space-evenly">
            <v-btn color="teal-darken-4" @click="goBack">Go Back</v-btn>
            <v-btn v-if="userStore.isAuthenticated && activeGame" color="teal-darken-4" @click="openDialog">Rate
                Game</v-btn>
        </v-row>

        <RatingDialog v-model="dialogVisible" @close="closeDialog" @submit="submitForm"></RatingDialog>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useGamesStore } from '../stores/gamesStore';
import { useUserStore } from '../stores/userStore';
import { Game } from '@/models/index';
import router from '@/router';
import RatingDialog from '@/components/RatingDialog.vue';
import { storeRating, storeGameDuration } from '@/services/firestoreClient';

export default defineComponent({
    name: 'GameDetails',
    components: {
        RatingDialog,
    },
    setup() {
        const gamesStore = useGamesStore();
        const userStore = useUserStore();
        const activeGame = computed<Game | null>(() => gamesStore.activeGame);
        const dialogVisible = ref(true);

        const goBack = () => {
            router.back();
        };

        const openDialog = () => {
            console.log('HELLO')
            dialogVisible.value = true;
        };

        const closeDialog = () => {
            dialogVisible.value = false;
        };

        const submitForm = async ({ rating, duration }: { rating: number; duration: number }) => {
            const userId = userStore.user?.uid;
            const gameId = activeGame.value?.id;

            if (userId && gameId && rating !== null && duration !== null) {
                try {
                    await storeRating(userId, gameId, rating);
                    console.log('Rating stored successfully');
                } catch (error) {
                    console.error('Error storing rating:', error);
                }

                try {
                    await storeGameDuration(userId, gameId, duration);
                    console.log('Game duration stored successfully');
                } catch (error) {
                    console.error('Error storing game duration:', error);
                }

                closeDialog();
            }
        };

        return {
            activeGame,
            goBack,
            userStore,
            dialogVisible,
            openDialog,
            closeDialog,
            submitForm,
        };
    },
});
</script>

<style scoped>
.display-1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: normal;
}

.subtitle-1 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: normal;
}

h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
}
</style>
