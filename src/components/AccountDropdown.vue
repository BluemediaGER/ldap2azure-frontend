<template>
    <div>
        <div class="wrapper">
            <div class="dropdown">
                <a class="trigger-drop">{{ username }}<i class="arrow"></i></a>
                <div class="drop">
                    <a @click.prevent="showPasswordChangeModal = true">Change password</a>
                    <a @click.prevent="logout">Logout</a>
                </div>
            </div>
        </div>
        <ChoiceModal
            v-if="showPasswordInfoModal"
            :body="passwordInfoModalBody"
            :choices="[{text: 'OK', eventName: 'close'}]"
            @close="showPasswordInfoModal === false"
        />
    </div>
</template>

<script>
    import ChoiceModal from "./ChoiceModal";
    export default {
        name: "AccountDropdown",
        components: {ChoiceModal},
        props: {
            username: String
        },
        data: function () {
            return {
                showPasswordChangeModal : false,
                showPasswordInfoModal: false,
                passwordInfoModalBody: "Your password was changed successfully."
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch("auth/logout");
                this.$router.replace("/");
            },
            changePassword: function (password) {

            }
        }
    }
</script>

<style scoped>
    .dropdown {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        cursor: pointer;
    }
    .trigger-drop {
        font-size: 18px;
        color: #323336;
        border: none;
    }
    .drop {
        display: none;
        position: absolute;
        top: 70px;
        right: 0;
        background-color: #f1f1f1;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
    .drop a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .drop a:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .drop {display: block;}
</style>