import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { config } from '@/config' 

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])
  const auth = useAuthStore()
  const token = computed(() => auth.user.token)
  const userId = computed(() => auth.user.userId)
  const lastFetch = ref(null)

    function setFetchTimestamp() {
        lastFetch.value = new Date().getTime();
    }

  const contactCoach = async (payload) => {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    }

    const response = await fetch(`${config.firebaseDB}/requests/${payload.coachId}.json?auth=${token.value}`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to send request.')
    }

    newRequest.id = responseData.name
    newRequest.coachId = payload.coachId

    requests.value.push(newRequest)
  }

  const fetchRequests = async (options = {}) => {
    const { forceRefresh = false } = options
    const currentTimestamp = new Date().getTime()

    if ( !forceRefresh && lastFetch.value && (currentTimestamp - lastFetch.value) / 1000 < 60) {
        return
    }

    const response = await fetch(`${config.firebaseDB}/requests/${userId.value}.json?auth=${token.value}`)
    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch requests')
    }

    const loadedRequests = []

    for (const key in responseData) {
      loadedRequests.push({
        id: key,
        coachId: userId.value,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      })
    }

    requests.value = loadedRequests
    setFetchTimestamp()
  }

  const filteredRequests = computed(() =>
    requests.value.filter((req) => req.coachId === userId.value)
  )


  return {
    requests,
    contactCoach,
    fetchRequests,
    filteredRequests
  }
})
