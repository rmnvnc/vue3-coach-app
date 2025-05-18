import { config } from '@/config'

export async function getCoachById(coachId) {
    const response = await fetch(`${config.firebaseDB}/coaches/${coachId}.json`)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch coach')
    }

    return {
        id: coachId,
        ...data
    }
}