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
        >{{item.name}}</li>
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
                <div v-if="ite.specifications.length">
                  <span class="specification">选规格</span>
                </div>
                <!-- 加减按钮 -->
                <div v-else class="operation">
                  <button v-if="ite.num&&ite.num>0" class="jian">-</button>
                  <div v-for="(it,index) of $store.state.list" :key="index">
                    <span v-show="it.item_id==ite.item_id" class="num">{{it.num}}</span>
                  </div>
                  <button class="jia" @click="jia(ite)">+</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 遮罩层 -->
    <!-- <van-overlay :show="show" @click="cartshow = false" /> -->
    <!-- 底部 -->
    <div>
      <!-- 加入购物车显示的数据 -->
      <ul v-if="show" class="cartlist">
        <li class="cartlist-head">
          <p>购物车</p>
          <p>清空</p>
        </li>
        <li v-for="(item,index) of this.$store.state.list" :key="index" class="item">
          <p>{{item.name}}</p>
          <p>{{item.price}}</p>
          <button class="jian">-</button>
          <p>{{item.num}}</p>
          <button class="jia">+</button>
        </li>
      </ul>
      <!-- 底部购物车 -->
      <div class="footer">
        <!-- 总价大于20显示的底部 -->
        <div class="addcart" v-if="totalPrice>=20" @click="cart">
          <i class="el-icon-shopping-cart-1"></i>
        </div>
        <!-- 总价小于20显示的底部 -->
        <div class="cart" v-else>
          <i class="el-icon-shopping-cart-1"></i>
        </div>
        <!-- 价格 -->
        <div class="price">
          <h3>￥{{totalPrice}}</h3>
          <p>配送费￥5</p>
        </div>
        <!-- 结算 -->
        <div v-if="totalPrice>=20">
          <button class="goclose">去结算</button>
        </div>
        <!-- 20元起送 -->
        <div v-else class="close">还差20元起送</div>
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
      cartshow: false,
      show: false
    };
  },
  components: {},
  props: {},
  watch: {},
  methods: {
    async getShop() {
      const res = await shop({ restaurant_id: this.id });
      console.log(res);
      this.list = res.data;
    },
    clicks(index) {
      document.getElementById("scroll" + index).scrollIntoView();
      this.indexs = index;
    },
    showPopup() {
      this.show = true;
    },
    // 加
    jia(ite) {
      ite.num = 1;
      var obj = {
        name: ite.name,
        price: ite.specfoods[0].price,
        num: 0,
        item_id: ite.item_id
      };
      this.$store.commit("addNum", obj);
    },
    // 点击购物车显示数据
    cart() {
      this.cartshow = !this.cartshow;
      this.show = true;
    }
  },
  computed: {
    // 总价
    totalPrice() {
      var priceAll = 0;
      this.$store.state.list.map((item, index) => {
        priceAll += item.price;
      });
      return priceAll;
    }
  },
  template: {},
  created() {},
  mounted() {
    this.getShop();
  }
};
</script>

<style scoped lang='scss'>
i {
  text-align: center;
  font-size: 0.7rem;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
  color: white;
}
.shops {
  width: 100%;
  height: 100%;
  display: flex;
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
  .specification {
    background: #3190e8;
    color: white;
    display: block;
    padding: 0.08rem;
    border-radius: 0.1rem;
  }
  .operation {
    display: flex;
    .num {
      display: block;
      margin: 0.3rem 0.14rem 0rem;
    }
  }
}
.jian {
  background: none;
  color: #3190e8;
  display: block;
  border-radius: 50%;
  border: 1px solid #3190e8;
  font-size: 0.4rem;
  height: 0.36rem;
  width: 0.36rem;
  margin-top: 0.28rem;
  line-height: 0.3rem;
}
.jia {
  background: #3190e8;
  color: white;
  display: block;
  border-radius: 50%;
  border: none;
  font-size: 0.4rem;
  height: 0.36rem;
  width: 0.36rem;
  margin-top: 0.28rem;
  line-height: 0.3rem;
}

.active {
  background: white;
  border-left: 4px solid #3190e8 !important;
  font-weight: bold;
}

.footer {
  height: 0.9rem;
  width: 100%;
  background: #3d3d3f;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  .cart {
    height: 0.9rem;
    width: 0.9rem;
    border-radius: 50%;
    background: #3d3d3f;
    border: 4px solid #444444;
    position: relative;
    left: 0.24rem;
    top: -0.3rem;
    .van-icon {
      margin-left: 0.15rem;
      margin-top: 0.15rem;
    }
  }
  .addcart {
    height: 0.9rem;
    width: 0.9rem;
    border-radius: 50%;
    background: #3190e8;
    border: 4px solid #444444;
    position: relative;
    left: 0.24rem;
    top: -0.3rem;
    .van-icon {
      margin-left: 0.15rem;
      margin-top: 0.15rem;
    }
  }
  .price {
    color: white;
    width: 2.8rem;
    height: 0.6rem;
    h3 {
      font-size: 0.38rem;
      line-height: 0.52rem;
    }
    p {
      font-size: 0.2rem;
    }
  }
  .close {
    width: 2.6rem;
    height: 100%;
    line-height: 0.9rem;
    color: #ffffff;
    text-align: center;
    background: #535356;
    font-weight: bold;
    font-size: 0.32rem;
  }
  .goclose {
    width: 2.4rem;
    height: 100%;
    background: #4ed964;
    border: none;
    color: #ffffff;
    font-weight: bold;
    font-size: 0.34rem;
  }
}

.cartlist {
  background: white;
  padding-bottom: 0.3rem;
  .cartlist-head {
    display: flex;
    justify-content: space-between;
    line-height: 0.8rem;
    padding: 0 0.3rem;
  }
  .item {
    display: flex;
    justify-content: space-around;
  }
}
</style>
