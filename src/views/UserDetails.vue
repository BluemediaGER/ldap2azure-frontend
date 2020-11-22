<template>
    <div class="user-details">
        <div v-if="!isLoading && !isError" class="content">
            <div class="actions-card">
                <p>Actions</p>
                <div class="button-wrapper">
                    <button class="red button" :disabled="user.syncState === 'ok' || user.syncState === 'pending'">
                        Retry Sync
                    </button>
                    <button class="second red button" :disabled="user.syncState === 'ok' || user.syncState === 'pending'">
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
</template>

<script>
    import Table from "../components/general/Table";
    export default {
        name: "UserDetails",
        components: {Table},
        props: ['id'],
        data() {
            return {
                error: "",
                isLoading: true,
                isError: false,
                user: {},
                table: {}
            };
        },
        created() {
            this.loadUser();
        },
        methods: {
            loadUser: async function() {
                console.log("load called")
                let result = await this.$store.dispatch("user/getUser", this.id);
                if (result.error) {
                    if (result.code === 401) {
                        await this.$store.dispatch("auth/logout");
                        await this.$router.replace("/");
                        return;
                    } else if (result.code === 404) {
                        this.error = "The user with the specified ID " + this.id + " was not found."
                        this.isLoading = false;
                        this.isError = true;
                        return;
                    }
                }
                this.user = result;
                let content = [];
                for (let property in result) {
                    if (result.hasOwnProperty(property)) {
                        content.push({content: [property, result[property]]});
                    }
                }
                this.table = { columns: ["Property Name", "Value"], rows: content }
                this.isLoading = false;
            }
        }
    }
</script>

<style scoped>
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
    .second.button {
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
