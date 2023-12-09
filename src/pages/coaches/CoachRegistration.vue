<template>
    <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
    </base-card>

</template>

<script>
import coachForm from '../../components/coaches/CoachForm.vue'

export default {
    components: {
        coachForm
    },
    methods: {
        saveData(data) {
            this.$store.dispatch('coaches/registerCoach', data);
            this.$router.replace('/coaches');
        }
    }
}
</script>

<style scoped>

</style>