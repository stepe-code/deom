import { Request } from "../uitl/req"

// 获取城市
export const Location = data => Request.getData({
    url: `/api/v1/cities`,
    method: "get",
    data,
})

// 城市id
export const city = (data,id) => Request.getData({
    url: '/api/v1/cities/'+id,
    method: "get",
    data,
})

// 搜索地址
export const address = data => Request.getData({
    url: `/api/v1/pois`,
    method: "get",
    data,
})

// 经纬度详细定位
export const location = (data,geohash) => Request.getData({
    url: '/api/v2/pois/'+geohash,
    method: "get",
    data,
})

// 食品分类列表
export const food = data => Request.getData({
    url: `/api/v2/index_entry`,
    method: "get",
    data,
})

// 商品列表
export const shoop = data => Request.getData({
    url: '/api/shopping/restaurants',
    method: "get",
    data,
})

// 搜索餐馆
export const sosuo = data => Request.getData({
    url: '/api/v4/restaurants',
    method: "get",
    data,
})

//所有商铺分类列表
export const liebo = data => Request.getData({
    url: '/api/shopping/v2/restaurant/category',
    method: "get",
    data,
})

//食品详情
// http://elm.cangdu.org/shopping/v2/menu
export const shop = data => Request.getData({
    url:'/api/shopping/v2/menu',
    method:"get",
    data,
})