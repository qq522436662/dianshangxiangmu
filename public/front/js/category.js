$(function (){
    $.ajax({
        //请求地址
        url: '/category/queryTopCategory',
        //请求方式
        type: 'GET',
        //回调函数
        success: function (data) {
            // console.log(data);
            // var html=template('tpl'.data);
            $(".lt_cateLeft ul").html(template('tpl',data));
        }
    })
})