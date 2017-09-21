<script>
  //http://www.cnblogs.com/zhangzt/archive/2009/12/24/1631253.html
    export default {
      name: 'authredirect',
      created() {
        const hash = window.location.search.slice(1);
        window.opener.location.href = window.location.origin + '/login#' + hash;
        window.close();
      }
    }
</script>
