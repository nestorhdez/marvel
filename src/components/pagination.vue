<template>
    <div id="pages-container">
        <ul>
            <button class="prev" v-if="pages.totalPages > limit" @click="changeSet">prev</button>
            <li :class="{'selected': pages.current == i}" :key="`pag-${i}`" v-for="(pag, i) in pages.set">
                <button :id="i" @click="sendCurrentPage">{{pag}}</button>
            </li>
            <button class="next" v-if="pages.totalPages > limit" @click="changeSet">next</button>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        total: Number,
        limit: Number
    },
    data(){
        return {
            pages: {
                totalPages: 0,
                set: [],
                current: 0
            }
        }
    },
    watch: {
        total() {
            this.pages.totalPages = Math.ceil(this.total / this.limit);
            this.changeSet();
        }
    },
    methods: {
        sendCurrentPage(e) {
            this.pages.current = +e.target.id;
            this.$emit('page', e.target.innerText)
        },
        changeSet(e) {
            if(this.pages.set.length == 0){
                for(let i = 1; i <= this.limit; i++) {
                    if(i <= this.pages.totalPages){
                        this.pages.set.push(i)
                    }else{
                        break;
                    } 
                }
            }else if(e.target.innerText == 'prev' && this.pages.set[0] > 1) {
                this.pages.set = this.pages.set.map(pag => pag - 5)
                this.pages.current = 0;
                this.$emit('page', this.pages.set[0])
            }else if(e.target.innerText == 'next'){
                this.pages.set = this.pages.set.filter(val => val + 5 <= this.pages.totalPages).map(val => val + 5)
                this.pages.current = 0;
                this.$emit('page', this.pages.set[0])
            }
        }
    }
}
</script>

<style scoped>
    #pages-container {
        background-color: white;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0;
        width: 100%;
        color: black
    }
    ul {
        width: 35%;
        display: flex;
        justify-content: center;
    }
    li {
        list-style: none;
        margin: 0 10px;
    }
    .selected button{
        color: white;
        background-color: #2c3e50;
    }
    button {
        border: none;
        margin: none;
        background: none;
        cursor: pointer;
        padding: 10px;
    }
    .prev {
        margin-right: auto;
    }
    .next {
        margin-left: auto;
    }
</style>