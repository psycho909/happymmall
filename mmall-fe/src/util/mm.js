var Hogan=require('hogan.js');
var conf={
    serverHost:''
}
var _mm={
    //網路請求
    request:function(param){
        var _this=this;
        $.ajax({
            method:param.method || 'get',
            url:param.url||'',
            dataType:param.type||'json',
            data:param.data||'',
            success:function(res){
                console.log(res.status)
                //success
                if(0==res.status){
                    typeof param.success =='function'&&param.success(res.data,res.msg)
                }
                //no status
                else if(10==res.status){
                    _this.doLogin()
                }
                //請求數據錯誤
                else if(1==res.status){
                    typeof param.error =='function'&&param.error(res.msg)                    
                }
            },
            error:function(err){
                typeof param.error =='function'&&param.error(err.statusText)                                    
            }
        })
    },
    //獲取服務氣地址
    getServerUrl:function(path){
        return conf.serverHost+path;
    },
    //獲取url參數
    getUrlParam:function(name){
        var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result=window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    },
    //render html template
    renderHtml:function(htmlTemplate,data){
        var template=Hogan.compile(htmlTemplate),
            result=template.render(data)
        
        return result;
    },
    //成功提示
    successTips:function(msg){
        alert(msg||'SUCCESS!!')
    },
    //錯誤提示
    errorTips:function(msg){
        alert(msg||'ERROR!!')
    },
    //字段的驗證，支持!空、phone、mail
    validate:function(value,type){
        var value=$.trim(value);
        //非空驗證
        if('require'===type){
            return !!value
        }
        //phone
        if('phone'===type){
            return /^1\d{10}$/.test(value);
        }
        //mail
        if('email'===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
        }
    },
    //login
    doLogin:function(){
        window.location.href="./view/login.html?redirect="+encodeURIComponent(window.location.href);
    },
    //go home
    goHome:function(){
        window.location.href='./view/index.html'
    }
}
module.exports=_mm;