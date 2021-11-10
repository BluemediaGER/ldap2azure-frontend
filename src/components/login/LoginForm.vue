<template>
    <div class="wrapper">
        <form @submit.prevent="login">
            <h4>Login</h4>
            <input required class="input-filed" type="text" placeholder="Enter Username"/>
            <input required class="input-filed" type="password" placeholder="Enter Password"/>
            <input type="submit" value="Log in"/>
        </form>
        <ErrorBox v-if="showError" class="error" :text="errorText"/>
    </div>
</template>

<script>
    import ErrorBox from "../general/ErrorBox";

    export default {
        name: "LoginForm",
        props: {
            redirectUrl: String
        },
        components: {
            ErrorBox
        },
        data: function () {
            return {
                showError: false,
                errorText: ""
            }
        },
        methods: {
            login: async function (event) {
                let response  = await this.$store.dispatch("auth/login", {
                    username: event.target[0].value,
                    password: event.target[1].value
                });
                if (response.error) {
                    if (response.code === 401) {
                        this.errorText = "The entered credentials are invalid.";
                    } else {
                        this.errorText = "An internal error occurred.";
                    }
                    this.showError = true;
                    event.target[1].value = "";
                    return;
                }
                if (this.redirectUrl) {
                    await this.$router.replace(this.redirectUrl);
                    return;
                }
                await this.$router.replace("/dashboard");
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 360px;
        height: 250px;
        margin: 20px auto;
        background: #FAFAFC;
        padding: 30px;
        box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.20);
        border-radius: 5px;
    }

    h4 {
        font-size: 2em;
        font-weight: 300;
        margin-top: 0;
        margin-bottom: 20px;
        color: #323336;
        text-shadow: 1px 1px 0px white;
    }

    input {
        font-family: 'Poppins', sans-serif;
        height: 40px;
        margin-top: 10px;
        box-sizing: border-box;
        border: none;
        border-bottom: 3px solid #d8dce9;
        box-shadow: 1px 1px 10px #EBEBEB;
        border-radius: 5px;
        padding: 7px;
        outline: none;
    }

    .input-filed:focus {
        border: none;
        border-bottom: 3px solid #f4505d;
    }

    input[type=submit] {
        border: none;
        padding: 8px 15px;
        margin-top: 10px;
        background: #f4505d;
        color: #fff;
        box-shadow: 1px 1px 4px #DADADA;
        border-radius: 5px;
    }

    input[type=submit]:hover {
        background: #ee3141;
        color: #fff;
    }

    .error {
        width: 420px;
    }
</style>
