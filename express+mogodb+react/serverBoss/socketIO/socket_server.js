const { ChatModel }=require('../bin/db/modules')
module.exports=function(server){

    const io=require('socket.io')(server)//得到一个函数，函数要接受一个server执行才能返回一个io
    //监视客户端与服务器之间的连接
    // let chatMsg=[]
    io.on('connection',function(socket){
        socket.on('sendMsg',function({from,to,content}){//当客户端点击发送，下面的事情触发。接受从客户端发来的消息
            console.log('服务器接收到浏览器发的信息',{from,to,content})
            //处理数据（保存数据）
            //准备chatMsg对象的数据
            // chatMsg.push({from,to,content})
            const chat_id=[from,to].sort().join('_')//from_to或者to_from
            const create_time=Date.now()
            new ChatModel({from,to,content,chat_id,create_time}).save(function(error,chatMsgs){

                //向所有连接上的客户端发信息
                io.emit('receiveMsg',chatMsgs)
               
            })         
        })
    })
    }