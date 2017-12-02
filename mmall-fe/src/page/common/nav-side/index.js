require('./index.css')

var _mm=require('util/mm.js');
var templateIndex=require('./index.string');

// nav-side
var navSide={
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'個人中心',href:'./view/user-center.html'},
            {name:'order-list',desc:'我的訂單',href:'./view/order-list.html'},
            {name:'pass-update',desc:'修改密碼',href:'./view/pass-update.html'},
            {name:'about',desc:'關於MMALL',href:'./view/about.html'}
        ]
    },
    init:function(option){
        // merge options
        $.extend(this.option,option)
        this.renderNav();
    },
    //render nav-side
    renderNav:function(){
        //computed active status
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true
            }
        }
        //render list status
        var navHtml=_mm.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        //html insert
        $('.nav-side').html(navHtml)
    }
}

module.exports=navSide;