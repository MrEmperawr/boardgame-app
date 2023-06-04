<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/games">Games</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <RouterView />
</template>

