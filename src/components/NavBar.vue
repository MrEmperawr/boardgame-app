<template>
    <v-app-bar app color="primary" dark>
        <v-toolbar-title>
            <router-link to="/" class="white--text">
                Board Game Explorer
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text="" :to="{ name: 'games' }">Games</v-btn>
        <v-btn text="" :to="{ name: 'about' }">About</v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavBar',
})
</script>