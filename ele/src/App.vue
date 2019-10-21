<template>
  <div id="app">
    <!-- <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition> -->
    <router-view></router-view>
  </div>
</template>


<script>
import "./assets/flexible";
export default {
  name: "App",
  data(){
    return{}
  }
};
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
ul li{
  list-style: none;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
