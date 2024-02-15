var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');
var ballArray = [];
var ball;
var opicity = 0.04;

function init() {
    for (var i = 0; i < 350; i++) {
        var x = Math.random() * (canvas.width - radius * 2) + radius;
        var y = Math.random() * (canvas.height - radius * 2) + radius;
        var dx = 1;
        var dy = 1;
        var radius = 15;

        if (i != 0) {
            for (var j = 0; j < ballArray.length; j++) {
                if (Distance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0) {
                    x = Math.random() * (canvas.width - radius * 2) + radius;
                    y = Math.random() * (canvas.height - radius * 2) + radius;

                    j = -1;
                }
            }
        }

        ballArray.push(new Ball(x, y, dx, dy, radius));
    }
}
var color = ["red", "blue", "green", "yellow", "purple"];

function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.opicity = opicity;
    this.radius = radius;
    this.color = ["red", "blue", "green", "yellow", "purple"];
    this.indexColor = Math.floor(Math.random() * color.length);

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.globalAlpha = this.opicity;
        c.fillStyle = this.color[this.indexColor];
        c.fill();
        c.restore();
        c.strokeStyle = "black";
        c.globalAlpha = 1;
        c.stroke();

    }
    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.update = function () {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            // Collision detection with other balls
            for (var i = 0; i < ballArray.length; i++) {
                if (this !== ballArray[i]) { // Ensure not checking collision with self
                    var distance = Distance(this.x, this.y, ballArray[i].x, ballArray[i].y);
                    if (distance < this.radius * 2) { // Check for collision
                        // Swap velocities for a simple collision response
                        var tempDx = this.dx;
                        var tempDy = this.dy;
                        this.dx = ballArray[i].dx;
                        this.dy = ballArray[i].dy;
                        ballArray[i].dx = tempDx;
                        ballArray[i].dy = tempDy;
                    }
                }
            }

            this.x += this.dx;
            this.y += this.dy;
            this.draw();

            if (Distance(mouse.x, mouse.y, this.x, this.y) < 100) {
                this.opicity += 0.2;
            }
            else if (this.opicity > 0) {
                this.opicity = 0.04;
            }
        }

    }


}

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
})

function Distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

})


init();





function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }


}
animate();