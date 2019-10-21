<template>
  <div class="footer">
    <ul>
      <li @click="aa">
        <i class="el-icon-eleme"></i>
        <p>外卖</p>
      </li>
      <li @click="bb">
        <i class="el-icon-discover"></i>
        <p>搜索</p>
      </li>
      <li @click="cc">
        <i class="el-icon-tickets"></i>
        <p>订单</p>
      </li>
      <li @click="dd">
        <i class="el-icon-user"></i>
        <p>我的</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "footers",
  methods: {
    aa(){
      this.$router.push("/delicious")
    },
    bb(){
      this.$router.push("/search")
    },
    cc(){
      this.$router.push("/order")
    },
    dd(){
      this.$router.push("/profile")
    }
  }
};
</script>

<style scoped>
i:hover{
	color: skyblue;
}
.footer > ul > li > i {
  font-size: 0.5rem;
  display: block;
  text-align: center;
}
.footer > ul > li > p {
  text-align: center;
}
.footer > ul {
  width: 100%;
  display: flex;
}
.footer > ul > li {
  justify-content: space-around;
  width: 25%;
}
.footer {
  border-top: 1px solid #e4e4e4;
  background-color: white;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 1rem;
  display: flex;
}
</style>