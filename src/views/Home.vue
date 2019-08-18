<template>
  <div class="home">
    <h1>Marvel Comics</h1>
    <Search @search="setUrl" />
    <CardsContainer :url="urlToUse" @total="setTotal"/>
    <Pagination @page="setPage" :limit="5" :total="totalResult"/>
  </div>
</template>

<script>
import Search from '@/components/search.vue'
import CardsContainer from '@/components/cards-container.vue'
import Pagination from '@/components/pagination'

export default {
  name: 'home',
  data() {
    return {
      pages: {
        total: 0,
        currentPage: 1
      },
      url: {
        urlBase: 'http://gateway.marvel.com/v1/public/comics?apikey=bc779a912046b02fea1f9082447b3ade&hash=5706817dfb3ffd7294a5f3702923d497&ts=9&limit=10',
        search: '' 
      }
    }
  },
  components: {
    Search,
    CardsContainer,
    Pagination
  },
  computed:{
    urlToUse() {
     return `${this.url.urlBase}&offset=${this.pages.currentPage * 10}${this.url.search != '' ? `&titleStartsWith=${this.url.search}` : ''}`;
    },
    totalResult() {
      return this.pages.total;
    }
  },
  methods: {
    setTotal(totalSearch) {
      this.pages.total = totalSearch;
    },
    setPage(page) {
      this.pages.currentPage = page;
    },
    setUrl(search) {
      this.url.search = search;
    }
  }
}
</script>
<style scoped>
  .home {
    position: relative;
  }
  h1 {
    margin-top: 30px;
  }
</style>