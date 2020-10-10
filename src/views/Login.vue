<template>
    <div class="login">
        <LogoText class="brand"/>
        <LoginForm class="form"/>
    </div>
</template>

<script>
    import LogoText from "../components/LogoText";
    import LoginForm from "../components/LoginForm";
    export default {
        name: "Login",
        components: {
            LoginForm,
            LogoText
        }
    }
</script>

<style scoped>
    .login {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .brand {
        margin-top: 5%;
    }
    .form {
        margin-top: 60px;
    }
</style>