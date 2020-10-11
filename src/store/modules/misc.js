import {mapGetters} from "vuex";
import axios from "axios";
export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        getDashboard: async function (context) {
            try {
                let result = await axios.get("/api/dashboard");
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