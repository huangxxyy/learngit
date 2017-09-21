<template>
  <div id="managementList">
    <router-view></router-view>
  </div>
</template>

<style scoped>
#managementList{height:100%;}

</style>

<script>
  import { mapState } from 'vuex'
    export default {
        name:"managementList",
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
