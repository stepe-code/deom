import router from '../router';
var storage={


    getData(key){
          return JSON.parse(localStorage.getItem(key))
    },
    setData(key,arr){
        localStorage.setItem(key,JSON.stringify(arr))
    },


    // 排序
    Sort(data,is,name){
        console.log(name)
        var fa=name==undefined||name==null||name==''||name=={}||name==[]
        console.log(fa)
        if(fa){
            this.Sort_Data(data,is);
        }else {
            console.log(1)
            data.sort(this.SortData(""+name,is));
        }
    },
    // 排序-方法
    SortData(key,isAsc){
        return function(x, y) {
            if(isNaN(x[key])) { //如果当前排序的不是数字
                if(x[key] > y[key]) return 1*(isAsc?1:-1);
                if(x[key] < y[key]) return -1*(isAsc?1:-1);
                return 0;
            }else{
                return (x[key]-y[key])*(isAsc?1:-1);
            }
        }
    },
    // 排序——数组
    Sort_Data(data,is){
        return (
            data.sort((a,b)=>{
                return  is?a-b:b-a
            })
        )
    },


    // 路由传参
    Rou(url,data){
        router.push({
            path:'/'+url,
            query:data
        })
    }
    


}
export default storage


// var data = [{name:"zachary", age:28}, {name:"nicholas", age:29}];
