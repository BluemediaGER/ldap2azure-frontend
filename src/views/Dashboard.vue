<template>
    <div>
        <div v-if="isLoading" class="loaderWrapper">
            <Loader />
        </div>
        <div v-if="!isLoading" class="dash">
            <div class="numbers">
                <NumberCard class="number-card"
                            :count="dashboard.userCount" text="Overall Users in Ldap2Azure"
                            @click="pushUserRoute" />
                <NumberCard class="number-card"
                            :count="dashboard.usersFine" color="#00c43f" text="Users in Sync with source LDAP"
                            @click="pushUserRoute('ok')" />
                <NumberCard class="number-card"
                            :count="dashboard.usersPending" color="#ffbc00" text="Pending Users"
                            @click="pushUserRoute('pending')" />
                <NumberCard class="number-card"
                            :count="dashboard.usersFailed" color="#f4505d" text="Failed Users"
                            @click="pushUserRoute('failed')" />
            </div>
            <div class="table-card">
                <p>Latest Syncs to Azure AD</p>
                <Table :data="tableData"/>
            </div>
        </div>
    </div>
</template>

<script>
    import NumberCard from "../components/dashboard/NumberCard";
    import Loader from "../components/general/Loader";
    import Table from "../components/general/Table";
    export default {
        name: 'Dashboard',
        components: {Table, Loader, NumberCard},
        data() {
            return {
                dashboard: {},
                isLoading: true,
                tableData: {}
            }
        },
        methods: {
            loadData: async function () {
                let result = await this.$store.dispatch("misc/getDashboard");
                if (result.error) {
                    await this.$store.dispatch("auth/logout");
                    await this.$router.replace({ path: "/", query: { redirectUrl: "/dashboard"}});
                    return;
                }
                this.dashboard = result;
                this.tableData = { columns: [
                        "Sync Start",
                        "Sync End",
                        "Users Changed",
                        "Users Created",
                        "Users Deleted",
                        "Users Failed"
                    ],
                    rows: []
                };
                this.dashboard.lastSyncs.forEach((sync) => {
                    let row = {
                        content: [
                            sync.syncBegin.replace("T", " "),
                            sync.syncEnd.replace("T", " "),
                            sync.usersChanged,
                            sync.usersCreated,
                            sync.usersDeleted,
                            sync.usersFailed
                        ]
                    };
                    this.tableData.rows.push(row);
                });
                setTimeout(() => this.isLoading = false, 300);
            },
            pushUserRoute: async function(filter) {
                console.log("pushUserRoute triggered");
                if (!filter) {
                    await this.$router.push("/users");
                    return;
                }
                await this.$router.push("/users?filter=" + filter);
            }
        },
        created() {
            this.loadData();
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
    .dash {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 30px;
    }
    .numbers {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .numbers > .number-card {
        margin: 20px;
    }

    .table-card {
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: fit-content;
        margin-top: 30px;
        padding: 15px;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.20);
        background: #FAFAFC;
        border-radius: 5px;
    }
    .table-card > p {
        font-size: 18px;
        margin: 0 0 15px;
    }
</style>
