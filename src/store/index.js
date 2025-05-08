import {createStore} from "vuex";

import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'
import authModule from './modules/auth/index.js'

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule
    },
    state() {
        return {
            config: {
                firebase: import.meta.env.VITE_FIREBASE_DB,
                firebaseAPIkey: import.meta.env.VITE_FIREBASE_API_KEY
            }
        }
    },
    getters: {
        config(state) {
            return state.config;
        }
    }
})

export default store;