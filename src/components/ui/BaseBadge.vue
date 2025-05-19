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
    display: inline-block;
    background-color: var(--color-border);
    color: var(--color-text);
    border-radius: var(--radius-circle);
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    margin-right: 0.5rem;
    white-space: nowrap;
}

.badge.frontend {
    background-color: #3b82f6;
    color: var(--color-inverted-text);
}

.badge.backend {
    background-color: #8b5cf6;
    color: var(--color-inverted-text);
}

.badge.career {
    background-color: #ec4899;
    color: var(--color-inverted-text);
}
</style>