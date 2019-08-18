<template>
    <div v-if="states.loading || states.error || states.noResult" id="loading" :style="styles">
      <h2>{{showMessage()}}</h2>
    </div>
</template>

<script>
export default {
    name: 'message',
    props: {
        styles: Object,
        states: {
          loading: Boolean,
          error: Boolean,
          noResult: Boolean
        }
    },
    methods: {
      showMessage() {
        if(this.states.error){
          return 'Sorry, something wrong happend.';
        }else if(this.states.loading){
          return 'Loading...'
        }else if(this.states.noResult){
          return 'Sorry, we didn\'t find it. Try another search.'
        }
      }
    }
}
</script>

<style scoped>
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
  }
</style>