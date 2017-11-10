$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            //请求地址
            url: '/category/queryTopCategoryPaging',
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
                $('tbody').html(template('tpl', data));
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
    var $form = $('form');
    $form.bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //规则
        fields: {
            //对应了表单中的name属性
            categoryName: {
                //写username所有的校验规则
                validators: {
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }
            },
        }
    });
    $form.on("success.form.bv", function (e) {
        // console.log($form.serialize())
        e.preventDefault();
        $.ajax({
            //请求地址
            url: '/category/addTopCategory',
            //请求方式
            type: 'POST',
            //请求主体发送
            data: $form.serialize(),
            //回调函数
            success: function (data) {
                // console.log(data);
                if(data.success){
                    $('#myModal').modal("hide");
                }
                currentPage=1;
                render();
                $form.data("bootstrapValidator").resetForm();
                $form[0].reset();
            }
        })
    })
})