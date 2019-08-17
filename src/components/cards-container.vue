<template>
  <div id="cards-container" :class="{'no-scroll' : loading}">
    <div v-if="loading || error" id="loading">
      <h2>{{error ? 'Sorry, something wrong happend.' : 'Loading...'}}</h2>
    </div>
    <Card :comic="comic" v-for="(comic, i) in comics" :key="`c-${i}`"/>
  </div>
</template>

<script>
import Card from './card';
import axios from 'axios';

export default {
  name: 'cards-container',
  data() {
    return {
      comics: [],
      loading: false,
      error: false
    }
  },
  props: {
    url: String
  },
  components: {
    Card
  },
  watch: {
    url(){
      this.getComics();
    }
  },
  methods: {
    getComics() {
      this.loading = true;
      axios.get(this.url)
        .then(res => {
          this.comics = res.data.data.results.map(comic => {
            let thumb = comic.thumbnail.path + '.' + comic.thumbnail.extension;
            return {
              id: comic.id,
              title: comic.title,
              thumbnail: thumb,
              date: comic.dates[0].date
            }
          });
          this.loading = false;
          this.$emit('total', res.data.data.total);
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
          console.log({err});
        });
    }
  },
  created() {
    this.getComics();
  }
}
</script>

<style scoped>
  #cards-container {
    display: flex;
    flex-wrap: wrap;
    padding: 50px;
    color: #2c3e50;
    margin-bottom: 20px;
    width: 90%;
    margin: 0 auto 20px;
  }
  .no-scroll {
    height: calc(100vh - 90px);
    overflow: hidden;
  }
  #loading {
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    z-index: 1;
    height: calc(100vh - 120px);
  }
</style>
