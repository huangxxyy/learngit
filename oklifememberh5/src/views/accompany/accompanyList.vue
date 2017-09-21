<template>
  <div id="accompanyList">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #accompanyList{height:100%;}

</style>

<script>
  export default {
    name:"accompanyList",
    data () {
      return {}
    },

    mounted() {

    },
    beforeRouteEnter(to, from, next){
      next()
    },
    watch: {},
    methods: {},
    components: {}
  }
</script>
