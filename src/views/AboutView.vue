<template>
    <main class="about">
        <section>
            <h2>Our Games</h2>
            <p>At Board Game Explorer, we're proud to showcase an extensive selection of high-quality games. We believe in
                the power of board games to bring people together, challenge our minds, and simply provide fun and
                entertainment. The games featured here represent just a small glimpse into our diverse collection. Whether
                you're into strategy, fantasy, adventure, or a bit of everything, we've got something for you!</p>
        </section>
        <section v-for="game in games" :key="game.name">
            <h2>{{ game.name }}</h2>
            <p>{{ game.description }}</p>
        </section>
    </main>
</template>

<script setup lang="ts">
const games = [
    { name: "Gloomhaven", description: "Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives." },
    { name: "Terraforming Mars", description: "Corporations are competing to transform Mars into a habitable planet by spending vast resources and using innovative technology." },
    { name: "Spirit Island", description: "Spirit Island is a cooperative, settler-destruction strategy game for 1 to 4 players designed by R. Eric Reuss." },
    { name: "Twilight Imperium: 4th Edition", description: "Twilight Imperium Fourth Edition is a game of galactic conquest where players take on the role of one of seventeen factions vying for galactic domination." }
];
</script>