<template>
  <div id="completeList">
    <router-view></router-view>
  </div>
</template>

<style scoped>
#completeList{height:100%;}

</style>

<script>
  import { mapState } from 'vuex'
    export default {
        name:"completeList",
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
