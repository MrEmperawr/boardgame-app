<template>
    <v-navigation-drawer app>
        <v-list dense>
            <v-list-item :to="{ name: 'games' }">
                <v-list-item-title>Games</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'about' }">
                <v-list-item-title>About</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!user" :to="{ name: 'login' }">
                <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user" @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/userStore'

export default defineComponent({
    name: 'Drawer',
    setup() {
        const userStore = useUserStore()
        const user = userStore.user

        const logout = async () => {
            await userStore.logout()
        }

        return {
            user,
            logout
        }
    }
})
</script>
