<template>
  <div id="detail">
    <div v-if="loading || error" id="loading">
      <h2>{{error ? 'Sorry, something wrong happend.' : 'Loading...'}}</h2>
    </div>
    <div class="img" :style="[comic.thumbnail ? {'background-image': `url(${comic.thumbnail})`} : {'background': '#FFF'}]">

    </div>
    <div class="text">
      <h1>{{comic.title}}</h1>
      <p>{{comic.description}}</p>
      <div id="lists">
        <div v-if="comic.characters.length > 0">
          <h2>Creators</h2>
          <ul>
            <li :key="i" v-for="(creator, i) in comic.creators">
              {{creator}}
            </li>
          </ul>
        </div>
        <div v-if="comic.characters.length > 0">
          <h2>Characters</h2>
          <ul>
            <li :key="i" v-for="(char, i) in comic.characters">
              {{char}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'detail',
  data() {
    return {
      loading: true,
      error: false,
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
      this.loading = true;
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
            this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
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
        background-color: transparent;
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