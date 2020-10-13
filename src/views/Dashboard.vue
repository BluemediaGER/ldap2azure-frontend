<template>
    <div>
        <div v-if="isLoading" class="loaderWrapper">
            <Loader />
        </div>
        <div v-if="!isLoading" class="dash">
            <div class="numbers">
                <NumberCard class="number-card"
                            :count="dashboard.userCount" text="Overall Users in ldap2azure" />
                <NumberCard class="number-card"
                            :count="dashboard.usersFine" color="#00c43f" text="Users in Sync with source LDAP" />
                <NumberCard class="number-card"
                            :count="dashboard.usersPending" color="#ffbc00" text="Pending Users" />
                <NumberCard class="number-card"
                            :count="dashboard.usersFailed" color="#f4505d" text="Failed Users" />
            </div>
        </div>
    </div>
</template>

<script>
    import NumberCard from "../components/dashboard/NumberCard";
    import Loader from "../components/Loader";
    export default {
        name: 'Dashboard',
        components: {Loader, NumberCard},
        data() {
            return {
                dashboard: {},
                isLoading: true
            }
        },
        methods: {
            loadData: async function () {
                let result = await this.$store.dispatch("misc/getDashboard");
                if (result.error) {
                    await this.$store.dispatch("auth/reset");
                    await this.$router.replace("/");
                }
                this.dashboard = result;
                this.isLoading = false;
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
        flex-direction: column;
        height: fit-content;
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
</style>