<template>
    <img class="spinner" alt="ldap2azure Logo" src="@/assets/logo.png">
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped>
    .spinner {
        animation: spin 1.5s ease-in-out infinite;
        -webkit-animation: spin 1.5s ease-in-out infinite;
    }
    @keyframes spin {
        to {
            -webkit-transform: rotate(-360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(-360deg);
        }
    }
</style>