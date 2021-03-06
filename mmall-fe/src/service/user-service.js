var _mm=require('util/mm.js');

var _user={
    //check login status
    checkLogin:function(resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/user/get_user_info.do'),
            method:'post',
            success:resolve,
            error:reject
        })
    },
    //logout
    logout:function(resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/user/logout.do'),
            method:'post',
            success:resolve,
            error:reject
        })
    }
}
module.exports=_user;