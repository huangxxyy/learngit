<template>
  <div id="infoList">
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>

<script>
  import { mapState } from 'vuex'
    export default {
        name:"infoList",
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
