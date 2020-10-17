<template>
    <table>
        <tr>
            <th v-for="column in data.columns">{{ column }}</th>
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
        background-color: #485563;
        color: #f9f9f9;
    }
</style>