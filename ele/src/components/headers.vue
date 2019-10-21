<template>
  <div class="head">
	  <slot name="left"></slot>
	  <slot name="title"></slot>
	  <slot name="right"></slot>
  </div>
</template>

<script>
export default {
	name:"headers",
	data(){
		return{}
	}
}
</script>

<style>
.head{
	width: 100%;
	height: 0.92rem;
	background: #3190e8;
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;left: 0;right: 0;
	z-index: 120;
	box-sizing: border-box;
}
.head>span{
	color:white;
	font-size: 0.33rem;
	line-height: 0.92rem;
}
.head>span:nth-of-type(1){
	margin-left: 0.2rem;
}
.head>span:nth-of-type(2){
	font-weight: bold;
	text-overflow: ellipsis;
    white-space: nowrap;
}
.head>span:nth-of-type(3){
	margin-right: 0.2rem;
}
</style>