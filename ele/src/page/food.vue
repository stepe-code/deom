<template>
  <div>
    <headers>
      <span slot="left">
        <i @click="go()" class="el-icon-arrow-left"></i>
      </span>
      <span slot="title">{{ title }}</span>
      <span slot="right"></span>
    </headers>
    <div class="div2">
      <div @click="d1()" v-show="show1">
        <p>
          {{this.title}}
          <span class="span1"></span>
        </p>
      </div>
      <div @click="d1()" v-show="!show1">
        <p>
          <span class="span3">分类</span>
          <span class="span2"></span>
        </p>
      </div>

      <div @click="d2()" v-show="show2">
        <p>
          排序
          <span class="span1"></span>
        </p>
      </div>
      <div @click="d2()" v-show="!show2">
        <p>
          排序
          <span class="span2"></span>
        </p>
      </div>

      <div @click="d3()" v-show="show3">
        <p>
          筛选
          <span class="span1"></span>
        </p>
      </div>
      <div @click="d3()" v-show="!show3">
        <p>
          筛选
          <span class="span2"></span>
        </p>
      </div>
    </div>

    <div class="div3" v-show="!show1">
      <div class="div4">
        <div>
          <ul>
            <li
              @click="d4(item,index)"
              :class="{'color':iscolor}"
              v-for="(item,index) in arr1"
              :key="index"
            >
              <img :src="'https://fuss10.elemecdn.com/'+item.image_url+'.png'" alt />

              <span>{{item.name}}</span>
              <span class="span3">
                {{item.count}}
                <i class="el-icon-arrow-right"></i>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li v-for="(ite,ind) in arr3" :key="ind">
              <p @click="d5(ite,ind)">
                <span>{{ite.name}}</span>
                <span>{{ite.count}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="div3" v-show="!show2"></div>
    <div class="div3" v-show="!show3"></div>

    <div class="over">
      <div class="ser" v-for="(item,index) in arr" :key="index">
        <div class="div1">
          <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt />
        </div>
        <div class="div2">
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
</template>

<script>
import headers from "../components/headers";
import { location, shoop, liebo } from "../api/getData";
import storage from "../uitl/index";
export default {
  name: "food",
  components: { headers },
  data() {
    return {
      title: this.$route.query.title,
      storage: {},
      list: [],
      add: [],
      arr: [],
      show1: true,
      show2: true,
      show3: true,
      iscolor: false,
      slot: [],
      lowone: [
        { name: "智能排序" },
        { name: "距离最近" },
        { name: "销量最高" },
        { name: "起送价最低" },
        { name: "配送速度最快" },
        { name: "评分最高" }
      ]
    };
  },
  mounted() {
    this.storage = storage.get("hostory");
    this.storage.map(res => {
      this.list = res;
    });
    this.shoop();
    this.location();
    this.liebo();
  },
  methods: {
    async liebo() {
      const res = await liebo({
        latitude: this.list.latitude,
        longitude: this.list.longitude
      });
      console.log(res);
      this.slot = res.data;
    },
    tit() {
      this.show1 = !this.show1;
      this.show2 = true;
      this.show3 = true;
    },
    tit1() {
      this.show2 = !this.show2;
      this.show1 = true;
      this.show3 = true;
    },
    tit2() {
      this.show1 = true;
      this.show2 = true;
      this.show3 = !this.show3;
    },
    d4(v, i) {
      this.arr3 = v.sub_categories;
      if (i === 0) {
        this.show1 = true;
      }
    },
    go() {
      this.$router.go(-1);
    },
    async location() {
      const res = await location({}, this.list);
      this.add = res;
    },
    async shoop(v, i) {
      const src = await shoop({
        latitude: this.list.latitude,
        longitude: this.list.longitude,
        "extras[]": "activities",
        "restaurant_category_ids[]": v.id
      });
      this.arr2 = src.data;
      this.show1 = false;
    }
  }
};
</script>

<style scoped>
.swa {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 1.9rem;
  background: rgba(0, 0, 0, 0.3);
}
.shop {
  width: 100%;
  height: 7rem;
  background: white;
  position: fixed;
  top: 1.9rem;
  z-index: 120;
}
.shol > p {
  width: 100%;
  margin-left: 0.6rem;
  border-bottom: 1px solid #e4e4e4;
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
}
.shol {
  width: 100%;
  position: fixed;
  top: 1.9rem;
  height: 6rem;
  z-index: 120;
  background: white;
}
.lid {
  position: absolute;
  right: 0;
  height: 0.6rem;
  line-height: 0.6rem;
}
.lii {
  height: 0.6rem;
  line-height: 0.6rem;
  padding-top: 0.2rem;
  font-size: 0.3rem;
  margin-left: 0.7rem;
}
.ull {
  width: 100%;
  height: 7.2rem;
}
.white {
  width: 100%;
  height: 7.2rem;
  background-color: white;
  z-index: 120;
  position: fixed;
  top: 1.88rem;
}
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
  margin-left: 0.2rem;
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
}
.div1 {
  margin-left: 0.2rem;
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
  margin-top: 1.92rem;
}
.nav2 > div {
  width: 33.3%;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 0.92rem;
  font-size: 0.3rem;
}
.nav2 {
  width: 100%;
  height: 0.92rem;
  position: fixed;
  top: 0.92rem;
  background: white;
  z-index: 100;
  display: flex;
}

html body .cont {
  width: 100%;
  height: 100%;
}
.cont {
  height: 100%;
  margin-top: 1.84rem;
  background: white;
}
</style>