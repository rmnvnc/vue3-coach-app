import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUpdatePrompt = defineStore('updatePrompt', () => {
    const showPrompt = ref(false)
    const update = () => window.location.reload()

    return { 
        showPrompt,
        update 
    }
})