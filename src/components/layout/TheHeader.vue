<template>
    <header>
        <nav>
            <h1><router-link to="/">Find a coach</router-link></h1>
            <ul>
                <li><router-link to="/coaches">All coaches</router-link></li>
                <li v-if="isAuthenticated">
                    <router-link to="/requests">Requests</router-link>
                </li>
                <li v-else>
                    <router-link to="/auth">Log in</router-link>
                </li>
                <li class="user-info" v-if="isAuthenticated">
                    {{ user.email }}
                    <span v-if="user.coach">
                        {{ user.coach.firstName }}  {{ user.coach.lastName }}
                    </span>
                    <span v-else>NOT COACH</span>
                </li>
                <li v-if="isAuthenticated">
                    <base-button @click="logOut">Logout</base-button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    import { storeToRefs } from 'pinia'

    const router = useRouter()

    const { isAuthenticated, user } = storeToRefs(useAuthStore())
    const { logout } = useAuthStore()

    const logOut = () => {
        logout()
        router.replace('/coaches')
    }
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

.user-info {
    color: white;
}
</style>