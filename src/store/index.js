import {createStore} from "vuex";

import config from '../config.js'

import coachesModule from './modules/coaches/index.js'
import requestsModule from './modules/requests/index.js'

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule
    },
    state() {
        return {
            userId: 'c3',
            config
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        config(state) {
            return state.config;
        }
    }
})

export default store;