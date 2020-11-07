<template>
    <div id="navbar">
        <img class="logo" alt="ldap2azure Logo" src="@/assets/logo.png">
        <div class="nav-menu">
            <router-link :to="'/dashboard'">Dashboard</router-link>
            <router-link :to="'/users'">Users</router-link>
            <router-link :to="'/syncs'">Syncs</router-link>
            <router-link exact :to="'/'">API Credentials</router-link>
        </div>
        <span class="spacer"></span>
        <AccountDropdown
            class="dropdown"
            :username="$store.getters['auth/getUsername']"
            @changePassword="showPasswordChangeModal = true"
            @logout="logout"
        />
        <PasswordChangeModal
            v-if="showPasswordChangeModal"
            @close="showPasswordChangeModal = false"
            @success="passwordOk"
            @error="passwordError"
        />
        <ChoiceModal
            v-if="showPasswordInfoModal"
            :body="passwordInfoModalBody"
            :choices="[{text: 'OK', eventName: 'close'}]"
            @close="showPasswordInfoModal = false"
        />
    </div>
</template>

<script>
    import AccountDropdown from "./AccountDropdown";
    import PasswordChangeModal from "./PasswordChangeModal";
    import ChoiceModal from "../general/ChoiceModal";
    export default {
        name: "Navbar",
        components: {
            AccountDropdown,
            PasswordChangeModal,
            ChoiceModal
        },
        data: function () {
            return {
                showPasswordChangeModal : false,
                showPasswordInfoModal: false,
                passwordInfoModalBody: ""
            }
        },
        methods: {
            logout: async function () {
                await this.$store.dispatch("auth/logout");
                await this.$router.replace("/");
            },
            passwordOk: function () {
                this.showPasswordChangeModal = false;
                this.passwordInfoModalBody = "Your password was changed successfully.";
                this.showPasswordInfoModal = true;
            },
            passwordError: function () {
                this.showPasswordChangeModal = false;
                this.passwordInfoModalBody = "An error occurred while changing your password. Please try again.";
                this.showPasswordInfoModal = true;
            }
        }
    }
</script>

<style scoped>
    #navbar {
        height: 70px;
        display: flex;
        justify-content: left;
        flex-wrap: nowrap;
        overflow: hidden;
        background-color: #FAFAFC;
        box-shadow: 0 1px 6px 0 #888888;
    }

    .logo {
        height: 70%;
        margin-left: 40px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    .nav-menu {
        display: flex;
        padding-left: 40px;
        align-items: center;
    }

    .nav-menu > a {
        color: #323336;
        font-size: 18px;
        margin: 0 8px;
        text-decoration: none;
        cursor: pointer;
        background-image: linear-gradient( transparent 2px, #f4505d 2px, #f4505d 4px, transparent 4px ), linear-gradient( transparent 2px, #d8dce9 2px, #d8dce9 4px, transparent 4px );
        background-size: 0 6px, 100% 6px;
        background-position: 0 bottom, 0 bottom;
        transition: background-size 0.3s ease-in-out;
        background-repeat: no-repeat;
        padding-bottom: 4px;
    }
    .nav-menu > a:hover {
        background-size: 100% 6px;
    }
    @supports (-ms-ime-align:auto) {
        .nav-menu > a,.nav-menu > a:visited {
            background-image: linear-gradient(#f4505d, #f4505d), linear-gradient(#d8dce9, #d8dce9);
            background-size: 0 2px, 100% 2px;
            padding-bottom: 2px;
        }
        .nav-menu > a:hover {
            background-size: 100% 2px;
        }
    }
    .nav-menu > a.router-link-active {
        color: #f4505d;
        background-size: 100% 6px;
    }

    .spacer {
        flex-grow: 2;
    }
    .dropdown {
        margin-right: 40px;
    }
</style>
