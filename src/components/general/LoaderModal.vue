<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <Loader class="modal-loader"/>
                    <p class="modal-body">
                        {{ body }}
                    </p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Loader from "@/components/general/Loader";
    export default {
        name: "LoaderModal",
        components: {Loader},
        props: {
            body: String
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
        padding: 50px;
        background-color: #FAFAFC;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    .modal-loader {
        width: 100px;
        height: 100px;
    }

    .modal-body {
        margin-bottom: 0;
        margin-top: 40px;
        font-family: 'Poppins', sans-serif;
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
