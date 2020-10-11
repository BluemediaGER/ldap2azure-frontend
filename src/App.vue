<template>
    <div id="app">
        <Navbar v-if="$route.name !== 'Login'"/>
        <router-view/>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    export default {
        name: 'App',
        components: {
            Navbar
        },
        data() {
            return {
                apiAckTimer: null
            }
        },
        created() {
            this.unwatch = this.$store.watch((state) => state.auth.loggedIn, (newValue) => {
                if (newValue) {
                    this.apiAckTimer = setInterval(() => this.$store.dispatch("auth/ack"), 300000);
                } else {
                    clearInterval(this.apiAckTimer);
                }
            });
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
