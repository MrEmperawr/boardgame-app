<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title>Register</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleRegistration">
                            <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-alert v-if="error" type="error" dismissible @input="clearError">
                                {{ error }}
                            </v-alert>
                            <v-alert v-if="registrationSuccess" type="success" dismissible @input="clearSuccessMessage">
                                Registration successful! You can now login.
                            </v-alert>
                            <v-btn type="submit" color="primary">Register</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <div>
                            <span>Already have an account? </span>
                            <router-link :to="{ name: 'login' }">Login here!</router-link>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import { unkownError } from '@/constants/messages';

export default defineComponent({
    name: 'RegistrationView',
    setup() {
        const userStore = useUserStore();
        const router = useRouter();

        const email = ref('')
        const password = ref('')
        const error = ref('')
        const registrationSuccess = ref(false)

        const handleRegistration = async () => {
            try {
                await userStore.register(email.value, password.value)
                error.value = ''
                registrationSuccess.value = true
            } catch (e) {
                registrationSuccess.value = false
                if (e instanceof Error) {
                    error.value = e.message
                } else {
                    error.value = unkownError
                }
            }
        };

        const clearError = () => {
            error.value = ''
        };

        const clearSuccessMessage = () => {
            registrationSuccess.value = false
        };

        return {
            email,
            password,
            error,
            registrationSuccess,
            handleRegistration,
            clearError,
            clearSuccessMessage,
        }
    },
});
</script>