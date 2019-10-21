<template>
  <div class="shops">
    <div class="header">
      <div>
        <p>商品</p>
      </div>
      <div>
        <p>评价</p>
      </div>
    </div>

    <!-- 中间 -->
    <div class="content">
      <!-- 左侧排版 -->
      <ul class="content-left">
        <li
          v-for="(item,index) of list"
          :key="index"
          @click="clicks(index)"
          :class="indexs==index?'active':''"
        >
          {{item.name}}
        </li>
      </ul>
      <!-- 右侧排版 -->
      <div class="content-right">
        <ul :id="'scroll'+index" v-for="(item,index) of list" :key="index">
          <li class="title">
            <span>{{item.name}}</span>
            <span>{{item.description}}</span>
          </li>
          <li class="cont" v-for="(ite,ind) of item.foods" :key="ind">
            <div class="cont-img">
              <img :src="'https://elm.cangdu.org/img/'+ite.image_path" alt />
              <div v-if="ite.attributes.length">新品</div>
            </div>
            <div class="cont-font">
              <p>{{ite.name}}</p>
              <p>{{ite.description}}</p>
              <p>月销{{ite.month_sales}}份 好评率{{ite.satisfy_rate}}%</p>
              <div class="cont-font-div">
                <p>
                  ￥
                  <span>{{ite.specfoods[0].price}}</span>
                </p>
                <!-- 选规格 -->
                <div class="jia" v-if="ite.specifications.length">
                  <span>选规格</span>
                </div>
                <!-- 加减按钮 -->
                <div class="jian" v-else>
                  <button v-show="ite.is_essential" @click="btn1(ite)">-</button>
                  <span v-show="ite.is_essential">{{ ite.is_featured }}</span>
                  <button @click="btn(ite)">+</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <div class="car">
        <i class="el-icon-shopping-cart-1"></i>
      </div>
      <div>
        <span>￥0.00</span>
        <span></span>
      </div>
    </div>
  </div>
</template>




<script>
import { shop } from "../api/getData";
export default {
  data() {
    return {
      id: this.$route.query.id,
      list: [],
      indexs: 0,
    };
  },
  components: {},
  props: {},
  watch: {},
  methods: {
    btn1(ite) {
      ite.is_featured--;
      if (ite.is_featured==0) {
        ite.is_essential = false;
      }
    },
    btn(ite) {
      ite.is_essential = true;
      if(ite.is_featured==0){
        ite.is_essential = false;
      }
      ite.is_featured++;
    },
    async getShop() {
      const res = await shop({ restaurant_id: this.id });
      console.log(res);
      this.list = res.data;
    },
    clicks(index) {
      document.getElementById("scroll" + index).scrollIntoView();
      this.indexs = index;
    }
  },
  computed: {},
  template: {},
  created() {},
  mounted() {
    this.getShop();
  }
};
</script>


<style scoped lang='scss'>
.car{
  width: 1.5rem;
  height: 1.5rem;
  background: black;
  border-radius: 50%;
  position: absolute;
  top: -0.5rem;left: 0.4rem;
  i{
    text-align: center;
    margin-left: 0.3rem;
    line-height: 1.5rem;
    font-size:0.8rem;
    color: white;
  }
}
.footer{
  height: 1.2rem;
  background: black;
  position: relative;
  width: 100%;
  div{
    color: white;
    span{
      color: white;
      margin-left: 2rem;
      font-size: 0.5rem;
    }
  }
}
.jian {
  button {
    width: 0.5rem;
    height: 0.5rem;
    border: none;
    font-size: 0.5rem;
    color: white;
    background: #3190e8;
    outline: none;
    border-radius: 50%;
  }
}
.jia {
  font-size: 0.3rem;
  background: #3190e8;
  width: 1.2rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  border-radius: 0.2rem;
  color: white;
}
.shops {
  width: 100%;
  height: 100%;
  display: flex;
  flex:1;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 1rem;
  display: flex;
  border: 1px solid #ebebeb;
  background: white;
  font-size: 0.34rem;
  box-sizing: border-box;
  div {
    width: 50%;
    line-height: 1rem;
    text-align: center;
    color: #666666;
    position: relative;
  }
  div:nth-child(1) > p {
    color: #3190e8;
    border-bottom: 3px solid #3190e8;
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    left: 50%;
    top: 0;
  }
}
.content {
  width: 100%;
  overflow: auto;
  height: 100%;
  flex: 1;
  display: flex;
  .content-left {
    width: 25%;
    height: 100%;
    overflow: auto;
    li {
      height: 1.3rem;
      line-height: 1.3rem;
      padding-left: 0.2rem;
      border-left: 4px solid #f5f5f5;
      color: #666666;
      border-bottom: 1pxx solid #ededed;
      overflow: hidden;
    }
  }
  .content-right {
    width: 75%;
    height: 100%;
    background: white;
    flex: 1;
    overflow: auto;
    .title {
      background: #f5f5f5;
      line-height: 1rem;
      span:nth-child(1) {
        margin: 0 0.2rem;
        font-size: 0.36rem;
        color: #666666;
        font-weight: 600;
      }
      span:nth-child(2) {
        color: #999999;
      }
    }
    .cont {
      box-sizing: border-box;
      overflow: hidden;
      height: 2.4rem;
      border: 1px solid #f8f8f8;
      padding: 0.24rem 0.2rem;
      position: relative;
      display: flex;
      .cont-img {
        img {
          width: 1rem;
          height: 1rem;
        }
        div {
          height: 0.38rem;
          width: 0.8rem;
          background: #46d75b;
          font-size: 0.2rem;
          color: #ffffff;
          line-height: 0.5rem;
          text-align: center;
          font-size: 0.12rem;
          position: absolute;
          top: 0;
          left: -0.29rem;
          transform: perspective(100px) rotateX(0deg) rotateY(0deg)
            rotateZ(-54deg);
        }
      }
      .cont-font {
        margin-left: 0.2rem;
        font-size: 0.2rem;
        width: 100%;
        p:nth-child(1) {
          font-size: 0.32rem;
          font-weight: bold;
        }
        p:nth-child(2) {
          color: #acacac;
          line-height: 0.44rem;
        }
        .cont-font-div {
          .jian {
            position: absolute;
            right: 0.2rem;
            span {
              font-size: 0.4rem;
            }
          }
          p {
            color: #ff6600;
            margin-top: 0.2rem;
            float: left;
            span {
              font-weight: bold;
              font-size: 0.3rem;
            }
          }
          div {
            float: right;
          }
        }
      }
    }
  }
}
.active {
  background: white;
  border-left: 4px solid #3190e8 !important;
  font-weight: bold;
}
</style>
