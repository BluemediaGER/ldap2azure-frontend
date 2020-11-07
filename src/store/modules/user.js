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
        }
    },
    modules: {
    },
    computed: {
        ...mapGetters([

        ])
    }
};
