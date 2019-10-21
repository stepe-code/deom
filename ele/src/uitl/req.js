import axios from "axios"
let Request = {
    getData({url,data={},method='get'}){
        return new Promise((resolve,reject)=>{
            this._getRequest(url,resolve,reject,data,method);
        })
    },
    _getRequest:function(url,resolve,reject,data={},method='get'){
        let format = method == 'get'?'params':'data';
        axios({
            url:url,
            method:method,
            [format]:data,
        }).then(res=>{
            resolve(res)
        }).catch(()=>{
            reject();
        })
    },
};
export { Request };