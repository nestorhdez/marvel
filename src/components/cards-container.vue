<template>
  <div id="cards-container" :class="{'no-scroll' : states.loading}">
    <Message :states="states" :styles="{height: 'calc(100vh - 120px)', top: '70px'}"/>
    <Card :comic="comic" v-for="(comic, i) in comics" :key="`c-${i}`"/>
  </div>
</template>

<script>
import Card from './card';
import axios from 'axios';
import Message from '../components/message'

export default {
  name: 'cards-container',
  data() {
    return {
      comics: [],
      states: {
        loading: false,
        error: false,
        noResult: false
      }
    }
  },
  props: {
    url: String
  },
  components: {
    Card,
    Message
  },
  watch: {
    url(){
      this.getComics();
    },
    comics: {
      handler() {
        this.comics.length == 0 ? this.states.noResult = true : this.states.noResult = false;
      },
      deep: true
    }
  },
  methods: {
    getComics() {
      this.states.error = false;
      this.states.loading = true;
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
          this.states.loading = false;
          this.$emit('total', res.data.data.total);
        })
        .catch(err => {
          this.states.loading = false;
          this.states.error = true;
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
</style>
