<template>
    <div class="wrapper">
        <img class="logo" alt="ldap2azure Logo" src="@/assets/logo.png">
        <span class="name">Ldap2Azure</span>
    </div>
</template>

<script>
    export default {
        name: "LogoText"
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
    }
    .logo{
        height: 120px;
    }
    .name {
        color: #323336;
        font-size: 50px;
    }
</style>