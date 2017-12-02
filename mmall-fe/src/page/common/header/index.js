require('./index.css');

var _mm=require('util/mm.js');

// header
var header={
    init:function(){
        this.bindEvent();
    },
    onLoad:function(){
        var keyword=_mm.getUrlParam('keyword');
        //if has keyword do key input
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent:function(){
        var _this=this;
        //click submit do search submit
        $('#search-btn').click(function(){
            _this.searchSubmit();
        })
        //input enter do seatch submit
        $('#search-btn').keyup(function(e){
            if(e.keyCode == 13){
                _this.searchSubmit();
            }
        })
    },
    //search submit
    searchSubmit:function(){
        var keyword=$.trim($('#search-input').val())
        //if submit has keyword to list.html
        if(keyword){
            window.location.href='./view/list.html?keyword='+keyword;
        }
        //if keyword is null to index.html
        else{
            _mm.goHome()
        }
    }
}

header.init();