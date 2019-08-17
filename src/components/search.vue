<template>
    <div id="search-container">
      <input id="search-input" type="text" placeholder="Search any comic, character...">
      <button id="search-btn">Search</button>
    </div>
</template>

<script>
export default {
    name: 'search-container',
    data() {
       return {
           
       } 
    }
}
</script>
<style scoped>
#search-container {
  padding: 20px 0;
}
#search-input {
  width: 60%;
  height: 30px;
  margin-right: 15px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid #d7d5d5;
}
#search-btn {
  width: 10%;
  height: 30px;
  border-radius: 10px;
  border-color: #d7d5d5;
  background-color: white;
}
</style>