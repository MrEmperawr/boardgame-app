import { storeGameDuration, storeGameOwnership, storeRating } from '@/services/firestoreClient';
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
                this.loading = true
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
        async storeRating(gameId: string, rating: number) {
            try {
                this.loading = true;
                await storeRating(this.user?.uid || '', gameId, rating);
                this.error = null;
            } catch (e) {
                this.error = unkownError;
            } finally {
                this.loading = false;
            }
        },

        async storeGameDuration(gameId: string, duration: number) {
            try {
                this.loading = true;
                await storeGameDuration(this.user?.uid || '', gameId, duration);
                this.error = null;
            } catch (error) {
                this.error = unkownError;
            } finally {
                this.loading = false;
            }
        },

        async storeGameOwnership(gameId: string, isOwned: boolean) {
            try {
                this.loading = true;
                await storeGameOwnership(this.user?.uid || '', gameId, isOwned);
                this.error = null;
            } catch (error) {
                this.error = unkownError;
            } finally {
                this.loading = false;
            }
        },
    },
});
