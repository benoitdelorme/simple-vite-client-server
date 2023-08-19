import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

class App {
    server
    port
    app
    io 
    origin = `http://localhost:3000`
    
    constructor(port) {
        this.port = port
        this.app = express()
        
        this.server = new http.Server(this.app)

        this.io =  new Server(this.server, {
            allowEIO3: false,
            cors: {
                credentials: false, 
                origin: this.origin
            }
        })

        this.clients = {}
        
        this.events()
    }

    events() {
        this.io.on("connection", (socket) => {
            console.log(`Client connect: ${socket.id}`)

            let id = socket.id
            
            this.addClient(socket)
            
            socket.on("disconnect", () => {
                console.log(`Client disconnect: ${socket.id}`)

                this.removeClient(socket)
                socket.broadcast.emit("clientdisconnect", socket.id)
            });
        })
    }

    addClient(socket) {
        socket.broadcast.emit("clientupdate", socket.id)
        socket.emit("clientupdate", socket.id);
        
        this.clients[socket.id] = socket;
    }
    
    removeClient(socket) {
        delete this.clients[socket.id];
    }

    Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`)
        })
    }
}

new App(8008).Start()
