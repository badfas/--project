//绑定点击事件
$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})
$('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})

const layer=layui.layer
const form = layui.form
// const baseUrl ='http://www.liulongbin.top:3007'
form.verify({
    repass: function (value) { //value：表单的值、item：表单的DOM对象
          const pwd = $('.reg-box [name=password').val()
          if(pwd!==value) return '两次密码不一致'
        }
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ]
});
$('#form_reg').on('submit',function(e){
    // 组织默认提交行为
    e.preventDefault();

    const data = $(this).serialize()
    $.ajax({
        type:'POSt',
        url:"/api/reguser",
        data,
        success:res=>{
            console.log(res);
            const {status,message}=res
            if(status!==0)return layer.msg(message)
            $('#link_login').click()
        }
    })
})
$('#form_login').on('submit',function(e){
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
        type:'POST',
        url:"/api/login",
        data,
        success:res=>{
            const{status,message,token}=res
            if(status!==0) return layer.msg(message)
            localStorage.setItem("token",token);
            location.href = "/index.html";
        }
    })
})