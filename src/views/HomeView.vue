<template>
    <main class="home">
        <section class="hero">
            <img src="banner-image.jpg" alt="A collection of board games" />
            <h1>Welcome to Board Game Explorer!</h1>
            <p>Discover the world of board games and explore your favorite ones.</p>
        </section>

        <section class="info">
            <h2>What can you do here?</h2>
            <p>At Board Game Explorer, you can browse through a vast selection of board games. You can find out more about
                any game, including details about its release date, creators, player count, age rating, and categories. Not
                only that, but you can also see what other users think about a game and share your own ratings. Start your
                board game adventure now!</p>
            <router-link to="/games">Explore Games</router-link>
        </section>
    </main>
</template>



<style scoped>
/* Add your CSS styles here. */
</style>