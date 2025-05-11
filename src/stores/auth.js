import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import { config } from '@/config'

let logoutTimer

export const useAuthStore = defineStore('auth', () => {
    const apiKey = config.firebaseAPIkey
    const token = ref(null)
    const userId = ref(null)
    const didAutoLogout = ref(false)

    const isAuthenticated = computed(() => !!token.value)

    const setUser = ({ token: t, userId: id }) => {
        token.value = t;
        userId.value = id;
        didAutoLogout.value = false;
    }

    const setAutoLogout = ({}) => {
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

    const autoLogin = () => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }
        
        logoutTimer = setTimeout(function() {
            autoLogout();
        }, expiresIn)

        if (storedToken && storedUserId) {
            setUser({
                token: storedToken,
                userId: storedUserId
            })
        }
    }

    return {
        token,
        userId,
        didAutoLogout,
        isAuthenticated,
        login,
        signup,
        logout,
        autoLogout,
        autoLogin
    }
})