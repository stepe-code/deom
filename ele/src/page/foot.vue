<template>
  <div class="box">
    <Header>
      <span slot="left">
        <router-link to="/delicious"><i class="el-icon-arrow-left"></i></router-link>
      </span>
      <span
        id="s1"
        slot="title"
      >{{this.title}}</span>
      <span slot="right"></span>
    </Header>
    <div class="div2">
      <div @click="d1()" v-show="show1">
        <p>
          {{this.title}}<span class="span1"></span>
        </p>
      </div>
      <div @click="d1()" v-show="!show1">
        <p>
          <span class="span3">分类</span><span class="span2"></span>
        </p>
      </div>
      

      <div @click="d2()" v-show="show2">
        <p>
          排序<span class="span1"></span>
        </p>
      </div>
      <div @click="d2()" v-show="!show2">
        <p>
          排序<span class="span2"></span>
        </p>
      </div>


      <div @click="d3()" v-show="show3">
        <p>
          筛选<span class="span1"></span>
        </p>
      </div>
      <div @click="d3()" v-show="!show3">
        <p>
          筛选<span class="span2"></span>
        </p>
      </div>
    </div>

    <div class="div3" v-show="!show1">
      <div class="div4">
        <div>
          <ul>
            <li @click="d4(item,index)" :class="{'color':iscolor}" v-for="(item,index) in arr2" :key="index">
              <!-- <img :src="'https://fuss10.elemecdn.com/'+item.image_url+'.png'" alt=""> -->
              <!-- <img :src="'https://fuss10.elemecdn.com/'+item.image_url+'.png'" alt=""> -->
              <span>{{item.name}}</span>
              <span class="span3">{{item.count}}<i class="el-icon-arrow-right"></i></span>
            </li>
          </ul>
        </div>

         <div>
           <ul>
             <li v-for="(ite,ind) in arr3" :key="ind">
               <p @click="d5(ite,ind)"><span>{{ite.name}}</span><span>{{ite.count}}</span></p>
             </li>
           </ul>
         </div>
      </div>
    </div>

    <div class="div3" v-show="!show2">
      <div class="div5">
        <!-- <p v-for="(item,index) in slt" :key="index" @click="fps()">{{ item.name }}</p> -->
        <p @click="zhin()">智能排序</p>
        <p @click="jlp()">距离最近</p>
        <p @click="see()">销量最高</p>
        <p @click="qs()">起送价最低</p>
        <p @click="qs()">配送速度最快</p>
        <p @click="pfs()">评分最高</p>
      </div>
    </div>
    
    <div class="div3" v-show="!show3">
      <div class="div5">
        <h6>配送方式</h6>
        <div class="song">蜂鸟转送</div>
        <h6>商家属性(可多选)</h6>
        <div class="song1">
          <div class="song">品牌商家</div>
          <div class="song">外卖保</div>
          <div class="song">准时达</div>
          <div class="song">新店</div>
          <div class="song">在线支付</div>
          <div class="song">开发票</div>
        </div>
        <div class="sure">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </div>

    <div class="box1">
      <div class="div1">
        <div class="dv1">
          <ul class="u1">
            <li
            class="l1"
              v-for="(item,index) in arr1"
              :key="index" to="/shop" @click="goshop(item,index)">
              <img
                :src="'http://elm.cangdu.org/img/'+item.image_path"
                alt=""
              >
              <div class="div-xq">
                <p>
                  <span>品牌</span>
                  <span>{{item.name}}</span>
                  <ul>
                    <li
                      v-for="(v,i) in item.supports"
                      :key="i"
                    >
                      {{v.icon_name}}
                    </li>
                  </ul>
                </p>

                <div class="dib1">
                  <el-rate
                    v-model="item.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                  <span class="sp1">月售{{item.recent_order_num}}单</span>
                  <span class="sp2">
                    <span>{{item.delivery_mode.text}}</span>
                    <span>准时达</span>
                  </span>
                </div>

                <div class="dib2">
                  <span>￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span>
                  <span>
                    <span class="sa1">{{item.distance}}</span>
                    /
                    <span>{{item.order_lead_time}}</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "../components/headers";
