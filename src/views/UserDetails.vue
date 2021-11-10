<template>
    <div>
        <div v-if="isLoading" class="loaderWrapper">
            <Loader />
        </div>
        <div class="user-details">
            <LoaderModal v-if="showLoadingModal" :body="loadingModalText" />
            <ChoiceModal v-if="showChoiceModal"
                         :body="choiceModalText"
                         :choices="choiceModalData"
                         @close="showChoiceModal = false" />
            <div v-if="!isLoading && !isError" class="content">
                <div class="actions-card">
                    <p>Actions</p>
                    <div class="button-wrapper">
                        <button v-on:click="retrySync"
                                class="red button"
                                :disabled="user.syncState === 'ok' ||
                                user.syncState === 'pending' ||
                                $store.getters['auth/getPermission'] === 'read'">
                            Retry Sync
                        </button>
                        <button class="red button"
                                :disabled="user.syncState === 'ok' ||
                                user.syncState === 'pending' ||
                                $store.getters['auth/getPermission'] === 'read'">
                            Solve Sync Conflict
                        </button>
                    </div>
                </div>
                <div class="properties-card">
                    <Table
                        :data="table"
                    />
                </div>
            </div>
            <div v-if="!isLoading && isError" class="error-message">
                <p>{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Table from "../components/general/Table";
    import LoaderModal from "@/components/general/LoaderModal";
    import ChoiceModal from "@/components/general/ChoiceModal";
    import Loader from "@/components/general/Loader";
    export default {
        name: "UserDetails",
        components: {Loader, ChoiceModal, LoaderModal, Table},
        props: ['id'],
        data() {
            return {
                error: "",
                loadingModalText: "",
                showLoadingModal: false,
                choiceModalText: "",
                choiceModalData: [],
                showChoiceModal: false,
                isLoading: true,
                isError: false,
                user: {},
                table: {},

            };
        },
        created() {
            this.loadUser();
        },
        methods: {
            loadUser: async function() {
                let result = await this.$store.dispatch("user/getUser", this.id);
                if (result.error) {
                    if (result.code === 401) {
                        await this.$store.dispatch("auth/logout");
                        await this.$router.replace({ path: "/", query: { redirectUrl: "/users/" + this.id}});
                        return;
                    } else if (result.code === 404) {
                        this.error = "The user with the specified ID " + this.id + " was not found."
                        setTimeout(() => this.isLoading = false, 300);
                        this.isError = true;
                        return;
                    }
                }
                this.updateUser(result);
                setTimeout(() => this.isLoading = false, 300);
            },
            updateUser(user) {
                this.user = user;
                let content = [];
                for (let property in user) {
                    if (user.hasOwnProperty(property)) {
                        content.push({content: [property, user[property]]});
                    }
                }
                this.table = { columns: ["Property Name", "Value"], rows: content }
            },
            retrySync: async function() {
                this.loadingModalText = "Trying to resync " + this.user.userPrincipalName + " to Azure AD..."
                this.showLoadingModal = true;
                let result = await this.$store.dispatch("user/retryUserSync", this.id);
                if (result.code === 401) {
                    await this.$store.dispatch("auth/logout");
                    await this.$router.replace({ path: "/", query: { redirectUrl: "/users/" + this.id}});
                    return;
                } else if (result.code === 500) {
                    this.choiceModalText = "The resync failed. The reported reason was:\n" + result.data.message;
                    this.choiceModalData = [{color: "#ee3141", eventName: "close", text: "Close"}];
                    setTimeout(() => {
                        this.showLoadingModal = false;
                        this.showChoiceModal = true;
                    }, 500);
                    return;
                }
                this.choiceModalText = "The resync was successful. The user was updated in Azure AD.";
                this.choiceModalData = [{color: "#00c43f", eventName: "close", text: "Close"}];
                setTimeout(() => {
                    this.showLoadingModal = false;
                    this.showChoiceModal = true;
                    }, 500);
                this.updateUser(result);
            }
        }
    }
</script>

<style scoped>
    .loaderWrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .loaderWrapper * {
        max-width: 140px;
    }
    .user-details {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }
    .content {
        display: flex;
        flex-direction: column;
    }
    .properties-card {
        display: flex;
        height: fit-content;
        padding: 15px;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.20);
        background: #FAFAFC;
        border-radius: 5px;
    }
    .actions-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: fit-content;
        margin-bottom: 15px;
        padding: 15px;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.20);
        background: #FAFAFC;
        border-radius: 5px;
    }
    .actions-card > p {
        margin-top: 0;
        font-weight: bold;
        border-bottom: 2px solid #f4505d;
        width: fit-content;
    }
    .button-wrapper {
        width: 100%;
        display: flex;
    }
    .button-wrapper:nth-child(1) {
        margin-left: 10px;
    }
    .red {
        background: #f4505d;
    }
    .button {
        width: 100%;
        border: none;
        padding: 8px 15px;
        background: #f4505d;
        color: #fff;
        box-shadow: 1px 1px 4px #DADADA;
        border-radius: 5px;
    }
    .button:hover {
        background: #ee3141;
        color: #fff;
    }
    .button:disabled {
        background: #999999;
    }
</style>
