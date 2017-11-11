$(function (){
    $('.btn_add').on('click',function (){
        $.ajax({
            //请求地址
            url: '/category/queryTopCategoryPaging',
            //请求方式
            type: 'GET',
            //请求主体发送
            data: {//请求数据
                page:1,
                pageSize:100
            },
            //回调函数
            success: function (data) {
                console.log(data);
                $('.dropdown ul').html(template('tpl',data));
            }
        })
    })
})