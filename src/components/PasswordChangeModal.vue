<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <form class="modal-body" @submit.prevent="changePassword">
                        <p>Please enter your new password below:</p>
                        <input required class="input-filed" type="password" placeholder="Enter new password"/>
                        <input required class="input-filed" type="password" placeholder="Repeat new password"/>
                        <div class="modal-buttons">
                            <input class="modal-default-button" type="submit" value="Change"/>
                            <input @click.prevent="$emit('close')" class="modal-default-button" type="button" value="Cancel"/>
                        </div>
                    </form>
                    <ErrorBox v-if="showError" :text="errorText"/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import ErrorBox from "./ErrorBox";
    export default {
        name: "PasswordChangeModal",
        components: {ErrorBox},
        data: function () {
            return {
                showError: false,
                errorText: "The given passwords do not match."
            }
        },
        methods: {
            changePassword: function (event) {
                if (event.target[0].value !== event.target[1].value) {
                    this.showError = true;
                    return;
                }
                let result = this.$store.dispatch("auth/changePassword", event.target[0].value);
                if (result.error) {
                    this.$emit("error")
                } else {
                    this.$emit("success")
                }
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: fit-content;
        min-width: 300px;
        margin: 0px auto;
        padding: 30px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    .modal-body {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
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

    .modal-buttons {
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .modal-default-button {
        margin-left: 5px;
        margin-right: 5px;
        background: #f4505d;
        border: none;
        padding: 8px 15px;
        color: #fff;
        box-shadow: 1px 1px 4px #DADADA;
        border-radius: 5px;
        cursor: pointer;
    }

    .modal-default-button:hover {
        background: #ee3141;
    }

    .modal-default-button[type=submit] {
        background: #00c43f;
    }

    .modal-default-button[type=submit]:hover {
        background: #00ae36;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>