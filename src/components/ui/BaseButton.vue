<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script setup>
const props = defineProps({
    mode: {
        type: String,
        default: null
    },
    link: {
        type: Boolean,
        default: false
    },
    to: {
        type: String,
        default: '/'
    }
})
</script>


<style scoped>
button,
a {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-inverted-text);
    text-decoration: none;
    border: none;
    padding: 0.625rem 1.25rem;
    border-radius: var(--radius-base);
    font-weight: 600;
    font-size: 1rem;
    font-family: var(--font-family-base);
    cursor: pointer;
    transition: background-color var(--transition-fast), box-shadow var(--transition-fast);
    box-shadow: var(--shadow-base);
}

@media (max-width: 768px) {
    button,
    a {
        border-radius: var(--radius-small);
    }
}

button:hover,
a:hover {
    background-color: var(--color-primary-hover);
    box-shadow: var(--shadow-hover);
}

button:active,
a:active {
    background-color: var(--color-primary-active);
}

button.flat,
a.flat {
    background-color: transparent;
    color: var(--color-primary);
    border: none;
    box-shadow: none;
    padding: 0.625rem 1.25rem;
}

button.flat:hover,
a.flat:hover {
    background-color: rgba(59, 130, 246, 0.1);
}

button.flat:active,
a.flat:active {
    background-color: rgba(59, 130, 246, 0.2);
}

button.outline,
a.outline {
    background-color: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    padding: 0.5625rem 1.125rem;
    box-shadow: none;
}

button.outline:hover,
a.outline:hover {
    background-color: rgba(59, 130, 246, 0.05);
}

button.outline:active,
a.outline:active {
    background-color: rgba(59, 130, 246, 0.1);
}

button.white-outline,
a.white-outline {
    background-color: transparent;
    color: var(--color-inverted-text);
    border: 2px solid var(--color-inverted-text);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-base);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

button.white-outline:hover,
a.white-outline:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

button.white-outline:active,
a.white-outline:active {
    background-color: rgba(255, 255, 255, 0.2);
}
</style>