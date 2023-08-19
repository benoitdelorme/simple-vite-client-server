import * as io from 'socket.io-client'

class App {
    constructor() {
        this.DOM = {}
        this.DOM.root = document.querySelector("main")

        this.url = "http://localhost:8008"
        this.socket = io.connect(this.url)

        this.socket.on("clientdisconnect", (data) => {
            const div = document.createElement("div")
            div.innerHTML = `Client disconnect: ${data}`
            this.DOM.root.appendChild(div)
        })
        
        this.socket.on("clientupdate", (data) => {
            const div = document.createElement("div")
            div.innerHTML = `Client connect: ${data}`
            this.DOM.root.appendChild(div)
        })
    }
}

new App()