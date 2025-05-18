<template>
    <div>
        <base-dialog :show="!!error" title="An error ocured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section v-if="isLoading">
            <base-card>
                <base-spinner></base-spinner>
            </base-card>
        </section>
        <section v-else-if="!selectedCoach">
            <base-card>
                <p>Coach not found.</p>
            </base-card>
        </section>
        <section v-else> 
            <section>
                <base-card>
                    <h2>{{ fullName }}</h2>
                    <h3>${{ rate }}/hour </h3>
                </base-card>
                <base-card>
                    <header>
                        <h2>Interested? Reach out now!</h2>
                        <base-button to="/auth" link v-if="!isLoggedIn">Log in to contact</base-button>
                        <base-button :to="contactLink" link v-if="isLoggedIn && !isContactPage">Contact</base-button>
                    </header>
                    <router-view></router-view>
                </base-card>
            </section>
            <section>
                <base-card>
                    <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
                    <p>{{ description }}</p>
                </base-card>
            </section>
        </section>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useCoachesStore } from '@/stores/coaches'
    import { useAuthStore } from '@/stores/auth'


    const auth = useAuthStore()
    const coaches = useCoachesStore()
    const route = useRoute()
    const id = computed(() => route.params.id)
    const error = ref(null)

    const isLoading = ref(true)
    
    const selectedCoach = ref(null)

    const handleError = () => {
        error.value = null
    }

    const fullName = computed(() => {
        if (!selectedCoach.value) return ''
        return selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName
    })

    const areas = computed(() => selectedCoach.value?.areas || [])
    const rate = computed(() => selectedCoach.value?.hourlyRate || 0)
    const description = computed(() => selectedCoach.value?.description || '')
    const contactLink = computed(() => route.path + '/contact')
    const isContactPage = computed(() => route.path.endsWith('/contact'))
    const isLoggedIn = computed(() => auth.isAuthenticated)

    onMounted(async () => {
        try {
            selectedCoach.value = await coaches.loadCoach(id.value)
        } catch (err) {
            error.value = err.message || 'Failed to load coach data.'
        }
        isLoading.value = false
    })

</script>


<style scoped>

</style>