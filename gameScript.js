// Criando contante 'canvas' e atribuindo o elemento com o id fornecido no arquivo HTML
const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext('2d')

// Mudando propriedades do canvas
canvas.width = 700;
canvas.height = 500;

console.log(c)

class Player {
    constructor({ position, velocity, rotation }) {
        this.position = position
        this.velocity = velocity
        this.rotation = 0
    }

    draw() {
        c.save()

        ///////// EXPLICAÇÃO - ROTAÇÃO /////////////
        // Nessa parte usamos translate para levar o centro de rotação do canvas para o centro do player
        //Então, o rotate rotaciona o canvas (junto do player) o valor da propriedade rotação, que aumenta com o pressionar das teclas A e D
        
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)
        c.translate(-this.position.x, -this.position.y)
        ////////////////////////

        c.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2, false)
        c.fillStyle = 'red'
        c.fill()

        c.beginPath()
        c.moveTo(this.position.x + 15, this.position.y)
        c.lineTo(this.position.x - 5, this.position.y - 5)
        c.lineTo(this.position.x - 5, this.position.y + 5)
        c.closePath()

        c.strokeStyle = 'white'
        c.stroke()
        c.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const player = new Player({
    position: { x: canvas.width / 2, y: canvas.height / 2 },
    velocity: { x: 0, y: 0 }
})



const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    // Usamos seno e cosseno para definir o quanto ele deve se mover em cada eixo baseado na rotação (em radianos).
    if (keys.w.pressed) {
        player.velocity.x = Math.cos(player.rotation)
        player.velocity.y = Math.sin(player.rotation)
    } else if (!keys.w.pressed) {
        player.velocity.x *= .97
        player.velocity.y *= .97
    }

    if (keys.d.pressed) player.rotation += 0.02 // isso é em radianos, não graus
    else if (keys.a.pressed) player.rotation -= 0.02
}

animate()

console.log(player)

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = true
            break
        case 'KeyA':
            keys.a.pressed = true
            break
        case 'KeyD':
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = false
            break
        case 'KeyA':
            keys.a.pressed = false
            break
        case 'KeyD':
            keys.d.pressed = false
            break
    }

})