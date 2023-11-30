<template>
    <section>
        FILTER
    </section>
    <section>
        <div class="controls">
            <button>Refresh</button>
            <Router-link to="/register">Register as a coach</router-link>
        </div>
        <ul>
            <li v-for="coach in filteredCoaches" :key="coach.id">
                {{ coach.firstName }}
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    computed: {
        filteredCoaches() {
            return this.$store.getters['coaches/coaches']
        }
    }
}

</script>

<style lang="scss" scoped>

</style>