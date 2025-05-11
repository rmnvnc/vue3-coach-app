<template>
    <span class="badge" :class="type">
        {{ text }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const text = computed(() => props.title.toUpperCase())
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.25rem .5rem;
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 12px;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>