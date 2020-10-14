<template>
    <div id="app">
        <StorageWarningBanner v-if="showStorageWarning" @close="showStorageWarning = false"/>
        <Navbar v-if="$route.name !== 'Login'"/>
        <router-view/>
    </div>
</template>

<script>
    import Navbar from "./components/navbar/Navbar";
    import StorageWarningBanner from "./components/general/StorageWarningBanner";
    export default {
        name: 'App',
        components: {
            StorageWarningBanner,
            Navbar
        },
        data() {
            return {
                apiAckTimer: null,
                showStorageWarning: false
            }
        },
        created() {
            // Init ack timer on page load if login state is true
            if (this.$store.getters["auth/getLoginState"]) {
                this.apiAckTimer = setInterval(() => this.$store.dispatch("auth/ack"), 300000);
            }
            // Watch for login state changes and start / stop ack timer accordingly
            this.unwatch = this.$store.watch((state) => state.auth.loggedIn, (newValue) => {
                if (newValue) {
                    this.apiAckTimer = setInterval(() => this.$store.dispatch("auth/ack"), 300000);
                } else {
                    clearInterval(this.apiAckTimer);
                }
            });
            // Check if localStorage is supported and display warning if not
            this.showStorageWarning = !this.$store.getters["misc/hasLocalStorageSupport"];
        },
        beforeDestroy() {
            this.unwatch();
        }
    }
</script>

<style>
    body {
        margin: 0;
    }
    #app {
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
