import {createStore} from "vuex";

import config from '../config.js'

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
            config
        }
    },
    getters: {
        config(state) {
            return state.config;
        }
    }
})

export default store;