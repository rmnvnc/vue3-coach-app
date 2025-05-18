import {defineStore} from 'pinia'
import {ref, computed, reactive} from 'vue'
import { config } from '@/config'
import { getCoachById } from '@/composables/useCoach'

let logoutTimer

export const useAuthStore = defineStore('auth', () => {
    const apiKey = config.firebaseAPIkey
    const didAutoLogout = ref(false)
    const isAuthResolved = ref(false)
    const user = reactive({  
        token: null,
        userId: null,
        email: null,
        coach: null
    })

    const isAuthenticated = computed(() => !!user.token)

    const setUser = async ({ token: t, userId: id }) => {
        didAutoLogout.value = false;
        user.token = t;
        user.userId = id;
        user.email = null
        user.coach = null;

        // If LOGOUT
        if (!t || !id) {
            isAuthResolved.value = true;
            return
        }

        // getting EMAIL
        const resUser = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.firebaseAPIkey}`, { method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ idToken: t }),
         })
        user.email = (await resUser.json())?.users?.[0]?.email ?? null

        // getting COACH data
        try {
            const coachData = await getCoachById(id)
            user.coach = coachData ?? null
        } catch {
            user.coach = null
        }

        isAuthResolved.value = true;
    }

    const setAutoLogout = () => {
        didAutoLogout.value = true;
    }

    const auth = async ({ email, password, mode}) => {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

        
        if (mode === 'signup') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failet to authenticate. Check your login data.')
            throw error;
        }

        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        logoutTimer = setTimeout(() => {
            autoLogout();
        }, expiresIn)

        setUser({
            token: responseData.idToken,
            userId: responseData.localId
        })

    }

    const login = (payload) => {
        return auth({...payload, mode: 'login'})
    }

    const signup = (payload) => {
        return auth({...payload, mode: 'signup'})
    }


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        
        clearTimeout(logoutTimer);

        setUser({
            token: null,
            userId: null
        })
    }

    const autoLogout = () => {
        logout();
        setAutoLogout();
    }

    const autoLogin = async () => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            isAuthResolved.value = true;
            return;
        }
        
        logoutTimer = setTimeout(function() {
            autoLogout();
        }, expiresIn)

        if (storedToken && storedUserId) {
            await setUser({
                token: storedToken,
                userId: storedUserId
            })
        } else {
            isAuthResolved.value = true;
        }
    }

    return {
        isAuthenticated,
        user,
        isAuthResolved,
        didAutoLogout,
        login,
        signup,
        logout,
        autoLogout,
        autoLogin
    }
})