import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        list:[]
    },
    mutations:{
        addNum(state,value){
        var n=state.list.findIndex(function(item){
            return item.item_id ==value.item_id
        })
        if(n>=0){
            state.list[n].num++
            state.list = JSON.parse(JSON.stringify(state.list))
        }else{
            state.list.unshift(value) 
        }
        }
    }
})
