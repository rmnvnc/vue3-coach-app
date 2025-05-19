<template>
    <li>
        <div>
            <a :href="emailLink">{{ email }}</a>
        </div>
        <p>{{ message }}</p>
    </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const emailLink = computed(() => `mailto:${props.email}`)
</script>

<style scoped>
li {
    margin: 1rem 0;
    border: 1px solid var(--color-border);
    padding: 1rem;
    border-radius: var(--radius-base);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-base);
}

@media (max-width: 768px) {
    li {
        border-radius: var(--radius-small);
    }
}

a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
}

a:hover,
a:active {
    color: var(--color-primary-hover);
}

p {
    margin: 0.5rem 0 0 0;
    color: var(--color-text);
}
</style>