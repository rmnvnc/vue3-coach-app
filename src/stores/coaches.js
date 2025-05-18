import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import { useAuthStore } from '@/stores/auth'
import { config } from '@/config'


export const useCoachesStore = defineStore('coaches', () => {
    const auth = useAuthStore()
    const token = computed(() => auth.user.token)
    const userId = computed(() => auth.user.userId)
    const coaches = ref([])
    const lastFetch = ref(null)

    const hasCoaches = () => coaches.value && coaches.value.length > 0

    function setFetchTimestamp() {
        lastFetch.value = new Date().getTime();
    }

    const addCoachLocally = (payload) => {
        coaches.value.push(payload)
    }
    const setCoaches = (payload) => {
        coaches.value = payload
    }

    const registerCoach = async(data) => {
        
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            areas: data.areas,
            hourlyRate: data.rate
        }

        const response = await fetch(`${config.firebaseDB}/coaches/${userId.value}.json?auth=${token.value}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        if (!response.ok) {
            throw new Error('Failed to register coach.')
        }

        addCoachLocally({ 
            ...coachData, 
            id: userId 
        })

        auth.user.coach = {
            ...coachData
        }

        ////
        //// NEZABUDNUT UPDANUT USER.COACH, az po refersh sa naplni
        ///
    }


    const loadCoach = async(coachId) => {
        const response = await fetch(`${config.firebaseDB}/coaches/${coachId}.json`)
        const responseData = await response.json()

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch!')
        }

        return {
            id: coachId,
            ...responseData,
        }
    }

    const loadCoaches = async(payload = {}) => {
        const currentTimeStamp = new Date().getTime();

        if (lastFetch.value && ((currentTimeStamp - lastFetch.value) / 1000 < 60) && !payload.forceRefresh) {
            return
        }

        const response = await fetch(`${config.firebaseDB}/coaches.json`)
        const responseData = await response.json()

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch!')
        }

        const loadedCoaches = []

        for (const key in responseData) {
            const coach = {
                id: key,
                ...responseData[key]
            }
            loadedCoaches.push(coach)
        }

        setCoaches(loadedCoaches)
        setFetchTimestamp()
    }

    return {
        coaches,
        lastFetch,
        hasCoaches,
        registerCoach,
        loadCoaches,
        loadCoach
    }
})


