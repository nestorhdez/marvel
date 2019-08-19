<template>
    <div id="search-container">
      <input @keyup.enter="$emit('search', input)" v-model="input" id="search-input" type="text" placeholder="Search a comic...">
      <button @click="$emit('search', input)" id="search-btn">Search</button>
    </div>
</template>

<script>
export default {
    name: 'search-container',
    data() {
       return {
           input: ''
       } 
    }
}
</script>
<style scoped>
#search-container {
  margin: 20px 0;
}
#search-input {
  width: 370px;
  height: 30px;
  margin-right: 15px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid #d7d5d5;
}
#search-btn {
  width: 90px;
  height: 30px;
  border-radius: 10px;
  border-color: #d7d5d5;
  background-color: white;
}
</style>