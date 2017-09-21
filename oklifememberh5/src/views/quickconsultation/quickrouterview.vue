<template>
    <div id="quickrouterview">
    <router-view></router-view>
  </div>
</template>

<style scoped>
#quickrouterview{height:100%;}

</style>

<script>
  import { mapState } from 'vuex'
    export default {
        name:"quickrouterview",
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
