<script setup lang="ts">
import type { Show } from "../../modules/types/show.types";

defineProps<{ show: Show }>();
</script>
<template>
  <router-link :to="`/details/${show.id}`" class="show_card">
    <div class="show_card__image_wrapper">
      <img v-if="show.image" :src="show.image" :alt="show.title" />
      <div v-else class="show_card__image_placeholder">No Image</div>
    </div>
    <div class="show_card__content">
      <h3 class="show_card__title">
        {{ show.title }}
      </h3>

      <p class="show_card__rating">
        {{ show.rating ?? "N/A" }}
      </p>
    </div>
  </router-link>
</template>

<style scoped>
.show_card {
  width: 140px;
  flex-shrink: 0;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-h);
}

.show_card__image_wrapper {
  width: 100%;
  height: 200px;
  background: #eee;
  overflow: hidden;
  border-radius: 8px;
}

.show_card__image_wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show_card__image_placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 12px;
  color: #666;
}

.show_card__content {
  margin-top: 8px;
}

.show_card__title {
  font-size: 14px;
  margin: 0;
  line-height: 1.2;
}

.show_card__rating {
  font-size: 12px;
  color: #555;
  margin-top: 4px;
}
</style>
