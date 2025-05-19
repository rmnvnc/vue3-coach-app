<template>
    <li>
        <h3>{{ fullName }}</h3>
        <small>Created: {{ formatTimestamp(createdAt) }}</small>
        <h4>${{ rate }}/hour</h4>
        <div>
            <base-badge v-for="area in areas" :key="area" :title="area" :type="area"></base-badge>
        </div>
        <div class="actions">
            <base-button mode="outline" to="/auth" link v-if="!isLoggedIn">Log in to contact coach</base-button>
            <base-button mode="outline" :to="coachContactLink" link v-if="isLoggedIn">Contact</base-button>
            <base-button :to="coachDetailsLink" link>View Details</base-button>
        </div>
    </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
    id: String,
    firstName: String,
    lastName: String,
    rate: Number,
    areas: Array,
    createdAt: Number
})

const route = useRoute()
const auth = useAuthStore()

const coachContactLink = computed(() => `${route.path}/${props.id}/contact`)
const coachDetailsLink = computed(() => `${route.path}/${props.id}`)
const isLoggedIn = computed(() => auth.isAuthenticated)
const fullName = computed(() => { return props.firstName + ' ' + props.lastName })

function formatTimestamp(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleString('sk-SK') // slovenský formát: DD.MM.YYYY, HH:MM:SS
}
</script>

<style scoped>
li {
    margin: 2rem 0;
    border: 1px solid var(--color-border);
    padding: 1rem;
    border-radius: var(--radius-base);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-base);
}

@media (max-width: 768px) {
    li {
        margin: 1rem 0;
        border-radius: var(--radius-small);
    }
}

h3 {
    font-size: 1.5rem;
    margin-top: 0rem;
    margin-bottom: .5rem;
}

h4 {
    margin: 0.5rem 0;
}

div {
    margin: 0.5rem 0;
}

.actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 1rem;
    margin-bottom: 0px;
    margin-top: 1rem;
}
</style>