$(function () {
    var id=1;
    setcommodity(id);
    $.ajax({
        //请求地址
        url: '/category/queryTopCategory',
        //请求方式
        type: 'GET',
        //回调函数
        success: function (data) {
            // console.log(data);
            // var html=template('tpl'.data);
            $(".lt_cateLeft ul").html(template('tpl', data));
            $('.lt_cateLeft ul li:first-child').addClass('now');
            $('.lt_cateLeft ul').on('click', 'a', function () {
                id=$(this).data('id');
                setcommodity(id);
                $(this).parent().siblings().removeClass('now');
                $(this).parent().addClass('now');
            })
        }
    })

    function setcommodity(id){
        $.ajax({
            //请求地址
            url: '/category/querySecondCategory',
            //请求方式
            type: 'GET',
            //请求主体发送
            data: {//请求数据
                id:id
            },
            //回调函数
            success: function (data) {
                // console.log(data);
                $('.lt_cateRight ul').html(template('tpl1',data))
            }
        })
    }
})