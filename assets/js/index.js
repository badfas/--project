const getUserInfo=()=>{
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        data:null,
        // Headers:{
        //     Authorization:localStorage.getItem('token')
        // },
        success:res=>{
            console.log(res)
            const {status,message}=res
            if(status !==0) return layer.msg(message)
            renderAvatar(res.data)
        }
    })
}
const renderAvatar=data=>{
let name = data.nickname||data.username

//设置欢迎文本
$('#welcome').html('欢迎'+name)
if(data.user_pic!==null){
    //判断是否有头像
    $('.layui-nav-img').attr('src',data.user_pic)
    $('.text-avatar').hide()
}else{
    $('.layui-nav-img').hide()
    let firstName = name[0].toUpperCase()

    $('.text-avatar').html(firstName)
}
}
getUserInfo()
$('#exit').click(function(){
    layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        location.href='/login.html'
        localStorage.removeItem('token')
        layer.close(index);
      });
})