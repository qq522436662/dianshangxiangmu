$(function () {
    var currentPage = 1;
    var pageSize = 5;

    // 渲染下拉框内容
    $('.btn_add').on('click', function () {
        $.ajax({
            //请求地址
            url: '/category/queryTopCategoryPaging',
            //请求方式
            type: 'GET',
            //请求主体发送
            data: { //请求数据
                page: 1,
                pageSize: 100
            },
            //回调函数
            success: function (data) {
                // console.log(data);
                $('.dropdown ul').html(template('tpl', data));
            }
        })
    })

    // 渲染表格内容
    function render() {
        $.ajax({
            //请求地址
            url: '/category/querySecondCategoryPaging',
            //请求方式
            type: 'get',
            //请求主体发送
            data: { //请求数据
                page: currentPage,
                pageSize: pageSize
            },
            //回调函数
            success: function (data) {
                console.log(data)
                $('tbody').html(template('tpl2', data));
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

    // 一级分类隐藏域设置id属性
    $('.dropdown-menu').on('click', 'a', function () {
        $('#dropdownMenu1').text($(this).text());
        $('#categoryId').val($(this).data('id'));
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID")
    })

    //初始化文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //文件上传完成时，会执行的回调函数，通过这个函数就能获取到图片的地址
        //第二个参数就有上传的结果 data.result
        done: function (e, data) {
            console.log("图片上传完成拉");
            console.log(data);
            console.log(data.result.picAddr);
            $(".form-group.img_box img").attr("src", data.result.picAddr);
            //把图片的地址放到隐藏域中
            $("#brandLogo").val(data.result.picAddr);

            // //让brandLogo校验成功
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });


    // 表单校验
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

            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });

    // 添加成功事件
    $form.on("success.form.bv", function (e) {
        console.log($form.serialize())
        e.preventDefault();
        $.ajax({
            //请求地址
            url: '/category/addSecondCategory',
            //请求方式
            type: 'POST',
            //请求主体发送
            data: $form.serialize(),
            //回调函数
            success: function (data) {
                console.log(data);
                if (data.success) {
                    $('#myModal').modal("hide");
                }
                currentPage = 1;
                render();
                $form.data("bootstrapValidator").resetForm();
                $form[0].reset();
            }
        })
    })
})