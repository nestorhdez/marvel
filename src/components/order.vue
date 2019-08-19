<template>
    <select id="order" @change="emitOrder">
        <option :value="option.apiName" v-for="(option, i) in options" :key="i">{{option.html}}</option>
    </select>
</template>

<script>
export default {
    name: 'order',
    props: {
        options: Array
    },
    methods: {
        emitOrder( e = { target: { value: this.options[0].apiName } } ) {
            this.$emit('order', e.target.value)
        }
    },
    created() {
        this.emitOrder()
    }
}
</script>

<style scoped>
    #order {
        width: 120px;
        height: 20px;
    }
</style>