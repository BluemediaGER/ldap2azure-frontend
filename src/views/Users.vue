<template>
    <div>
        <div v-if="isLoading" class="loaderWrapper">
            <Loader />
        </div>
        <div class="user-list">
            <div v-if="!isLoading" class="table-wrapper">
                <div class="select-menu-wrapper">
                    <SelectMenu
                        class="select-menu"
                        :options='[
                            {value: "all", text: "All Users"},
                            {value: "ok", text: "Fine Users"},
                            {value: "pending", text: "Pending Users"},
                            {value: "failed", text: "Failed Users"}
                        ]'
                        :default="filter"
                        @selected="filterSelected"
                    />
                </div>
                <Table
                    v-if="tableData.rows.length > 0"
                    class="table"
                    :data="tableData"
                />
                <div v-if="tableData.rows.length === 0" class="empty-state">
                        <img class="none-icon" src="@/assets/icons/user.svg">
                        <span>There is nothing to see here.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SelectMenu from "../components/general/SelectMenu";
    import Table from "../components/general/Table";
    import Loader from "../components/general/Loader";
    export default {
        name: "Users",
        components: {Loader, Table, SelectMenu},
        data() {
            return {
                isLoading: true,
                filter: "all",
                currentPage: 0,
                tableData: {
                    columns: [
                        "Display Name",
                        "User Principal Name",
                        "Sync State",
                    ],
                    rows: []
                }
            }
        },
        methods: {
            filterSelected(filter) {
                if (filter !== "all") {
                    this.$router.push({path: "users", query: { filter }});
                } else {
                    this.$router.push({path: "users"});
                }
                this.filter = filter;
                this.loadFirst();
            },
            loadFirst: async function() {
                this.isLoading = true;
                let result = await this.$store.dispatch("user/getUserList", this.filter);
                if (result.error) await this.onRequestDenied();
                this.tableData.rows = [];
                this.addTableData(result);
                setTimeout(() => this.isLoading = false, 300);
            },
            loadNext: async function() {
                let result = await this.$store.dispatch("user/getDashboard", this.filter, this.currentPage++);
                if (result.error) await this.onRequestDenied();

            },
            addTableData(response) {
                console.log(response)
                response.forEach(user => {
                    let row = {
                        route: "/users/" + user._id,
                        content: [
                            user.displayName,
                            user.userPrincipalName,
                            user.syncState.charAt(0).toUpperCase() + user.syncState.slice(1)
                        ]
                    };
                    this.tableData.rows.push(row);
                });
            },
            onRequestDenied: async function() {
                await this.$store.dispatch("auth/logout");
                await this.$router.replace({ path: "/", query: { redirectUrl: "/users"}});
            }
        },
        created() {
            if (this.$route.query.filter) {
                this.filter = this.$route.query.filter;
            }
            this.loadFirst();
        }
    }
</script>

<style scoped>
    .user-list {
        width: 100%;
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
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
    .table-wrapper {
        width: 75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .select-menu-wrapper {
        width: 100%;
        display: flex;
        align-items: flex-start;
    }
    .select-menu {
        margin-bottom: 30px;
    }
    .table {
        width: 100%;
    }
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #323336;
        font-size: 20px;
    }
    .empty-state > img {
        width: 100px;
        fill: #323336;
        margin-bottom: 10px;
    }
</style>
