<template>
    <div class="card">
        <p class="text">{{ text }}</p>
    </div>
</template>

<script>
export default {
    name: "ErrorBox",
    props: {
        text: String
    }
}
</script>

<style scoped>
    .card {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ff6b00;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.20);
    }
    .text {
        color: white;
        background: #ff6b00;
        font-size: 13px;
    }
</style>