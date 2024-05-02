// Criando contante 'canvas' e atribuindo o elemento com o id fornecido no arquivo HTML
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d')

// Mudando propriedades do canvas
canvas.width = 700;
canvas.height = 500;

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)

console.log(ctx)

class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
    }

    draw() {
        ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI*2, false)
        ctx.fillStyle = 'red'
        ctx.fill()
        // ctx.fillRect(this.position.x, this.position.y, 20, 20)
        ctx.moveTo(this.position.x + 15, this.position.y)
        ctx.lineTo(this.position.x - 5, this.position.y - 5)
        ctx.lineTo(this.position.x - 5, this.position.y + 5)
        ctx.closePath()

        ctx.strokeStyle = 'white'
        ctx.stroke()
    }
}

const player = new Player({
    position: {x: canvas.width / 2, y:canvas.height / 2},
    velocity: {x: 0, y:0}
})

player.draw()

console.log(player)