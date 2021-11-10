import {mapGetters} from "vuex";
import axios from "axios";
export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        getUserList: async function (state, filter, page) {
            try {
                let path = "/api/user";
                if (filter && filter !== "all") path = "/api/user/" + filter;
                if (page && page !== 0) path = path + "?page=" + page;
                let result = await axios.get(path);
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        },
        getUser: async function (state, id) {
            try {
                let result = await axios.get("/api/user/" + id);
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        },
        retryUserSync: async function (state, id) {
            try {
                let result = await axios.post("/api/user/" + id + "/retry");
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        },
        getUserSyncConflicts: async function (state, id) {
            try {
                let result = await axios.get("/api/user/" + id + "/conflicts");
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        },
        resolveUserSyncConflict: async function (state, userId, azureImmutableId, strategy) {
            let requestObject = {azureImmutableId, strategy}
            try {
                let result = await axios.post("/api/user/" + userId + "/conflicts/resolve", requestObject);
                return result.data;
            } catch (error) {
                return {error: true, code: error.response.status, data: error.response.data};
            }
        }
    },
    modules: {
    },
    computed: {
        ...mapGetters([

        ])
    }
};
