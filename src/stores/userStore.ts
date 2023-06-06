import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../firebase';

export const useUserStore = defineStore('user', {
    state: () => ({

        user: null as User | null,
        error: null as string | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
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
                    this.error = "Unkown error"
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
                    this.error = "Unkown error"
                }

            }
        },
        clearError() {
            this.error = null;
        },
    },
});
