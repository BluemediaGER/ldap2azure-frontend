<template>
    <div class="warning">
        <img id="warning" src="@/assets/icons/warning-sign.svg">
        <p>Your browser does not seem to support Local Storage, which may lead to display errors. Please use an up-to-date browser and enable Local Storage.</p>
        <span class="spacer"></span>
        <img @click="$emit('close')" id="close" src="@/assets/icons/close.svg">
    </div>
</template>

<script>
export default {
name: "StorageWarningModal"
}
</script>

<style scoped>
    .warning {
        background: #ff6b00;
        height: 60px;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .warning > span, .warning > p {
        color: white;
        font-family: 'Poppins', sans-serif;
    }
    #warning {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        margin-right: 5px;
    }
    .spacer {
        flex-grow: 2;
    }
    #close {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        cursor: pointer;
    }
</style>