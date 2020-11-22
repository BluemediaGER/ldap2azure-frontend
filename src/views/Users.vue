<template>
    <div class="user-list">
        <SelectMenu
            :options='[
                {value: "all", text: "All Users"},
                {value: "ok", text: "Fine Users"},
                {value: "pending", text: "Pending Users"},
                {value: "failed", text: "Failed Users"}
            ]'
            :default="filter"
            @selected="filterSelected"
        />
        <div class="table-card">
            <div v-if="isLoading" class="loaderWrapper">
                <Loader />
            </div>
            <Table
                v-if="!isLoading"
                :data="tableData"
            />
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
                        "ID",
                        "Display Name",
                        "User Principal Name",
                        "Change State",
                        "Sync State",
                        "Last Changed"
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
                this.isLoading = false;
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
                            user._id,
                            user.displayName,
                            user.userPrincipalName,
                            user.changeState,
                            user.syncState,
                            user.lastChanged.replace("T", " ")
                        ]
                    };
                    this.tableData.rows.push(row);
                });
            },
            onRequestDenied: async function() {
                await this.$store.dispatch("auth/logout");
                await this.$router.replace("/");
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
        padding: 30px;
    }
    .table-card {
        display: flex;
        flex-direction: column;
        height: fit-content;
        min-height: 400px;
        margin-top: 30px;
        padding: 15px;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.20);
        background: #FAFAFC;
        border-radius: 5px;
    }
    .loaderWrapper {
        display: flex;
        height: max-content;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
    }
    .loaderWrapper * {
        max-width: 140px;
    }
</style>
