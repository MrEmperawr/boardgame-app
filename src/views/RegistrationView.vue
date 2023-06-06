<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title>Register</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleRegister">
                            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-alert v-if="error" type="error" dismissible @input="clearError">
                                {{ error }}
                            </v-alert>
                            <v-btn type="submit" color="primary">Register</v-btn>
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
    name: 'RegistrationView',
    setup() {
        const userStore = useUserStore();

        const email = ref('');
        const password = ref('');
        const error = ref('');

        const handleRegister = async () => {
            try {
                await userStore.register(email.value, password.value)
                error.value = ''
            } catch (e) {
                if (e instanceof Error) {
                    error.value = e.message
                } else {
                    error.value = "Uknown error"
                }
            }
        };

        const clearError = () => {
            error.value = ''
        };

        return {
            email,
            password,
            error,
            handleRegister,
            clearError,
        };
    },
});
</script>