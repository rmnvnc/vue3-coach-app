import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'
import { useAuthStore } from '@/stores/auth'
import { config } from '@/config'


export const useCoachesStore = defineStore('coaches', () => {
    const auth = useAuthStore()
    const { isAuthResolved} = storeToRefs(auth)
    const token = computed(() => auth.user.token)
    const userId = computed(() => auth.user.userId)
    const coaches = ref([])
    const lastFetch = ref(null)

    const hasCoaches = () => coaches.value && coaches.value.length > 0

    function setFetchTimestamp() {
        lastFetch.value = new Date().getTime();
    }

    const addCoachLocally = (payload) => {
        coaches.value.unshift(payload)
    }
    const setCoaches = (payload) => {
        coaches.value = payload
    }

    const registerCoach = async(data) => {
        isAuthResolved.value = false;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            areas: data.areas,
            hourlyRate: data.rate,
            createdAt: Date.now()
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
            id: userId.value
        })

        auth.user.coach = {
            ...coachData
        }
        isAuthResolved.value = true;

    }

    const loadCoaches = async(payload = {}) => {
        const currentTimeStamp = new Date().getTime();

        if (lastFetch.value && ((currentTimeStamp - lastFetch.value) / 1000 < 60) && !payload.forceRefresh) {
            return
        }

        const response = await fetch(
            `${config.firebaseDB}/coaches.json?orderBy="createdAt"`
        )
        const data = await response.json()

        if (!response.ok || !data) {
            throw new Error(data?.message || 'Failed to fetch!')
        }

        const coaches = Object.entries(data)
            .map(([id, coach]) => ({ id, ...coach }))
            .sort((a, b) => b.createdAt - a.createdAt)

        setCoaches(coaches)
        setFetchTimestamp()
    }

    return {
        coaches,
        lastFetch,
        hasCoaches,
        registerCoach,
        loadCoaches
    }
})


