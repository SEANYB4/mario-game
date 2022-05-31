


const platformImgSrc = './images/platform.png';
const hillsImgSrc = './images/hills.png';
const backgroundImgSrc = './images/background.png';


const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }


    draw() {
        c.fillStyle = 'red';
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    // Allows us to update the player class over time by way of the animation loop
    update() {
        this.draw();
        // adds velocity and gravity to the player object with each update that runs
        // inside the animation loop
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        } else {
           
        }
        
    }
}

class Platform {
    constructor({
        x, y
    }) {
      this.position = {
            x: x,
            y: y     
      }
      
      this.image = new Image()
      this.image.src = platformImgSrc;
      this.width = this.image.width
      this.height = this.image.height
    }

    draw() {
        c.fillStyle = 'blue';

        c.drawImage(this.image, this.position.x, this.position.y)

    }
}


class GenericObject {
    constructor({
        x, y
    },
    imgSrc
    ) {
      this.position = {
            x: x,
            y: y     
      }
      
      this.image = new Image()
      this.image.src = imgSrc;
      this.width = this.image.width
      this.height = this.image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)

    }
}

let player = new Player()

        let platforms = [new Platform({
            x: 0, y: 470
        }), new Platform({
            x: 500, y: 470
        }), new Platform({
            x: 1500, y: 470
        })
        ]

        let genericObjects = [
            new GenericObject({
                x: -1,
                y: -1
            },
            backgroundImgSrc
            ),
            new GenericObject({
                x: -1,
                y: -1
            },
            hillsImgSrc
            )
        ]


     function init(){
         player = new Player()

         platforms = [new Platform({
            x: 0, y: 470
        }), new Platform({
            x: 500, y: 470
        }), new Platform({
            x: 1500, y: 470
        })
        ]

         genericObjects = [
            new GenericObject({
                x: -1,
                y: -1
            },
            backgroundImgSrc
            ),
            new GenericObject({
                x: -1,
                y: -1
            },
            hillsImgSrc
            )
        ]

}


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}



let scrollOffset = 0;


// creates an animation loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height)
    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })
    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()
    // move player
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5;
    } else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if(keys.right.pressed) {

            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 5;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= 1
            })
            
        } else if (keys.left.pressed) {

            scrollOffset -=5;
            platforms.forEach(platform => {
                platform.position.x += 5;
            })
            
        }
    }

    

// platform collision detection

platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y
        && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x
        && player.position.x <= platform.position.x + platform.width
        ){
        player.velocity.y = 0
    }
})


// win condition
if(scrollOffset > 2000) {
    console.log('You win!!')
}

// lose condition

if(player.position.y > canvas.height){
    console.log('You lose!!')
    init()
}

}



animate()

// adds event listeners
window.addEventListener('keydown', ({keyCode}) => {

        switch (keyCode) {

            case 65:
                console.log('left');
                keys.left.pressed = true;
                break;

            case 83:
                console.log('down');
                break;

            case 68:
                console.log('right');
                keys.right.pressed = true;
                break;

            case 87:
                console.log('up');
                player.velocity.y -= 5
                break;

        }
    


})


window.addEventListener('keyup', ({keyCode}) => {

    switch (keyCode) {

        case 65:
            console.log('left');
            keys.left.pressed = false;
            break;

        case 83:
            console.log('down');
            break;

        case 68:
            console.log('right');
            keys.right.pressed = false;
            break;

        case 87:
            console.log('up');
            player.velocity.y -= 20
            break;

    }



})


