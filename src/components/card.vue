<template>
    <div class="card" >
        <div class="img" :style="[comic.thumbnail ? {'background-image': `url(${comic.thumbnail})`} : {'background': '#FFF'}]"></div>
        <div class="card-overlay">
            <span class="title">{{comic.title}}</span>
        </div>
    </div>
</template>

<script> 
    export default {
        name: 'card',
        props: {
            comic: {
                id: Number,
                title: String,
                thumbnail: String
            }
        }
    }
</script>

<style scoped>
    .card {
        width: 200px;
        height: 240px;
        margin: 10px;
        position: relative;
    }
    .img {
        background-color: transparent;
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        transform: scale(1);
        transition-duration: .5s;
    }
    .card-overlay {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        padding: 15px;
        transition-duration: .5s;
    }
    .card-overlay:hover {
        opacity: 1;
    }
    .title {
        color: white;
        margin: 0 auto;
    }
</style>