const form = layui.form
const renderCatelist=()=>{
    $.ajax({
        type:'GET',
        url:'/my/article/cates',
        success:res=>{
            const {status,message,data}=res
            if(status!==0) return layer.msg(message)
            let htmlStr = template('tpl-cate',data)
            $('[name=cate_id').html(htmlStr)
            form.render()
        }
    })
}
renderCatelist()
// 初始化富文本编辑器
initEditor()

// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
$('#chooseImgBtn').click(function(){
    $('#coverFile').click()
})

$('#coverFile').change(function (e) {
    let files = e.target.files
    if (files.length === 0) return layer.msg('请选择上传的文件')
    let file = files[0]
    let imgURL = URL.createObjectURL(file);
    $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", imgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
})
let art_state = '已发布'
$('#saveBtn').click(function(){
    art_state = '草稿'
    console.log(art_state);
})
$('.layui-form').submit(function(e){
    e.preventDefault()
    let fd = new FormData($(this)[0])
    fd.append('state',art_state)
     // 4. 将封面裁剪过后的图片，输出为一个文件对象
     $image
     .cropper('getCroppedCanvas', {
     // 创建一个 Canvas 画布
     width: 400,
     height: 280
 })
     .toBlob(function(blob) {
     // 将 Canvas 画布上的内容，转化为文件对象
     // 得到文件对象后，进行后续的操作
     // 5. 将文件对象，存储到 fd 中
     fd.append('cover_img', blob)
     // 6. 发起 ajax 数据请求
     publishAeticle(fd)
 })
})
const publishAeticle =fd=>{
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        // 注意：如果向服务器提交的是 FormData 格式的数据，
        // 必须添加以下两个配置项
        contentType: false,
        processData: false,
        success:res=>{
            const{status,message}=res
            layer.msg(message)
            if(status!==0) return
            // 发布文章成功后，跳转到文章列表页面
            location.href = '/article/art_list.html'
        }
    })
}