<template>
  <div id="App">
	  <headers>
		  <span slot="left">ele.me</span>
		  <span slot="title"></span>
		  <span slot="right">登录|注册</span>
	  </headers>
	  <contents></contents>
  </div>
</template>

<script>
import headers from "../components/headers"
import contents from "./contents"

export default {
	name:"home",
	components:{
		headers,
		contents
	},
	data(){
		return{}
	}
}
</script>

<style scoped>
</style>