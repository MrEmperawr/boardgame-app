<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <v-card>
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleLogin">
                            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-alert v-if="error" type="error" dismissible @input="clearError">
                                {{ error }}
                            </v-alert>
                            <v-btn type="submit" color="primary">Login</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../stores/userStore';

export default defineComponent({
    name: 'LoginView',
    setup() {
        const userStore = useUserStore();

        const email = ref('');
        const password = ref('');
        const error = ref('');

        const handleLogin = async () => {
            try {
                await userStore.login(email.value, password.value);
            } catch (e) {
                if (e instanceof Error) {
                    error.value = e.message;
                } else {
                    error.value = "Unkown error"
                }
            }
        };

        const clearError = () => {
            error.value = '';
        };

        return {
            email,
            password,
            error,
            handleLogin,
            clearError,
        };
    },
});
</script>
