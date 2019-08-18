<template>
  <div id="detail">
    <Message :states="states"/>
    <div class="img" :style="[comic.thumbnail ? {'background-image': `url(${comic.thumbnail})`} : {'background': '#FFF'}]">
    </div>
    <div class="text">
      <h1>{{comic.title}}</h1>
      <p>{{comic.description}}</p>
      <div id="lists">
        <List :array="comic.creators" :title="'Creators'"/>
        <List :array="comic.characters" :title="'Characters'"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from '../components/message'
import List from '../components/list'

export default {
  name: 'detail',
  components:{
    Message,
    List
  },
  data() {
    return {
      states: {
        loading: true,
        error: false,
      },
      comic: {
        id: this.$route.params.id
      },
      url: 'http://gateway.marvel.com/v1/public/comics/',
      params: '?apikey=bc779a912046b02fea1f9082447b3ade&hash=5706817dfb3ffd7294a5f3702923d497&ts=9'
    }
  },
  watch: {
      '$route' (to, from) {
          this.comic.id = this.$route.params.id
          this.loadById();
      }
  },
  methods: {
    loadById() {
      this.states.error = false;
      this.states.loading = true;
      axios.get(this.urlToUse)
        .then(res => {
          let comic = res.data.data.results[0]
          let thumb = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            this.comic = {
              title: comic.title,
              description: comic.description,
              thumbnail: thumb,
              creators: comic.creators.items.filter((val, i) => i < 4).map(val => val.name),
              characters: comic.characters.items.filter((val, i) => i < 4).map(val => val.name)
            }
            this.states.loading = false;
        })
        .catch(err => {
          this.states.loading = false;
          this.states.error = true;
          console.log(err);
        })
    }
  },
  created() {
    this.loadById();
  },
  computed: {
    urlToUse() {
      return this.url + this.comic.id + this.params;
    }
  }
}
</script>

<style scoped>
  #detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
  }
  .img {
        background-color: rgba(0, 0, 0, .4);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 350px;
        width: 250px;
        box-shadow: 1px 1px 6px 6px rgba(0, 0, 0, 0.4);
  }
  .text {
    margin-top: 50px;
    width: 70%;
  }
  h1 {
    font-size: 1.7rem;
  }
  p {
    margin: 25px 0;
  }
  #lists {
    display: flex;
    justify-content: space-around;
    text-align: left;
  }
  #loading {
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 100%;
  }
</style>