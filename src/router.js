import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/auth'

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        { path: '/coaches/:id', component: CoachDetail, props: true, children: [
            {path: 'contact', component: ContactCoach, meta: { requiresAuth: true}}, // /coaches/c1/contact
        ] },
        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true} },
        { path: '/requests', component: RequestReceived, meta: { requiresAuth: true} },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true} },
        { path: '/:notFound(.*)', component: NotFound }
    ]
})

router.beforeEach(function(to, _, next) {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        if (to.path.includes('/contact')) {
            const coachId = to.params.id;
            next(`/coaches/${coachId}`);
        } else {
            next('/auth');
        }
    } else if (to.meta.requiresUnauth && auth.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;