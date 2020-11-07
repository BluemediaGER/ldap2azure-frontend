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
        }
    },
    actions: {
        initLocalStorage: function (context) {
            if (localStorage.getItem("username")) {
                context.commit("SET_USERNAME", localStorage.getItem("username"));
            }
            if (localStorage.getItem("loggedIn")) {
                context.commit("SET_LOGIN_STATE", (localStorage.getItem("loggedIn") === "true"));
            }
        },
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
            try {
                await axios.get("/api/auth/logout");
            } catch {}
            context.commit("SET_USERNAME", "");
            context.commit("SET_LOGIN_STATE", false);
        },
        ack: async function () {
            await axios.get("/api/auth/ack")
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
