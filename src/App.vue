<template>
    <div v-if="!isAuthResolved">
        Loading ...
    </div>
    <template v-else >
        <the-header></the-header>
        <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
                <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
    </template>
</template>
  
<script setup>
    import TheHeader from './components/layout/TheHeader.vue'

    import { useAuthStore } from '@/stores/auth'
    import { storeToRefs } from 'pinia'
    import { watch, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    const auth = useAuthStore()
    const router = useRouter()

    const { isAuthResolved, didAutoLogout} = storeToRefs(auth)

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
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700');

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Noto Sans', sans-serif;
  }

  body {
    margin: 0;
    color: rgb(42, 42, 42);
  }

  /* 
  yellow-green (#BAFF39)
  dim grey (#6E6E6E) 
  white (#FFFFFF) 
    */
.route-enter-from{
    opacity: 0;
    transform: translateY(-30px);
}
.route-leave-to{
    opacity: 0;
    transform: translateY(30px);
}
.route-enter-active{
    transition: all .3s ease-out;
}
.route-leave-active{
    transition: all .3s ease-in;
}
.route-enter-to,
.route-leave-from{
    opacity: 1;
    transform: translateY(0);
}
</style>