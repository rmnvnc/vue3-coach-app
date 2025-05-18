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
                <li v-if="!isAuthResolved && isAuthenticated"  class="user-info user-info--skeleton">
                    <h2>&nbsp;</h2>
                    <span>&nbsp;</span>
                </li>
                <li class="user-info" v-else-if="isAuthenticated">
                    <h2>{{ user.email }}</h2>
                    <span v-if="user.coach">
                        {{ user.coach.firstName }}  {{ user.coach.lastName }}
                    </span>
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

    const { isAuthResolved, isAuthenticated, user } = storeToRefs(useAuthStore())
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
    display: flex;
    flex-direction: column;
}

.user-info h2 {
    font-size: 16px;
    margin-block: 0px;
}
.user-info span {
    font-size: 14px;
}

.user-info--skeleton {
    gap: 4px;
}
.user-info--skeleton > * {
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
}
.user-info--skeleton h2 {
    width: 120px;
}
.user-info--skeleton span {
    width: 100px;
}

@keyframes pulse {
    0%, 100% { opacity: .5 }
    50% { opacity: .1 }
}
</style>