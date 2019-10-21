<template>
  <div class="SearchAddress">
    <headers>
      <span slot="left">
        <router-link to="/">返回</router-link>
      </span>
      <span slot="title">{{ this.add.name }}</span>
      <span slot="right">
        <router-link to="/">切换城市</router-link>
      </span>
    </headers>
    <div class="ss">
      <input type="text" v-model="val" placeholder="输入学校、商务楼、地址" />
      <button @click="btn()">提交</button>
    </div>
    <div class="details" v-show="allShow">
      <div v-for="(item,index) in list" :key="index" @click="dian(item)">
        <p>{{ item.name }}</p>
        <p>{{ item.address }}</p>
      </div>
    </div>
    <div class="history" v-if="!this.allShow">
      <p>搜索历史</p>
      <div class="SearchHistory">
        <div @click="ik(item)" v-for="(item,index) in arr1" :key="index" class="aa">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </div>
        <div @click="del()" class="a">清除历史</div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from "../components/headers";
import { address, city } from "../api/getData";
import storage from "../uitl/index";
export default {
  name: "city",
  components: {
    headers
  },
  data() {
    return {
      id: this.$route.query.id,
      val: "",
      list: {},
      allShow: false,
      arr: [],
      arr1: [],
      add: [],
    };
  },
  mounted() {
    this.arr1 = storage.get("hostory");
  },
  created() {
    this.city();
  },
  methods: {
    //城市id
    async city() {
      const res = await city({}, this.id);
      this.add = res.data;
    },

    //搜索地址
    async btn() {
      const res = await address({
        city_id: this.id,
        keyword: this.val,
        type: "search"
      });
      this.allShow = !this.allShow;
      this.list = res.data;
    },

    //本地存储
    dian(item) {
      this.allShow = !this.allShow;
      this.arr.push(item);
      console.log(this.arr)
      storage.set("hostory",this.arr)
      this.$router.push("/delicious/?geohash="+item.geohash);
    },

    //美食页面
    ik(item) {
      this.$router.push("/delicious/?geohash="+item.geohash);
    },

    //清空
    del() {
      storage.remove("hostory");
      this.arr1 = "";
    }
  }
};
</script>

<style scoped>
.aa > p {
  margin-left: 0.2rem;
  line-height: 180%;
}
.aa {
  width: 100%;
  height: 1.2rem;
  background: white;
  padding-top: 0.2rem;
}
.SearchHistory > .a {
  text-align: center;
  height: 0.8rem;
  width: 100%;
  display: block;
  line-height: 0.8rem;
  border-top: 1px solid #e4e4e4;
  color: gray;
}
.SearchHistory {
  width: 100%;
  height: 100%;
  background: white;
  box-sizing: border-box;
}
.details {
  width: 100%;
  height: 100%;
  background: white;
}
.details > div {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #e4e4e4;
  padding-top: 0.2rem;
}
.history {
  width: 100%;
  height: 100%;
  background: #e4e4e4;
}
.history > p {
  margin-left: 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
}
html body {
  width: 100%;
  height: 100%;
  background: #e4e4e4;
  box-sizing: border-box;
}
.SearchAddress {
  height: 100%;
  width: 100%;
  background: #e4e4e4;
}
a {
  color: white;
}
.ss {
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  padding: 0.2rem 0rem;
  margin-top: 0.92rem;
}
.ss > input {
  width: 6rem;
  height: 0.4rem;
  display: block;
  border: 1px solid #e4e4e4;
  padding: 0.12rem;
  margin: 0.1rem 0.6rem;
  outline: none;
}
.ss > button {
  width: 6.3rem;
  height: 0.6rem;
  background-color: #3190e8;
  color: #fff;
  margin: 0.1rem 0.6rem;
  border: none;
  border-radius: 0.05rem;
}
</style>