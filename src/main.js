import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"

axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    beforeCreate() { this.$store.dispatch("misc/initLocalStorage");},
    render: h => h(App)
}).$mount('#app')
