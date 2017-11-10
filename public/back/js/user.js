$(function () {
    // 当前页
    var currentPage = 1;
    // 每页条数
    var pageSize = 5;

    function render() {
        $.ajax({
            //请求地址
            url: '/user/queryUser',
            //请求方式
            type: 'GET',
            //请求主体发送
            data: { //请求数据
                page: currentPage,
                pageSize: pageSize
            },
            //回调函数
            success: function (data) {
                // console.log(data);
                var html = template("tpl", data)
                $("tbody").html(html)
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定bootstrap的版本，如果是3，必须指定
                    currentPage: currentPage, //指定当前页
                    totalPages: Math.ceil(data.total / pageSize), //指定总页数
                    onPageClicked: function (a, b, c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                });
            }
        })
    }
    render();
    // 启用禁用
    $('tbody').on('click', '.btn', function () {
        var id = $(this).parent().data('userid');
        console.log(id);
        var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        $("#myModal2 .text-danger span").html($(this).html() + $(this).parent().siblings().eq(1).html());
        $(".disable_btn").off().on('click', function () {
            $.ajax({
                //请求地址
                url: '/user/updateUser',
                //请求方式
                type: 'POST',
                //请求主体发送
                data: { //请求数据
                    id: id,
                    isDelete: isDelete
                },
                //回调函数
                success: function (data) {
                    console.log(data)
                    if (data.success) {
                        $("#myModal2").modal("hide");
                        render();
                    }
                }
            })
        })

    })
})