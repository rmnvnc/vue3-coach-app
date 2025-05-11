<template>
    <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
    </base-card>

</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { useCoachesStore } from '@/stores/coaches'
    import CoachForm from '@/components/coaches/CoachForm.vue'

    const router = useRouter()
    const coachesStore = useCoachesStore()

    function saveData(data) {
        coachesStore.registerCoach(data)
        router.replace('/coaches')
    }
</script>

<style scoped>

</style>