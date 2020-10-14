<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-body">
                        {{ body }}
                    </div>

                    <div class="modal-buttons">
                        <button
                            v-for="choice in choices"
                            :style="{ background: choice.color ? choice.color : '#4ec0ec'}"
                            class="modal-default-button" @click="$emit(choice.eventName)"
                        >
                            {{ choice.text }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ChoiceModal",
        props: {
            body: String,
            choices: Array
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: fit-content;
        min-width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-buttons {
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .modal-default-button {
        margin-left: 5px;
        margin-right: 5px;

        border: none;
        padding: 8px 15px;
        color: #fff;
        box-shadow: 1px 1px 4px #DADADA;
        border-radius: 5px;
        cursor: pointer;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>