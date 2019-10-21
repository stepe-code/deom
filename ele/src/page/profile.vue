<template>
  <div>
    <headers>
      <span slot="left">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="title"><span class="my">我的</span></span>
      <span slot="right"></span>
    </headers>
	<div>
		
	</div>
    <footers></footers>
  </div>
</template>

<script>
import footers from "../components/footers";
import headers from "../components/headers";
export default {
  name: "profile",
  components: { headers, footers }
};
</script>

<style scoped>
.my{
	font-size: 0.4rem;
}
</style>