<template>
    <div>
        <base-dialog :show="!!error" title="An error ocured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"/>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Log in to register as a coach</base-button>
                    <base-button link to="/register" v-if="isLoggedIn && !isCoach && !isLoading">Register as a coach</base-button>
                </div>
                <div v-if="isLoading"><base-spinner></base-spinner></div>
                
                <ul v-else-if="hasCoaches">
                    <coach-item 
                        v-for="coach in filteredCoaches" 
                        :key="coach.id" 
                        :id="coach.id" 
                        :first-name="coach.firstName"
                        :last-name="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas">
                    </coach-item>
                </ul>
                <h3 v-else>No coaches found :/</h3>
            </base-card>
        </section>
    </div>
</template>

<script setup>
    import CoachItem from '../../components/coaches/CoachItem.vue';
    import CoachFilter from '../../components/coaches/CoachFilter.vue'
    import {ref, reactive, computed, onMounted} from 'vue'
    import { useCoachesStore } from '@/stores/coaches'
    import { useAuthStore } from '@/stores/auth'

    const coaches = useCoachesStore()
    const auth = useAuthStore()

    const isCoach = coaches.isCoach
    const isLoggedIn = computed(() => auth.isAuthenticated)
    const isLoading = ref(false)
    const error = ref(null)
    const activeFilters = reactive({
        frontend: true,
        backend: true,
        career: true
    })

    const filteredCoaches = computed(() => {
        return coaches.coaches.filter(coach => {
            if (activeFilters.frontend && coach.areas.includes('frontend')) return true
            if (activeFilters.backend && coach.areas.includes('backend')) return true
            if (activeFilters.career && coach.areas.includes('career')) return true
            return false
        })
    })

    const hasCoaches = computed(() => {
        return !isLoading.value && coaches.hasCoaches
    })

    const setFilters = (updatedFilters) => {
        Object.assign(activeFilters, updatedFilters)
    }

    const loadCoaches = async (refresh = false) => {
        console.log('refresh data ' + refresh);
        isLoading.value = true
    
        try {
            await coaches.loadCoaches({ forceRefresh: refresh })
        } catch (err) {
            error.value = err.message || 'Something went wrong!'
        }

        isLoading.value = false
    }

    const handleError = () => {
        error.value = null
    }

    onMounted(() => {
        loadCoaches()
    })
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>