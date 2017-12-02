require('./index.css');

var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
var _cart=require('service/cart-service.js');

// Nav
var nav={
    init:function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent:function(){
        //登陸click
        $('.js-login').click(function(){
            _mm.doLogin();
        })
        //reg click
        $('.js-register').click(function(){
            window.location.href='./view/register.html';
        })
        //back click
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        })
    },
    //load user info
    loadUserInfo:function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username)
        },function(errMsg){
            //do nothing
            //_mm.errorTips(errMsg);
        });
    },
    //load card count
    loadCartCount:function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res||0)
        },function(errMsg){
            $('.nav .cart-count').text(0)
        });
    }
}

module.exports=nav.init();