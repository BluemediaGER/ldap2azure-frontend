<template>
    <div>
        <div class="wrapper">
            <div class="dropdown">
                <div class="trigger-drop-wrapper">
                    <a class="trigger-drop">{{ username }}</a>
                    <i class="arrow"></i>
                </div>
                <div class="drop">
                    <a @click.prevent="$emit('changePassword')">Change Password</a>
                    <a @click.prevent="$emit('logout')">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AccountDropdown",
        props: {
            username: String
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
    .trigger-drop-wrapper {
        display: flex;
    }
    .trigger-drop {
        font-size: 18px;
        color: #323336;
        border: none;
    }
    .arrow {
        display: block;
        width: 8px;
        height: 8px;
        left: 50%; top: 50%;
        margin-top: 10px;
        margin-left: 15px;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        border-bottom-color: #323336;
        border-right-color: #323336;

        transform: translate(-50%, -50%) rotate(45deg);
    }
    .drop {
        display: none;
        position: absolute;
        top: 70px;
        right: 0;
        background-color: #FAFAFC;
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