import storage from "../uitl/index";
import { location, food, shoop, liebo } from "../api/getData";
import axios from "axios"
export default {
  data() {
    return {
      title: [],
      ite: [],
      list: [],
      arr1: [],
      arr2: [],
      arr3:[],
      show1:true,
      show2:true,
      show3:true,
      iscolor:false,
      str:[],
      slt:[]
    };
  },
  components: {
    Header
  },
  async mounted() {
    this.title = this.$route.query.title;
    this.ite = storage.get("hostory");
    this.ite.map(res => {
      this.str = res;
    });
    // console.log(this.str)

    // 商品列表 渲染的20条数据
    const rse = await shoop({
      latitude: this.str.latitude,
      longitude: this.str.longitude
    });
    this.arr1 = rse.data;
    console.log(this.arr1);

    //所有商铺分类列表  排序9条
    const ser = await liebo({
      latitude: this.list.latitude,
      longitude: this.list.longitude,
    });
    this.arr2 = ser.data;
    // console.log(this.arr2);
  },
  methods: {
    goshop(item,index){
      this.$router.push("/shop/?id="+item.id+"&geohash="+this.geohash)
    },
    zhin(){
      this.arr1.sort((pre,cur)=>cur.name - pre.name);
      this.show2 = !this.show2;
    },
    see() {
      this.arr1.sort((pre, cur) => cur.recent_order_num - pre.recent_order_num);
      this.show2 = !this.show2;
    },
    jlp() {
      this.arr1.sort(
        (pre, cur) => cur.distance.slice(0, -2) - pre.distance.slice(0, -2)
      );
      this.show2 = !this.show2;
    },
    qs() {
      this.arr1.sort(
        (pre, cur) =>
          pre.float_minimum_order_amount - cur.float_minimum_order_amount
      );
      this.show2 = !this.show2;
    },
    pfs() {
      this.arr1.sort((pre, cur) => cur.rating - pre.rating);
      this.show2 = !this.show2;
    },


    d1(){
      this.show1=!this.show1
      this.show2=true;
      this.show3=true;
    },
    d2(){
      this.show2=!this.show2
      this.show1=true;
      this.show3=true;
    },
    d3(){
      this.show1=true;
      this.show2=true;
      this.show3=!this.show3
    },
    d4(v,i){
      this.arr3=v.sub_categories;
      if (i===0) {
        this.show1=true;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.el-icon-arrow-left{
  color: white;
}
.el-button{
  width: 40%;
  margin-left: 0.4rem;
  margin-top: 1.4rem;
}
.div5{
  height: 50%;
  width: 100%;
  z-index: 120;
  background: white;
  p{
    height: 16.4%;
    font-size: 0.3rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #e4e4e4;
  }
  h6{
    font-size: 0.2rem;
    margin-left: 0.2rem;
  }
  h6:nth-of-type(2){
    margin-top: 0.4rem;
  }
  .song{
    margin-left:0.2rem;
    margin-top: 0.2rem;
  }
  .song1{
    display:flex;
    flex-wrap: wrap;
    .song{
      box-sizing: border-box;
      width: 2rem;
      height: 0.7rem;
      border: 1px solid #e4e4e4;
      line-height: 0.7rem;
      padding-left: 0.2rem;
      margin-left: 0.2rem;
      margin-top: 0.2rem;
    }
  }
  .cure{
    width: 100%;
    height: 2rem;
  }
}
.box1{
  margin-top:0.8rem;
  width: 100%;
  box-sizing: border-box;
}
.color{
  background: #ffffff;
}
.div4{
  display: flex;
  justify-content: space-between;
  height: 70%;
  div:nth-child(1){
    height: 100%;
    width: 50%;
    background: #f5f5f5;
    ul{
      height: 100%;
      li{
        height: 11.11%;
        color: #666;
        font-size: 0.3rem;
        line-height: 0.8rem;
        img{
          width: 0.14rem;
          height: 0.14rem;
          padding-left:0.1rem; 
          padding-right:0.1rem;
        }
        span:nth-child(3){
          float: right;
        }
        i{
          padding-left:0.1rem;
          padding-right:0.1rem;  
        }
      }
      li:hover{
        background: #ffffff;
      }
    }
    
  }
  div:nth-child(2){
    width: 45%;
    padding-left:5%; 
    background: #ffffff;
    height: 100%;
    ul{
      height: 100%;
      overflow: auto;
      font-size: 0.24rem;
      color: #666;
      li{
        height: 11.11%;
        line-height: 0.8rem;
        border-bottom: 0.01rem solid #e4e4e4;
        p{
          display: flex;
          justify-content: space-between;
          span:nth-child(2){
            margin-right:0.05rem; 
          }
        }
      }
      
    }
  }
}
.div3{
  position: fixed;
  background: rgba(0,0,0,0.3);
  margin-top:0.9rem;
  width: 100%;
  height: 87.3%; 
  z-index: 100;
  top: 0.9rem;
  box-sizing: border-box;
}
.div2{
  height: 1.01rem;
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 120;
  background: white;
  margin: 0;
  div{
    width: 33.3%;
    font-size: 0.34rem;
    text-align: center;
    height: 0.92rem;
    line-height: 0.92rem;
    p{
      height: 0.2rem;
      margin-top:0.1rem;
      .span1{
        display: inline-block;
        margin-left:0.03rem; 
        width: 0;
        height: 0;
        border: 0.06rem solid #666;
        border-left: 0.06rem solid rgba(0,0,0,0);
        border-right: 0.06rem solid rgba(0,0,0,0);
        border-bottom: 0.01rem solid rgba(0,0,0,0);
        vertical-align: middle;
        // transition: all 0.3s;
      }
      .span2{
        display: inline-block;
        margin-left:0.03rem; 
        width: 0;
        height: 0;
        border: 0.06rem solid #3190e9;
        border-left: 0.06rem solid rgba(0,0,0,0);
        border-right: 0.06rem solid rgba(0,0,0,0);
        border-bottom: 0.01rem solid rgba(0,0,0,0);
        vertical-align: middle;
        transition: all 0.3s; 
        transform: rotate(180deg);
      }
      .span3{
        color: #3190e9;
      }
    }
  }
}
.div1 {
  background: white;
  width: 100%;
}
  .dv1 {
    position: absolute;
    top: 1.8rem;
    width: 100%;
    .u1 {
      .l1 {
        width: 100%;
        background: #ffffff;
        display: flex;
        height: 1.4rem;
        border-bottom: 0.01rem solid #e4e4e4;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
          line-height: 1rem;
          padding-left: 0.1rem;
        }
        .div-xq {
          width: 85%;
          height: 0.8rem;
          padding-left: 0.1rem;
          p:nth-child(1) {
            font-size: 0.14rem;
            span:nth-child(1) {
              background: #ffd930;
              color: #333;
              font-weight: 700;
              border-radius: 0.05rem;
            }
            span:nth-child(2) {
              font-size: 0.16rem;
              font-weight: 700;
            }
            ul {
              width: 18%;
              float: right;
              display: flex;
              justify-content: space-between;
              li {
                font-size: 0.12rem;
                color: #999;
                border: 0.01rem solid #e4e4e4;
              }
            }
          }
          .dib1 {
            font-size: 0.12rem;
            padding-top:0.1rem;
            padding-bottom:0.1rem; 
            display: flex;
            justify-content: space-between;
            .sp1 {
              font-size: 0.12rem;
              width: 1.4rem;
              margin-left: -0.9rem;
            }
            .sp2 {
              font-size: 0.12rem;
              margin-right: -1.2rem;
              span:nth-child(1) {
                background: #3190e9;
                color: aliceblue;
                border-radius: 0.03rem;
              }
              span:nth-child(2) {
                border: 0.01rem solid #3190e9;
                color: #3190e9;
                border-radius: 0.03rem;
              }
            }
          }
          .dib2 {
            font-size: 0.12rem;
            height: 0.2rem;
            display: flex;
            width: 100%;
            justify-content: space-between;
            span:nth-child(2) {
              color: #3190e9;
              .sa1{
                color: #999;
              }
            }
          }
        }
      }
    }
  }
</style>