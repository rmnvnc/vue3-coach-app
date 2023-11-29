import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: null },
        { path: '/coaches/:id', component: null, children: [
            {path: 'contact', component: null}, // /coachces/c1/contact
        ] },
        { path: '/register', component: null },
        { path: '/requests', component: null },
        { path: '/:notFound(.*)', redirect: '/coaches' }
    ]
})

export default router;