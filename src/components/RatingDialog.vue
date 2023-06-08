<template>
    <v-dialog v-model="dialogVisible" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Rate Game</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="ratingValue" label="Rating" type="number" min="1" max="10"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="durationValue" label="Duration (hours)" type="number" min="1"
                                required></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal-darken-4" @click="closeDialog">Cancel</v-btn>
                <v-btn color="teal-darken-4" @click="saveForm">Save</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="snackbarVisible" :color="snackbarColor">{{ snackbarMessage }}</v-snackbar>
    </v-dialog>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    name: 'RatingDialog',
    emits: ['update:modelValue', 'close', 'submit'],
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const dialogVisible = ref(props.modelValue);
        const ratingValue = ref(null);
        const durationValue = ref(null);
        const snackbarVisible = ref(false);
        const snackbarMessage = ref('');
        const snackbarColor = ref('');
        const isLoading = ref(false);

        const closeDialog = () => {
            dialogVisible.value = false;
            emit('update:modelValue', false);
            emit('close');
        };

        const saveForm = async () => {
            if (ratingValue.value !== null && durationValue.value !== null) {
                isLoading.value = true;

                try {

                    emit('submit', {
                        rating: ratingValue.value,
                        duration: durationValue.value,
                    });

                    snackbarMessage.value = 'Data saved successfully!';
                    snackbarColor.value = 'success';
                    snackbarVisible.value = true;
                } catch (error) {
                    snackbarMessage.value = 'Error saving data.';
                    snackbarColor.value = 'error';
                    snackbarVisible.value = true;

                    console.error('Error:', error);
                }

                isLoading.value = false;
            }
        };

        return {
            dialogVisible,
            ratingValue,
            durationValue,
            snackbarVisible,
            snackbarMessage,
            snackbarColor,
            isLoading,
            closeDialog,
            saveForm,
        };
    },
};
</script>
