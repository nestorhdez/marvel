<template>
    <div v-if="array && array.length > 0">
        <h2>{{title}}</h2>
        <ul>
            <li :key="i" v-for="(item, i) in array">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'list',
    props: {
        array: Array,
        title: String
    }
}
</script>