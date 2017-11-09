$(function (){
    // 侧边栏显示/隐藏
    $(".add-content .ad_nav .btn_menu").on('click',function (){
        $("#sidebar").toggleClass("out");
        $(".add-content").toggleClass("out");
    })
    // 判断是否登陆
    if(location.href.indexOf("login.html")==-1){
        $.ajax({
            //请求地址
            url: '/employee/checkRootLogin',
            //请求方式
            type: 'get',
            //回调函数
            success: function (backData) {
                // console.log(backData)
                if(backData.error==400){
                    location.href="login.html";
                }
            }
        })
    }

    // 退出用户
    $(".btn_ounloggin_true").on("click",function (){
        $.ajax({
            //请求地址
            url: '/employee/employeeLogout',
            //请求方式
            type: 'get',
            //回调函数
            success: function (backData) {
                console.log(backData);
                if(backData.success){
                    location.href="login.html";
                }
            }
        })
    })

})