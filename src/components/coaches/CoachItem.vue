<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <base-badge v-for="area in areas" :key="area" :title="area"  :type="area"></base-badge>
        </div>
        <div class="actions">
            <base-button mode="outline" to="/auth" link v-if="!isLoggedIn">Log in to contact coach</base-button>
            <base-button mode="outline" :to="coachContactLink" link v-if="isLoggedIn">Contact</base-button>
            <base-button :to="coachDetailsLink" link>View Details</base-button>
        </div>
    </li>
</template>

<script setup>
    import { computed, defineProps } from 'vue'
    import { useRoute } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'

    const props = defineProps({
        id: String,
        firstName: String,
        lastName: String,
        rate: Number,
        areas: Array
    })

    const route = useRoute()
    const auth = useAuthStore()

    const coachContactLink = computed(() => `${route.path}/${props.id}/contact`)
    const coachDetailsLink = computed(() => `${route.path}/${props.id}`)
    const isLoggedIn = computed(() => auth.isAuthenticated)
    const fullName = computed(() => {return props.firstName + ' ' + props.lastName})
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>