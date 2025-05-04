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
                firebase: process.env.VUE_APP_FIREBASE_DB,
                firebaseAPIkey: process.env.VUE_APP_FIREBASE_API_KEY
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