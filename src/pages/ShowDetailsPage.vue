<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { sanitizeHtml } from "../utils/helpers";
import { useShow } from "../modules/composables/shows";
import starIcon from "../assets/star.svg";

const route = useRoute();
const id = ref(Number(route.params.id));

const { data: show, isPending, isError, error } = useShow(id);

const emptyStateText = computed(() => {
  if (isPending.value) {
    return "Loading...";
  } else if (error.value) {
    return error.value.message;
  }
  return "";
});

const formattedDate = computed(() => {
  if (show.value?.premiered) {
    const premiereDay = new Date(show.value?.premiered);
    return new Intl.DateTimeFormat().format(premiereDay);
  }
  return "N/A";
});
</script>

<template>
  <div v-if="isPending || isError" class="show_details__state">
    {{ emptyStateText }}
  </div>
  <div v-if="show" class="show_details">
    <div class="show_details__main_info">
      <img v-if="show.image" :src="show.image" :alt="show.title" />
      <div class="show_details__main_info__info">
        <h1>{{ show.title }}</h1>
        <div class="show_details__top_meta">
          <div class="show_details__rating">
            <img :src="starIcon" alt="Rating" />
            <span>{{ show.rating ?? "N/A" }}/10</span>
          </div>
          <div class="show_details__genres">
            <span v-for="genre in show.genres" :key="genre">
              {{ genre }}
            </span>
          </div>
        </div>
        <div
          v-if="show.summary"
          class="show_details__summary"
          v-html="sanitizeHtml(show.summary)"
        />
        <div v-else class="show_details__summary">No summary available.</div>
      </div>
    </div>
    <div class="show_details__meta">
      <div class="show_details__meta_item">
        <span>Status</span>
        <strong>{{ show.status ?? "N/A" }}</strong>
      </div>

      <div class="show_details__meta_item">
        <span>Language</span>
        <strong>{{ show.language ?? "N/A" }}</strong>
      </div>

      <div class="show_details__meta_item">
        <span>Premiered</span>
        <strong>{{ formattedDate }}</strong>
      </div>

      <div class="show_details__meta_item">
        <span>Runtime</span>
        <strong>{{ show.runtime ?? "N/A" }} min</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show_details {
  margin: 0 auto;
  padding: 2rem 3rem;
}

.show_details__state {
  padding: 32px;
  text-align: center;
  opacity: 0.7;
}

.show_details__main_info {
  display: grid;
  grid-template-columns: 17.5rem 1fr;
  gap: 2rem;

  margin-bottom: 2.5rem;
}

.show_details__main_info img {
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
}

.show_details__main_info__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
}

.show_details__main_info__info h1 {
  margin: 0;
  font-size: 2.5rem;
  line-height: 1.2;
}

.show_details__top_meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  font-size: 0.875rem;
  opacity: 0.7;
}

.show_details__rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.show_details__rating img {
  width: 1rem;
}

.show_details__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.show_details__genres span {
  padding: 0.5rem 0.75rem;
  border-radius: 100px;
  background: #1b1f27;
  border: 1px solid #2a2f39;
  font-size: 0.75rem;
}

.show_details__summary {
  max-width: 700px;
  line-height: 1.6;
}

.show_details__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
}

.show_details__meta_item {
  padding: 1rem;
  border-radius: 8px;
  background: #181b22;
  border: 1px solid #262a33;
}

.show_details__meta_item span {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.65;
}

@media (max-width: 768px) {
  .show_details {
    padding: 1.5rem 1rem;
  }

  .show_details__main_info {
    grid-template-columns: 1fr;
  }

  .show_details__main_info img {
    max-width: 320px;
  }

  .show_details__main_info__info h1 {
    font-size: 2rem;
  }

  .show_details__summary {
    max-width: 100%;
  }
}
</style>
