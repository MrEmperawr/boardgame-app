<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleLogin">
                            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-alert v-if="error" type="error" dismissible @input="clearError">
                                {{ error }}
                            </v-alert>
                            <v-alert v-if="showRegisterMessage" type="info">
                                Please register an account first.
                            </v-alert>
                            <v-btn type="submit" color="primary">Login</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <div>
                            <span>Don't have an account yet? </span>
                            <router-link :to="{ name: 'register' }">Register here!</router-link>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { FirebaseError } from '@firebase/util';
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../stores/userStore';

export default defineComponent({
    name: 'LoginPage',
    setup() {
        const userStore = useUserStore();

        const email = ref('');
        const password = ref('');
        const error = ref('');
        const showRegisterMessage = ref(false);

        const handleLogin = async () => {
            try {
                await userStore.login(email.value, password.value);
                showRegisterMessage.value = false; // Reset the register message if login is successful
            } catch (e) {
                if (e instanceof FirebaseError) {
                    if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
                        showRegisterMessage.value = true;
                    }
                } else {
                    if (e instanceof Error) {
                        error.value = e.message;
                    }
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
            showRegisterMessage,
            handleLogin,
            clearError,
        };
    },
});
</script>
