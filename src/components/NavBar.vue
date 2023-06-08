<template>
    <v-app-bar app color="teal-darken-4"
        image="https://img.freepik.com/premium-photo/dark-fantasy-landscape-digital-art-illustration_725906-106.jpg" dark>
        <v-toolbar-title>
            <router-link to="/" class="white--text">
                Board Game Explorer
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <Drawer />
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Drawer from './Drawer.vue'

export default defineComponent({
    name: 'NavBar',
    components: {
        Drawer
    }
})
</script>
