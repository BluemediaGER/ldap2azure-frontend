<template>
    <div class="card" @click="$emit('click')">
        <p class="number" :style="{color: color}">{{ count }}</p>
        <p class="description">{{ text }}</p>
    </div>
</template>

<script>
    export default {
        name: "NumberCard",
        props: {
            count: {
                default: 0,
                type: Number
            },
            text: {
                default: "",
                type: String
            },
            color: {
                default: "#323336",
                type: String
            }
        }
    }
</script>

<style scoped>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: fit-content;
        min-height: 200px;
        max-height: 400px;
        padding: 5px;
        box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.20);
        background: #FAFAFC;
        border-radius: 5px;
        cursor: pointer;
    }
    .number {
        font-size: 60px;
        margin: 0;
    }
    .description {
        font-size: 18px;
        margin-bottom: 0;
    }
</style>
