<template>
    <table>
        <tr>
            <th v-for="column in data.columns"><span>{{ column }}</span></th>
        </tr>
        <tr v-for="row in data.rows">
            <td v-for="value in row">{{ value }}</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "Table",
        props: {
            data: Object
        }
    }
</script>

<style scoped>
    table {
        border-collapse: collapse;
        border-radius: 5px;
    }

    table, th, td {
        border: 1px solid #ddd;
        padding: 7px;
    }

    tr {
        cursor: pointer;
    }

    tr:nth-child(even){
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }

    th {
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #FAFAFC;
    }
    th > span {
        border-bottom: 2px solid #f4505d;
    }
</style>