<template>
  <div>
	  <headers>
		  <span slot="left">ele.me</span>
		  <span slot="title">搜索</span>
		  <span slot="right"></span>
	  </headers>
	  <div></div>
	  <footers></footers>
  </div>
</template>

<script>
import footers from "../components/footers";
import headers from "../components/headers";
export default {
	name:"profile",
	components: { headers,footers },
}
</script>

<style scoped>

</style>