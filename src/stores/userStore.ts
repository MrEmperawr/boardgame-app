import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { defineStore } from 'pinia';

import { unkownError } from '../constants/messages';
import { auth } from '../firebase';


export const useUserStore = defineStore('user', {
    state: () => ({
        loading: false,
        user: null as User | null,
        error: null as string | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async register(email: string, password: string) {
            try {
                this.loading = true;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                this.error = null;
            } catch (e) {
                if (e instanceof Error) {
                    this.error = e.message;
                } else {
                    this.error = unkownError
                }

            } finally {
                this.loading = false;
            }
        },
        async login(email: string, password: string) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                this.user = userCredential.user;
                this.error = null
            } catch (e) {
                if (e instanceof Error) {
                    this.user = null
                    this.error = e.message
                } else {
                    this.error = unkownError
                }

            }
        },
        async logout() {
            try {
                await auth.signOut()
                this.user = null
                this.error = null
            } catch (e) {
                if (e instanceof Error) {
                    this.error = e.message
                } else {
                    this.error = unkownError
                }

            }
        },
        clearError() {
            this.error = null;
        },
    },
});
