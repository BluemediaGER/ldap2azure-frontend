import {mapGetters} from "vuex";
import axios from "axios";
export default {
    namespaced: true,
    state: {
        localStorageSupported: false
    },
    mutations: {
        SET_STORAGE_SUPPORT(state, localStorageSupported) {
            state.localStorageSupported = localStorageSupported;
        }
    },
    actions: {
        initLocalStorage: context => {
            try {
                if (typeof (Storage) !== "undefined") {
                    context.commit("SET_STORAGE_SUPPORT", true);
                    context.commit("auth/initLocalStorage", null, {root: true});
                }
            } catch {
                context.commit("SET_STORAGE_SUPPORT", false);
            }
        },
        getDashboard: async function () {
            try {
                let result = await axios.get("/api/dashboard");
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        }
    },
    getters: {
        hasLocalStorageSupport: function (state) {
            return state.localStorageSupported;
        }
    },
    modules: {
    },
    computed: {
        ...mapGetters([
            "hasLocalStorageSupport"
        ])
    }
};