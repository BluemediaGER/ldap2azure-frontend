<template>
    <div class="login">
        <LogoText class="brand"/>
        <LoginForm class="form"/>
    </div>
</template>

<script>
    import LogoText from "../components/login/LogoText";
    import LoginForm from "../components/login/LoginForm";
    export default {
        name: "Login",
        components: {
            LoginForm,
            LogoText
        },
        created() {
            if (this.$store.getters["auth/getLoginState"]) this.$router.replace("/dashboard");
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
