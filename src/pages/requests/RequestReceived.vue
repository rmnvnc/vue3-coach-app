<template>
    <div>
        Requests received
        <div v-for="request in requests" :key="request"> {{ request }}</div>
    </div>
</template>

<script>
export default {
    computed: {
        requests() {
            return this.$store.getters['requests/requests'];
        }
    }
}

</script>

<style scoped>

</style>