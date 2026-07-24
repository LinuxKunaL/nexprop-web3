import type { Socket } from "socket.io";

export default function(socket:Socket){

    socket.on("emit:notify",(data)=>{
        // TODO: handler here
    })
}