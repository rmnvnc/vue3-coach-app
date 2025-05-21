<template>
    <header>
        <nav>
            <h1><router-link to="/">Find a coach V1</router-link></h1>
            <button class="hamburger" :class="{ open: isMenuOpen }" @click="toggleMenu" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul :class="{ open: isMenuOpen }" @click="closeMenu">
                <li><router-link to="/coaches">All coaches</router-link></li>
                <li v-if="isAuthenticated">
                    <router-link to="/requests">Requests</router-link>
                </li>
                <li v-else>
                    <router-link to="/auth">Log in</router-link>
                </li>
                <li v-if="!isAuthResolved && isAuthenticated" class="user-info user-info--skeleton">
                    <h2>&nbsp;</h2>
                    <span>&nbsp;</span>
                </li>
                <li class="user-info" v-else-if="isAuthenticated">
                    <h2>{{ user.email }}</h2>
                    <span v-if="user.coach">
                        {{ user.coach.firstName }} {{ user.coach.lastName }}
                    </span>
                </li>
                <li v-if="isAuthenticated">
                    <base-button mode="white-outline" @click="logOut">Logout</base-button>
                </li>
            </ul>

        </nav>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const router = useRouter()

const { isAuthResolved, isAuthenticated, user } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()

const logOut = () => {
    logout()
    router.replace('/coaches')
}

const isMenuOpen = ref(false)
function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}
function closeMenu() {
    isMenuOpen.value = false
}
</script>

<style scoped>
header {
    width: 100%;
    height: 5rem;
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
}

header a {
    text-decoration: none;
    color: #fff;
    display: inline-block;
    border: 2px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
    border-bottom: 2px solid #fff;
}

h1 {
    margin: 0;
}

h1 a {
    color: var(--color-inverted-text);
    margin: 0;
    padding: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
    border-color: transparent;
}

header nav {
    max-width: 100%;
    width: 800px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 1rem;
}

header ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.logout {
    border-color: #fff;
}

.user-info {
    color: var(--color-inverted-text);
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    text-align: center;
}

@media (min-width: 768px) {
    .user-info {
        border-left: 2px solid #fff;
        text-align: left;
    }
}

.user-info h2 {
    font-size: 16px;
    margin-block: 0;
}

.user-info span {
    font-size: 14px;
}

.user-info--skeleton {
    gap: 4px;
}

.user-info--skeleton>* {
    background-color: var(--color-border);
    border-radius: var(--radius-small);
    animation: pulse 1.5s infinite ease-in-out;
}

.user-info--skeleton h2 {
    width: 120px;
}

.user-info--skeleton span {
    width: 100px;
}

.hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
}

.hamburger span {
    height: 3px;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s ease;
}

/* animácia na X */
.hamburger.open span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
    opacity: 0;
}

.hamburger.open span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

nav ul {
    display: flex;
    align-items: center;
    gap: 1rem;
}

@media (max-width: 768px) {
    .hamburger {
        display: flex;
    }

    nav ul {
        position: absolute;
        top: 5rem;
        left: 0;
        width: 100%;
        flex-direction: column;
        background-color: var(--color-primary);
        padding: 0 1rem;
        overflow: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        z-index: 1000;
    }

    nav ul.open {
        padding: 1rem;
        max-height: 300px;
        opacity: 1;
    }

    nav ul li {
        margin: 0.5rem 0;
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: .5
    }

    50% {
        opacity: .1
    }
}
</style>