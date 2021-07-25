const options={
    cors:{
        origin:'*'
    }
 //   origins:['http://localhost:3000']
};

const io = require('socket.io')(options);

let count = 0;

let users ={};
let userscolor = {};
let timer = -1000;
let tinit = 0;
setInterval(()=> {
    if(timer!=-1000)
    timer -=1000;
}, 1000);


io.on('connection', (socket) => {
    console.log("clieent connectedd")
    console.log(socket.id);
    socket.on('new-user-joined', (data) => {
        users[socket.id] = data.name;
        count++;
        people.push(data.name);
        userscolor[socket.id] = data.color;
        console.log("user joined",data.name,data.color);
        socket.broadcast.emit('user-joined', {name:data.name, color:data.color});
        socket.emit("number", {count:count, users:users});
        socket.broadcast.emit("number", {count:count, users:users});
    });

    socket.on('send', data =>{
        console.log("message received: ", data.message)
        socket.broadcast.emit('receive', {message: data.message, name: data.name, color:data.color});
        socket.emit('receive-user', {message: data.message, name: data.name});
        socket.broadcast.emit('user-not-typing', socket.id);
    });

    socket.on('typing', data => {
        console.log("user typing: ", data.name);
        socket.broadcast.emit('user-typing', {name:data.name, color:data.color, id:socket.id});
        timer = 2000;
        if(tinit==0)
        setInterval(()=>{
            if(timer==0)
            socket.broadcast.emit('user-not-typing', socket.id);
        }, 1000);
        tinit=1;
    })

    socket.on('disconnect', () => {
        console.log("user disconnected");
        if(users[socket.id]!=undefined) {
            console.log(users[socket.id]);
            count--;
            
            socket.broadcast.emit("user-left", {name:users[socket.id], color:userscolor[socket.id]});
            delete users[socket.id];
            socket.broadcast.emit("number", {count:count, users:users});
            
        }
    })
})

if(count<0) {
    count=0;
}

if(count==0) {
    people = [];
}



const port=process.env.PORT || 8000;
io.listen(port);
console.log('running on port',port);