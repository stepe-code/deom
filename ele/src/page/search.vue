<template>
  <div>
    <headers>
      <span slot="left">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="title">搜索</span>
      <span slot="right"></span>
    </headers>
    <div class="sosuo">
      <input type="text" v-model="val" placeholder="请输入商家或美食名称" />
      <el-button type="primary" @click="btn()">提交</el-button>
    </div>

    <div>
      <p class="sosuo1">搜索历史</p>
      <div class="lishi">
        <p v-for="(item,index) in val3" :key="index">
          <span>{{ item }}</span>
          <i class="el-icon-close" @click="del(index,item)"></i>
        </p>
      </div>
      <p class="qingko" @click="romove()">清空搜索历史</p>
    </div>
    <footers></footers>
  </div>
</template>

<script>
import footers from "../components/footers";
import headers from "../components/headers";
import { sosuo } from "../api/getData";
import storage from "../uitl/index";
import axios from "axios";
export default {
  name: "profile",
  components: { headers, footers },
  data() {
    return {
      val: "",
      list: {},
      arr: {},
      add: {},
      val2: [],
      val3:[]
    };
  },
  mounted() {
    this.list = storage.get("hostory");
    this.list.map(res => {
      this.arr = res.geohash;
    });
      console.log(this.arr)
  },
  methods: {
    romove(){
      this.val3 = ""
      storage.remove("val")
    },
    async btn() {
      const res = await sosuo({ geohash: this.arr.geohash, keyword: this.val });
      this.add = res.data;
      console.log(this.add)
      if (this.val == "") {
        return;
      } else {
        this.val2.push(this.val);
        storage.set("val", this.val2);
        this.val3 = storage.get("val")
        this.val = ""
      }
    },
    del(index,item){
      this.val3.splice(index,1)
      storage.set("val",this.val3)
      this.val3 = storage.get("val")||[]
    }
  }
};
</script>

<style scoped>
.lishi>p{
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  border-bottom: 1px solid #e4e4e4;
  display:flex;
  justify-content: space-between;
}
.lishi>p>span{
  font-size: 0.4rem;
}
.lishi>p>i{
  font-size: 0.5rem;
  line-height: 0.9rem;
}
.qingko {
  width: 100%;
  height: 1rem;
  background: white;
  text-align: center;
  color: blue;
  font-weight: bold;
  line-height: 1rem;
  font-size: 0.36rem;
  border: 1px solid #e4e4e4;
}
.lishi {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: white;
}
.sosuo1 {
  width: 100%;
  height: 1rem;
  background: #e4e4e4;
  line-height: 1rem;
  font-size: 0.34rem;
  padding-left: 0.2rem;
  box-sizing: border-box;
}
.sosuo {
  width: 100%;
  height: 1.5rem;
  background: white;
  margin-top: 0.92rem;
}
.sosuo > input {
  width: 4.6rem;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.2rem;
  outline: none;
  border: none;
  font-size: 0.28rem;
  margin-left: 0.6rem;
  background: #f5f5f5;
  border-radius: 8%;
}
</style>