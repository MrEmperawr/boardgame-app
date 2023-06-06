<template>
    <v-app-bar app color="teal-darken-4"
        image="https://img.freepik.com/premium-photo/dark-fantasy-landscape-digital-art-illustration_725906-106.jpg" dark>
        <v-toolbar-title>
            <router-link to="/" class="white--text">
                Board Game Explorer
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="text-subtitle-1" color="primary" variant="flat" :to="{ name: 'games' }">Games</v-btn>
        <v-btn class="text-subtitle-1" color="primary" variant="flat" :to="{ name: 'about' }">About</v-btn>
        <v-btn v-if="!user" :to="{ name: 'login' }">Login</v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/userStore';

export default defineComponent({
    name: 'NavBar',
    setup() {
        const userStore = useUserStore();
        const user = userStore.user;

        return {
            user,
        };
    },
});
</script>