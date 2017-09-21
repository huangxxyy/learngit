<template>
  <div id="dovrouterview">
      <router-view></router-view>
  </div>
</template>

<style scoped>
#dovrouterview{height:100%;}

</style>

<script>
    export default {
        name:"dovrouterview",
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
