const socket = require('socket.io');

module.exports = (app)=>{

    const allusers = socket.listen(app).of('chat');
     
    allusers.on("connection",(user)=>{
        console.log(user.handshake.query.name+" connected");

        user.on("newMessage",(data)=>{
            console.log("sending msg");
            allusers.emit(data.receiver,data);
        });

        user.on("typing",(data)=>{
            allusers.emit(data.receiver+"typing",data);
        });

        user.on("grouptyping",(data)=>{
            user.broadcast.to(data.group).emit(data.group+"typing",data);
        })

        user.on("join",(data)=>{
            user.join(data.groupName);
        });

        user.on("groupchat",(data)=>{
            user.broadcast.to(data.group).emit(data.group,data);   
        })
    });
}