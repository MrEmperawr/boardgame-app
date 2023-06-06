<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col align-self="center">
                <v-card flat color="primary" class="text-center text-white">
                    <v-img height="400"
                        src="https://cdn1.epicgames.com/spt-assets/61c1413e3db0423f9ddd4a5edbee717e/a-game-of-thrones-offer-11gxu.jpg"
                        alt="A collection of board games"></v-img>
                    <v-card-title class="mt-5 display-2">
                        Welcome to Board Game Explorer!
                    </v-card-title>
                    <v-card-text class="subtitle-1">
                        Discover the world of board games and explore your favorite ones.
                    </v-card-text>
                </v-card>

                <v-card flat class="text-center mt-5">
                    <v-card-title class="display-1">
                        What can you do here?
                    </v-card-title>
                    <v-card-text class="subtitle-1">
                        At Board Game Explorer, you can browse through a vast selection of board games. You can find out
                        more about any game, including details about its release date, creators, player count, age rating,
                        and categories. Not only that, but you can also see what other users think about a game and share
                        your own ratings. Start your board game adventure now!
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" dark :to="{ name: 'games' }">Explore Games</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
