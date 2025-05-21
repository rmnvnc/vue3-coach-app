<template>
    <the-header></the-header>
    <div class="container">
        <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
                <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import TheHeader from './components/layout/TheHeader.vue'

import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const { didAutoLogout } = storeToRefs(auth)

onMounted(() => {
    auth.autoLogin();
})

watch(didAutoLogout, (newVal, oldVal) => {
    console.warn(newVal + ' ' + oldVal)
    if (newVal && newVal !== oldVal) {
        router.replace('/coaches')
    }
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

* {
    box-sizing: border-box;
}

html {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
}

body {
    margin: 0;
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.container {
  width: 100%;
  max-width: 800px;
  padding-inline: 1rem;
  margin-inline: auto;
}

.route-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}

.route-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.route-enter-active {
    transition: all .3s ease-out;
}

.route-leave-active {
    transition: all .3s ease-in;
}

.route-enter-to,
.route-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>