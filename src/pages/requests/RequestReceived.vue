<template>
    <div>
        <base-dialog :show="!!error" title="An error ocured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <header>
                    <h2>Requests received</h2>
                </header>
                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="receivedRequests.length > 0 && !isLoading">
                    <request-item v-for="req in receivedRequests" 
                        :key="req.id" 
                        :email="req.userEmail" 
                        :message="req.message">
                    </request-item>
                </ul>
                <h3 v-else-if="!coaches.isCoach">You need to be registered as coach</h3>
                <h3 v-else>You haven't received any requests yet</h3>
            </base-card>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRequestsStore } from '@/stores/requests'
import { useCoachesStore } from '@/stores/coaches'

import RequestItem from '@/components/requests/RequestItem.vue'

const requests = useRequestsStore()
const coaches = useCoachesStore()

const isLoading = ref(false)
const error = ref(null)

const receivedRequests = computed(() =>requests.filteredRequests)

onMounted(async () => {
  isLoading.value = true
  try {
    await requests.fetchRequests()
  } catch (err) {
    error.value = err.message || 'Something went wrong'
  }
  isLoading.value = false
})

function handleError() {
  error.value = null
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>