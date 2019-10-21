<template>
  <div class="delicious">
    <headers>
      <span slot="left">
        <router-link to="/city" class="a">搜索</router-link>
      </span>
      <span slot="title">
        <router-link class="a" to="/city">{{ list.name }}</router-link>
      </span>
      <span slot="right">用户</span>
    </headers>
    <div class="contents">
      <div class="cont">
        <div class="banner">
          <swiper class="nav" :options="swiperOption">
            <swiper-slide v-for="(item,index) in add" :key="index">
              <router-link tag="div" :to="'/foot/?title='+item.title">
                <img class="img1" :src="'https://fuss10.elemecdn.com'+item.image_url" />
                <p class="p">{{ item.title }}</p>
              </router-link>
            </swiper-slide>
            <div class="swiper-pagination pag" slot="pagination"></div>
          </swiper>
        </div>
      </div>
        <div class="navc">
        <div>
          <i class="el-icon-s-shop"></i>
          <span>附近商家</span>
        </div>
        <div class="over">
          <div class="ser" v-for="(item,index) in init" :key="index">
            <div @click="goshop(item,index)" class="div1">
              <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt />
            </div>
             <div class="div2" @click="goshop(item,index)">
              <p>
                <span class="pp">品牌</span>
                <span class="pp2">{{ item.name }}</span>
              </p>
              <p class="ppp">
                <el-rate
                  v-model="item.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                  class="rate"
                ></el-rate>
                <span>月售{{ item.recent_order_num }}</span>
              </p>
              <p>￥{{item.float_minimum_order_amount}}起送&nbsp;/&nbsp;{{ item.piecewise_agent_fee.tips }}</p>
            </div>
            <div class="right">
              <p class="p2">
                <span class="bao" v-for="(it,key) in item.supports" :key="key">
                  <span>{{ it.icon_name }}</span>
                </span>
              </p>
              <p class="p3">
                <span class="fn">{{ item.delivery_mode.text }}</span>
                <span class="fn1">{{ item.supports[1].name }}</span>
              </p>
              <p class="po">
                {{ item.distance }}&nbsp;/&nbsp;
                <span>{{ item.order_lead_time }}</span>
              </p>
            </div>
          </div>
        </div>
        </div>
    </div>

    <div class="footer">
      <ul>
        <li>
          <!-- <router-link tag="li" to="delicious"> -->
          <i class="el-icon-eleme"></i>
          <p>外卖</p>
        </li>
        <!-- </router-link> -->
        <router-link tag="li" to="/search">
          <i class="el-icon-discover"></i>
          <p>搜索</p>
        </router-link>
        <router-link tag="li" to="/order">
          <i class="el-icon-tickets"></i>
          <p>订单</p>
        </router-link>
        <router-link tag="li" to="/profile">
          <i class="el-icon-user"></i>
          <p>我的</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import headers from "../components/headers";
import { location, food, shoop } from "../api/getData";
import axios from "axios";
export default {
  name: "delicious",
  components: { headers },
  data() {
    return {
      list: {},
      add: [],
      init: [],
      geohash: this.$route.query.geohash,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        paginationClickable: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        slidesPerView: 4,
        slidesPerGroup: 8,
        slidesPerColumn: 2,
        loop: true
      }
    };
  },
  mounted() {
    this.location();
    this.food();
    this.shoop();
  },
  methods: {
    goshop(item,index){
      this.$router.push("/shop/?id="+item.id+"&geohash="+this.geohash)
    },
    async location() {
      const res = await location({}, this.geohash);
      this.list = res.data;
    },
    async food() {
      const res = await food({});
      this.add = res.data;
    },
    shoop() {
      axios
        .get(
          "https://elm.cangdu.org/shopping/restaurants/?latitude=" +
            this.list.latitude +
            "&longitude=" +
            this.list.longitude
        )
        .then(res => {
          this.init = res.data;
        });
    }
  }
};
</script>

<style>
.pp2 {
  font-size: 0.3rem;
}
.div2 > p {
  font-size: 0.22rem;
}
.p2 {
  position: absolute;
  right: 0.3rem;
  top: 0.2rem;
}
.p2 > span > span {
  font-size: 0.16rem;
  border: 1px solid #e4e4e4;
}
.p3 {
  font-size: 0.16rem;
  position: absolute;
  right: 0.3rem;
  top: 0.8rem;
}
.fn1 {
  color: #3190e8;
  border: 1px solid #3190e8;
  margin-top: 0.2rem;
}
.fn {
  background: #3190e8;
  color: white;
  margin-top: 0.2rem;
}
.right {
  width: 70%;
  position: relative;
}
.bao > span {
  margin-left: 0.1rem;
  text-align: center;
}
.po {
  font-size: 0.2rem;
  position: absolute;
  right: 0.3rem;
  bottom: 0.4rem;
}
.po > span {
  color: #3190e8;
}
.ppp {
  display: flex;
}
.ppp > span {
  background: none;
  margin-left: 0.1rem;
}
.el-rate__icon {
  font-size: 0.2rem;
  margin: 0;
}
.el-rate__text {
  font-size: 0.1rem;
  margin-left: 0.1rem;
}

.div2 {
  width: 50%;
}
.div2 > p {
  margin-top: 0.2rem;
}
.div2 > p:nth-of-type(1) {
  font-weight: bold;
  overflow: hidden;
  width: 70%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pp {
  background: orange;
  border-radius: 14%;
}
.div1 > img {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.2rem;
}
.div1 {
  margin-top: 0.3rem;
}
.ser {
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid #e4e4e4;
  box-sizing: border-box;
  display: flex;
}
.over {
  width: 100%;
  height: 100%;
  margin-bottom: 0.92rem;
}
.navc > div:nth-of-type(1) {
  font-size: 0.26rem;
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
  color: #999;
  margin-top: 0.2rem;
}
.navc {
  width: 100%;
  flex: auto;
  min-height: 100%;
  position: absolute;
  top: 5rem;
  background: white;
}
.cont {
  width: 100%;
  height: 100%;
  position: relative;
}
.pag {
  position: absolute;
  bottom: 0;
}
.p {
  text-align: center;
}
.img1 {
  width: 0.8rem;
  height: 0.8rem;
  text-align: center;
  margin: 0.2rem auto;
  display: block;
}
.new {
  display: flex;
  flex-wrap: wrap;
}
.new > swiper-slide {
  width: 25%;
}

ul li {
  list-style: none;
}
.footer > ul {
  width: 100%;
  display: flex;
}
.footer > ul > li {
  justify-content: space-around;
  width: 25%;
}
.footer > ul > li > i:hover {
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
html body {
  width: 100%;
  height: 10rem;
  background: #f5f5f5;
}

.banner {
  width: 100%;
  height: 3.6rem;
  margin-top: 0.92rem;
  position: absolute;
  flex: 1;
  flex-direction: column;
  background: white;
}
.a {
  color: white;
}
</style>