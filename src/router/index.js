import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Users from "../views/Users";
import Syncs from "../views/Syncs";
import ApiKeys from "../views/ApiKeys";
import ApiUsers from "../views/ApiUsers";
import UserDetails from "../views/UserDetails";
import SyncDetails from "../views/SyncDetails";
import ApiKeyDetails from "../views/ApiKeyDetails";
import ApiUserDetails from "../views/ApiUserDetails";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: "/users",
        name: "Users",
        component: Users
    },
    {
        path: "/users/:id",
        name: "UserDetails",
        component: UserDetails,
        props: true
    },
    {
        path: "/syncs",
        name: "Syncs",
        component: Syncs
    },
    {
        path: "/syncs/:id",
        name: "SyncDetails",
        component: SyncDetails,
        props: true
    },
    {
        path: "/api-keys",
        name: "ApiKeys",
        component: ApiKeys
    },
    {
        path: "/api-keys/:id",
        name: "ApiKeyDetails",
        component: ApiKeyDetails,
        props: true
    },
    {
        path: "/api-users",
        name: "ApiUsers",
        component: ApiUsers
    },
    {
        path: "/api-user/:id",
        name: "ApiUserDetails",
        component: ApiUserDetails,
        props: true
    }
]

const router = new VueRouter({
    routes
});

export default router;
