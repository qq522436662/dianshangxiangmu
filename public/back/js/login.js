$(function () {
  //登录表单校验
  //1. 用户名不能为空
  //2. 用户密码不能为空
  //3. 密码的长度是6-12位

  //获取到表单
  var $form = $("form");
  //调用bootstrapValidator 校验表单
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
      username: {
        //写username所有的校验规则
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      password: {
        validators: {
          // 非空提示
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度提示
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度是6-12位"
          },
          // 错误提示
          callback: {
            message: "密码错误"
          }
        }

      }
    }
  });
  // 表单验证
  $form.on('success.form.bv',function (e){
    // 阻止默认行为
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      // 得到表单里的数据
      data:$form.serialize(),
      success:function (data){
        if(data.success){
          // 登录到首页
          location.href="index.html"
        }
        if(data.error==1000){
          // 调出框架显示用户名错误
          // updateStatus方法把username变成校验失败     INVALID 校验失败 callback 提示信息
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(data.error==1001){
          // 调用框架显示密码错误
          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  })
  // 表单重置
  $("input[type=reset]").on('click',function (){
    // 调用框架方法清空表单内容
    $form.data("bootstrapValidator").resetForm();
    $form.data('bootstrapValidator', null);
  })
})