<script setup lang="ts">
import searchIcon from "../../assets/search.svg";
import homeIcon from "../../assets/house.svg";
</script>

<template>
  <header class="app_header">
    <router-link to="/">
      <img :src="homeIcon" alt="Home" />
      <span>Home</span>
    </router-link>
    <router-link to="search">
      <img :src="searchIcon" alt="Search" />
      <span>Search</span>
    </router-link>
  </header>
</template>

<style scoped>
.app_header {
  height: 2.5rem;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #313b46;
  border-bottom: 1px solid;
}

.app_header a {
  padding: 0.25rem 0.375rem;
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  align-items: center;
  color: #f3f4f6;
  border-radius: 8px;
  text-decoration: none;
}

.app_header a img {
  width: 1rem;
  height: 1rem;
}

.app_header a:hover {
  background-color: #6d8196;
}
</style>
