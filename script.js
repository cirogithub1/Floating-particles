const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

// constructor fuction

function Particle(
	x = 100,
	y = 100,
	directionX = 1,
	directionY = 1,
	size = 20,
	color = "white",
) {
	this.x = x;
	this.y = y;
	this.directionX = directionX;
	this.directionY = directionY;
	this.size = size;
	this.color = color;
}

// Add "draw" methode to Particle
Particle.prototype.draw = function () {
	// console.log(this.x, this.y, this.size, canvas.height, canvas.width);
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
	var gradient = ctx.createLinearGradient(
		this.x,
		this.y,
		this.x + this.size,
		this.y + this.size,
	);
	gradient.addColorStop(0, this.color);
	gradient.addColorStop(1, "cyan");
	ctx.fillStyle = gradient;
	ctx.fill();
};

// Add "update" methode to Particle
Particle.prototype.update = function () {
	if (this.x + this.size > canvas.width || this.x - this.size < 0) {
		if ((canvas.width - this.x) < (this.size - 1)) {
			this.x = this.x - this.size
		}

		this.directionX = -this.directionX;
	}

	if (this.y + this.size > canvas.height || this.y - this.size < 0) {
		if ((canvas.height - this.y) < (this.size - 1)) {
			this.y = this.y - this.size
		}

		this.directionY = -this.directionY;
	}
	
	this.x += this.directionX;
	this.y += this.directionY;
	this.draw();
}

// initialize variables
function init(params) {
	particleArray = [];
	const colorArray = [
		"white",
		"blue",
		"bisque",
		"green",
		"chartreuse",
		"black",
		"red",
		"coral",
		"yellow",
	];
	for (let i = 0; i < innerWidth / 8; i++) {
		const xcolor = Math.floor(Math.random() * 9);
		let size = 10 + Math.random() * 20;
		let x = Math.random() * innerWidth + size;
		let y = Math.random() * innerHeight + size;
		let directionX = Math.random() * 0.4 - 0.2;
		let directionY = Math.random() * 0.4 - 0.4;
		let color = colorArray[xcolor];
		particleArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

//animation loop
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].update();
	}
}

init();
animate();

window.addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});
