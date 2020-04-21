// var userId=$("#userId").val();
var socket = null;  // 判断当前浏览器是否支持WebSocket
var address = "ws://ent.docworks.cn:8988/ws";
let a_userInfo = window.localStorage.getItem('teamwork' + 'user')
if (a_userInfo && a_userInfo != 'undefined') {
    a_userInfo = JSON.parse(a_userInfo) || {}
}
var userId = a_userInfo.id
layui.use(['layim','layer','jquery'], function(layim){
    var data;
    $.ajax({
        type: "post",
        url: "/im/index/getInitList?userId="+userId,
        cache:false,
        async:false,
        success: function(res){
            data = JSON.parse(res).data;
        }
    })

    layim.config({
        init: data
        ,brief: false
        //查看群员接口
        ,members: {
            url: '/im/api/qun/getByGroupId'
        }
        ,uploadImage: {
            url: '/im/sns/uploadFile?userId='+userId
            ,type: '' //默认post
        }
        ,uploadFile: {
            url: '/im/sns/uploadFile?userId='+userId
            ,type: '' //默认post
        }
        ,min:false
        ,find:'/im/index/myFriends'
        ,title: 'KingIM'        //主面板最小化后显示的名称
        ,chatLog: '/im/api/friend/getHistoryMessagePage'  //聊天记录地址
        ,copyright: true          //是否授权
        ,right: '10px'
        ,notice:true      //开启桌面消息提醒
        ,msgbox:'/im/api/friend/msgBoxPage' //消息盒子页面地址，若不开启，剔除该项即可
        ,isAudio:true
        ,isVideo:true
    });

    if(!window.WebSocket){
        window.WebSocket = window.MozWebSocket;
    }
    if(window.WebSocket){
        socket = new WebSocket(address);
    }else{
        alert('该浏览器不支持本系统即时通讯功能，推荐使用谷歌或火狐浏览器！');
    }

    // 连接发生错误的回调方法
    socket.onerror = function() {
        console.log("ws连接失败!");
    };
    // 连接成功建立的回调方法
    socket.onopen = function() {
       console.log("ws连接成功!");
            var obj={
                     "content":"online",
                     "userId":userId,
                     "to":{
                      "type":"status"
                     }
      			  }
        console.log(JSON.stringify(obj));
        console.log("socket onopen---ws readyState:"+socket.readyState);
        socket.send(JSON.stringify(obj));  	//发送消息到WebSocket服务
        // 定时发送心跳
        //setInterval(keepAlive(), 2000);
    }

    // 接收到消息的回调方法
    socket.onmessage = function(res) {
        console.log("ws收到消息啦:" +res.data);
        if(res.data!='pong'){
            result = eval("("+res.data+")");
            if(result.type == 'friend' || result.type == 'group'){
                layim.getMessage(result);
            }else{
                layim.setFriendStatus(result.userId,result.content);
            }
        }
    }

    // 连接关闭的回调方法
    socket.onclose = function() {
        console.log("ws关闭连接!");
    }
    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        socket.close();
    }

    // 监听发送消息
    layim.on('sendMessage', function(data){
        var uuid=$("#uuid").val();
        var obj={
            "mine":{
                "avatar":data.mine.avatar,
                "content":data.mine.content,
                "cid":uuid,   //标记消息，用于撤回等操作
                "id":data.mine.id,
                "mine":true,
                "username":data.mine.username
            },
            "to":{
                "avatar":data.to.avatar,
                "id":data.to.id,
                "name":data.to.groupname,
                "sign":data.to.sign,
                "type":data.to.type,
                "username":data.to.username
            }
        }
        var msg = JSON.stringify(obj);
        console.log(msg);
        if(data.to.type=="friend"){
            socket.send(msg);    	//发送消息到websocket服务
            $.post("/im/api/friend/saveMessage",{"fromUserId":userId,"toUserId":data.to.id,"content":data.mine.content},function(res){
                console.log(res);
            })
        }else if(data.to.type=="group"){
            $.post("/im/api/qun/getSimpleMemberByGroupId?id="+data.to.id,function(res){
                console.log(res)
                if(res!=null){
                    var obj1={
                        "mine":{
                            "avatar":data.mine.avatar,
                            "content":data.mine.content,
                            "cid":uuid,
                            "id":data.mine.id,
                            "mine":true,
                            "username":data.mine.username
                        },
                        "to":{
                            "avatar":data.to.avatar,
                            "id":data.to.id,
                            "name":data.to.groupname,
                            "sign":data.to.sign,
                            "type":data.to.type,
                            "username":data.to.username,
                            "memberList":res
                        }
                    }
                    socket.send(JSON.stringify(obj1));  	//发送消息倒webSocket服务
                }
            })
            $.post("/im/api/qun/saveMessage",{"userId":userId,"groupId":data.to.id,"content":data.mine.content},function(res){
                  // console.log(res);
            })
       }
    });

    //监听在线状态的切换事件
    layim.on('online', function(data){
        if(data == 'hide'){
            data = 'offline';
        }
        var obj = {
            "content":data,
            "userId":userId,
            "to":{
                "type":"status"
            }
        }
        socket.send(JSON.stringify(obj));
        $.post("/im/api/friend/updateOnLineStatus",{"userId":userId,"status":data},function(res){
             // console.log(res);
        })
    });

    $(function () {
        $.post("/im/index/getOfflineMsgFromRedis?userId="+userId,function(res){
            //获取离线消息
            console.log(res);
            $.each(res,function(k,v){
                var s = eval('(' + v + ')');
                layim.getMessage(s);
            });
        });
    })

    $.post('/im/friendApplyController/getByToUserId',{"toUserId" : userId,"status" : 0,"pageNum" : 1,"pageSize" : 10 }, function(result) {
        var count=result.total;
       // console.log(count)
        if(count>0){
            layim.msgbox(count);
        }
        //count即为你通过websocket或者Ajax实时获取到的最新消息数量,它将在主面板的消息盒子icon上不断显隐提示，直到点击后自动消失
    });

    //监听查看群员
    layim.on('members', function(data){
      //  console.log(data);
    });

    //监听聊天窗口的切换
    layim.on('chatChange', function(data){
      //  console.log(data);
    });

    layim.on('sign', function(value){
        //console.log(value.length); //获得新的签名
        if(value.length<200){
            $.post("/im/index/updateUserInfo",{"id":userId,"sign":value},function(result){
                console.log(result);
            })
        }else{
            layer.msg("签名不能超过200字符！")
        }
    });

//心跳检测
function keepAlive() {
    var obj = {
        "to":{
            "type":"ping"
        }
    }
    socket.send(JSON.stringify(obj));
    console.log("ping")
}

});


