import {mapGetters} from "vuex";
import axios from "axios";
export default {
    namespaced: true,
    state: {
        username: ""
    },
    mutations: {
        SET_USERNAME(state, username) {
            state.username = username;
        }
    },
    actions: {
        login: async function (context, {username, password}) {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            try {
                let result = await axios.post("/api/auth/login", formData);
                context.commit("SET_USERNAME", username);
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        },
        logout: async function (context) {
            await axios.get("/api/auth/logout");
            context.commit("SET_USERNAME", "");
        },
        ack: async function () {
            await axios.get("/api/auth/ack")
        }
    },
    modules: {
    },
    getters: {
        getUsername(state) {
            return state.username;
        }
    },
    computed: {
        ...mapGetters([
            'getUsername'
        ])
    }
};