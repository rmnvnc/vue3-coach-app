<template>
    <div>
        <section v-if="isLoading">
            <base-card>
                <base-spinner></base-spinner>
            </base-card>
        </section>
        <section v-else-if="!selectedCoach">
            <base-card>
                <p>Coach not found.</p>
            </base-card>
        </section>
        <section v-else> 
            <section>
                <base-card>
                    <h2>{{ fullName }}</h2>
                    <h3>${{ rate }}/hour </h3>
                </base-card>
                <base-card>
                    <header>
                        <h2>Interested? Reach out now!</h2>
                        <base-button to="/auth" link v-if="!isLoggedIn">Log in to contact</base-button>
                        <base-button :to="contactLink" link v-if="isLoggedIn && !isContactPage">Contact</base-button>
                    </header>
                    <router-view></router-view>
                </base-card>
            </section>
            <section>
                <base-card>
                    <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
                    <p>{{ description }}</p>
                </base-card>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            isLoading: false,
            selectedCoach: null
        }
    },
    methods: {
        loadCoach() {
            this.selectedCoach = this.$store.getters['coaches/coaches'].find((coach) => coach.id === this.id);
        }
    },
    computed: {
        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
        },
        areas() {
            return this.selectedCoach.areas;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        description() {
            return this.selectedCoach.description;
        },
        contactLink() {
            return this.$route.path + '/contact'
        },
        isContactPage() {
            return this.$route.path.endsWith('/contact');
        },
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    },
    async created() {
        this.isLoading = true;

        if (!this.$store.getters['coaches/hasCoaches']) {
            try {
                await this.$store.dispatch('coaches/loadCoaches');
            } catch (err) {
                this.error = 'Failed to load coach data.';
            }
        }

        this.loadCoach();
        this.isLoading = false;
    },
    watch: {
        $route() {
            this.loadCoach();
        },
    },
}

</script>

<style scoped>

</style>