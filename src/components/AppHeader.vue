<template>
    <div>
        <v-app-bar app color="teal-darken-4" dark>
            <v-toolbar-title>
                <router-link to="/" class="white--text">
                    Board Game Explorer
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="drawer = !drawer">
                <v-icon dark>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" right temporary>
            <v-list>
                <v-list-item link :to="{ name: 'games' }">
                    <v-list-item-title>Games</v-list-item-title>
                </v-list-item>
                <v-list-item link :to="{ name: 'about' }">
                    <v-list-item-title>About</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!user" link :to="{ name: 'login' }">
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
                <v-list-item v-else @click="logout">
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
    name: 'AppHeader',
    setup() {
        const drawer = ref(false)
        const userStore = useUserStore()
        const user = userStore.user

        const logout = async () => {
            await userStore.logout()
            drawer.value = false
        }

        return {
            drawer,
            user,
            logout
        }
    }
})
</script>

<style scoped>
.text-no-wrap {
    white-space: nowrap;
    overflow: visible;
    text-overflow: unset;
}
</style>
