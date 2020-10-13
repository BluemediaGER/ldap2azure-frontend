import {mapGetters} from "vuex";
import axios from "axios";
export default {
    namespaced: true,
    state: {
        username: "",
        loggedIn: false
    },
    mutations: {
        SET_USERNAME(state, username) {
            try {
                localStorage.setItem("username", username);
            } catch {}
            state.username = username;
        },
        SET_LOGIN_STATE(state, loggedIn) {
            try {
                localStorage.setItem("loggedIn", loggedIn);
            } catch {}
            state.loggedIn = loggedIn;
        },
        initLocalStorage(state) {
            if (localStorage.getItem("username")) {
                state.username = localStorage.getItem("username");
            }
            if (localStorage.getItem("loggedIn")) {
                state.loggedIn = localStorage.getItem("loggedIn");
            }
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
                context.commit("SET_LOGIN_STATE", true);
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        },
        logout: async function (context) {
            await axios.get("/api/auth/logout");
            context.commit("SET_USERNAME", "");
            context.commit("SET_LOGIN_STATE", false);
        },
        ack: async function (context) {
            await axios.get("/api/auth/ack")
            context.commit("SET_USERNAME", "");
            context.commit("SET_LOGIN_STATE", false);
        },
        reset: function() {
            axios.get("/api/auth/logout");
        },
        changePassword: async function(context, password) {
            try {
                return await axios.put("/api/auth/api-user/password", {password: password});
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        }
    },
    modules: {
    },
    getters: {
        getUsername(state) {
            return state.username;
        },
        getLoginState(state) {
            return state.loggedIn;
        }
    },
    computed: {
        ...mapGetters([
            "getUsername",
            "getLoginState"
        ])
    }
};