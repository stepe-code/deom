<template>
  <div class="cont">
    <div class="LocationCity">
      <span>当前定位城市:</span>
      <span>定位不准时，请在城市列表中选择</span>
    </div>
    <div class="beijing">
      <router-link :to="'/city/?id=' +this.list1.id">{{ list1.name }}</router-link>
      <span>></span>
    </div>
    <div class="re">
      <h4>热门城市</h4>
    </div>
    <div class="hot">
      <router-link
        v-for="(item,index) in list2"
        :key="index"
        :to="'/city/?id=' +item.id"
      >{{ item.name }}</router-link>
    </div>
    <div class="group" v-for="(item,index) of Object.keys(list3).sort()" :key="index">
      <p>{{item}}</p>
      <ul>
        <li v-for="(item,index) of list3[item]" :key="index">
          <router-link :to="'/city/?id=' +item.id">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Location } from "../api/getData";
import axios from "axios"
export default {
  name: "contents",
  data() {
    return {
      list1: "",
      list2: [],
      list3: {}
    };
  },
  async mounted() {
    const res = await Location({ type: "guess" });
    this.list1 = res.data;
    const rest = await Location({ type: "hot" });
    this.list2 = rest.data;
    const rests = await Location({ type: "group" });
    this.list3 = rests.data;
  },
};
</script>

<style scoped>
.group > p {
  color: #666;
  text-indent: 0.2rem;
  border-top: 2px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  line-height: 0.6rem;
  background: white;
}
.group > p > span {
  font-size: 0.2rem;
  color: #999;
}
.group > ul {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.4rem;
  background: white;
}
.group > ul > li {
  text-align: center;
  color: #666;
  border-bottom: 0.025rem solid #e4e4e4;
  border-right: 0.025rem solid #e4e4e4;
  width: 24.66%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
ul li {
  list-style: none;
}
.group > ul > li > a {
  color: #666666;
}
h4 {
  height: 0.8rem;
  margin-left: 0.2rem;
  color: #666;
  line-height: 0.8rem;
  font-weight: normal;
  margin-top: 0.4rem;
}
.re {
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  background: white;
}
.hot {
  width: 100%;
  display: flex;
  background: white;
  flex-wrap: wrap;
  text-align: center;
  margin-bottom: 0.4rem;
}
.hot > a {
  width: 24.66%;
  height: 0.75rem;
  line-height: 0.75rem;
  border-bottom: 0.025rem solid #e4e4e4;
  border-right: 0.025rem solid #e4e4e4;
  color: #3190e8;
}
.cont {
  width: 100%;
  background: #f5f5f5;
  position: absolute;
  top: 0.92rem;
  left: 0;
  z-index: -100;
  box-sizing: border-box;
}
.LocationCity {
  width: 100%;
  height: 0.7rem;
  line-height: 1rem;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 0.2rem;
  background: white;
  display: flex;
  justify-content: space-between;
}
.LocationCity > span:nth-of-type(1) {
  margin-left: 0.2rem;
  font-size: 0.2rem;
  color: #666;
}
.LocationCity > span:nth-of-type(2) {
  font-size: 0.2rem;
  font-weight: bold;
  color: #9f9f9f;
  margin-right: 0.2rem;
}
.beijing {
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #e4e4e4;
  background: white;
  display: flex;
  justify-content: space-between;
}
.beijing > a {
  color: #3190e8;
  text-decoration: none;
  font-size: 0.35rem;
  margin-left: 0.2rem;
}
.beijing > span {
  margin-right: 0.2rem;
  color: #999;
  font-size: 0.4rem;
}
</style>