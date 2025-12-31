/**
 * Orbital Lander Mission - Interactive Showcase
 * A lightweight HTML5 Canvas game to demonstrate interactive coding skills.
 */

const GameConfig = {
    gravity: 0.05,
    thrust: -0.15,
    rotationSpeed: 0.05,
    landingVelocity: 1.0,
    landingAngle: 0.2 // radians
};

class LanderGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.gameState = 'START'; // START, PLAYING, SUCCESS, CRASH

        this.ship = {
            x: this.width / 2,
            y: 50,
            vx: 0,
            vy: 0,
            angle: 0,
            fuel: 100,
            thrusting: false,
            rotatingLeft: false,
            rotatingRight: false
        };

        this.terrain = [];
        this.landingPad = { x: 0, width: 0 };

        this.generateTerrain();
        this.attachControls();

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight || 400;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        if (this.gameState === 'START') this.reset();
    }

    generateTerrain() {
        // Simple terrain generation
        this.terrain = [];
        const segments = 10;
        const segmentWidth = this.width / segments;

        // Ensure one flat spot for landing
        const padSegment = Math.floor(Math.random() * (segments - 4)) + 2;

        for (let i = 0; i <= segments; i++) {
            let height = this.height - 20 - Math.random() * 100;
            if (i === padSegment || i === padSegment + 1) {
                height = this.height - 50; // Landing pad height
            }
            this.terrain.push({ x: i * segmentWidth, y: height });
        }

        this.landingPad = {
            x: this.terrain[padSegment].x,
            width: segmentWidth,
            y: this.terrain[padSegment].y
        };
    }

    reset() {
        this.ship = {
            x: this.width / 2,
            y: 50,
            vx: 0,
            vy: 0,
            angle: 0,
            fuel: 100,
            thrusting: false,
            rotatingLeft: false,
            rotatingRight: false
        };
        this.generateTerrain();
        this.gameState = 'START';
    }

    attachControls() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (this.gameState !== 'PLAYING' && e.code === 'Space') {
                this.reset();
                this.gameState = 'PLAYING';
            }
            if (this.gameState !== 'PLAYING') return;

            switch (e.code) {
                case 'Simple':
                case 'ArrowUp': this.ship.thrusting = true; break;
                case 'ArrowLeft': this.ship.rotatingLeft = true; break;
                case 'ArrowRight': this.ship.rotatingRight = true; break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'Space':
                case 'ArrowUp': this.ship.thrusting = false; break;
                case 'ArrowLeft': this.ship.rotatingLeft = false; break;
                case 'ArrowRight': this.ship.rotatingRight = false; break;
            }
        });

        // Touch controls (virtual buttons) - to be bound in HTML
        const thrustBtn = document.getElementById('game-btn-thrust');
        const leftBtn = document.getElementById('game-btn-left');
        const rightBtn = document.getElementById('game-btn-right');
        const startBtn = document.getElementById('game-start-btn');

        if (thrustBtn) {
            thrustBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.ship.thrusting = true; });
            thrustBtn.addEventListener('touchend', (e) => { e.preventDefault(); this.ship.thrusting = false; });
            thrustBtn.addEventListener('mousedown', (e) => { this.ship.thrusting = true; });
            thrustBtn.addEventListener('mouseup', (e) => { this.ship.thrusting = false; });
        }
        if (leftBtn) {
            leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.ship.rotatingLeft = true; });
            leftBtn.addEventListener('touchend', (e) => { e.preventDefault(); this.ship.rotatingLeft = false; });
            leftBtn.addEventListener('mousedown', (e) => { this.ship.rotatingLeft = true; });
            leftBtn.addEventListener('mouseup', (e) => { this.ship.rotatingLeft = false; });
        }
        if (rightBtn) {
            rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.ship.rotatingRight = true; });
            rightBtn.addEventListener('touchend', (e) => { e.preventDefault(); this.ship.rotatingRight = false; });
            rightBtn.addEventListener('mousedown', (e) => { this.ship.rotatingRight = true; });
            rightBtn.addEventListener('mouseup', (e) => { this.ship.rotatingRight = false; });
        }
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.reset();
                this.gameState = 'PLAYING';
                startBtn.classList.add('hidden');
            });
        }
    }

    update() {
        if (this.gameState !== 'PLAYING') return;

        // Physics
        this.ship.vy += GameConfig.gravity;

        if (this.ship.thrusting && this.ship.fuel > 0) {
            this.ship.vx += Math.sin(this.ship.angle) * -GameConfig.thrust; // correct trig direction
            this.ship.vy += Math.cos(this.ship.angle) * GameConfig.thrust;
            this.ship.fuel -= 0.5;
        }

        if (this.ship.rotatingLeft) this.ship.angle -= GameConfig.rotationSpeed;
        if (this.ship.rotatingRight) this.ship.angle += GameConfig.rotationSpeed;

        this.ship.x += this.ship.vx;
        this.ship.y += this.ship.vy;

        // Collision Detection
        // 1. Boundary
        if (this.ship.x < 0 || this.ship.x > this.width || this.ship.y < 0) {
            // Allow going off top, but sides are bounce or wrap? Let's just wrap
            if (this.ship.x < 0) this.ship.x = this.width;
            if (this.ship.x > this.width) this.ship.x = 0;
        }

        // 2. Terrain Ground Check
        // Find segment below ship
        // Simple check: if ship Y > landing pad Y (roughly)

        if (this.ship.y >= this.landingPad.y - 10) {
            // Check if within landing pad X bounds
            if (this.ship.x >= this.landingPad.x && this.ship.x <= this.landingPad.x + this.landingPad.width) {
                // Check velocity and angle
                const safeSpeed = Math.abs(this.ship.vy) < GameConfig.landingVelocity;
                const safeAngle = Math.abs(this.ship.angle) < GameConfig.landingAngle;

                if (safeSpeed && safeAngle) {
                    this.gameState = 'SUCCESS';
                } else {
                    this.gameState = 'CRASH';
                }
            } else if (this.ship.y > this.height - 20) {
                this.gameState = 'CRASH'; // Hit non-pad ground (simplified)
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Terrain
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);
        this.terrain.forEach(p => this.ctx.lineTo(p.x, p.y));
        this.ctx.lineTo(this.width, this.height);
        this.ctx.fillStyle = '#0a1928';
        this.ctx.fill();
        this.ctx.strokeStyle = '#0092CC';
        this.ctx.stroke();

        // Draw Landing Pad
        this.ctx.fillStyle = '#00f3ff';
        this.ctx.fillRect(this.landingPad.x, this.landingPad.y, this.landingPad.width, 5);

        // Draw Ship
        this.ctx.save();
        this.ctx.translate(this.ship.x, this.ship.y);
        this.ctx.rotate(this.ship.angle);

        // Hull
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.moveTo(0, -10);
        this.ctx.lineTo(7, 10);
        this.ctx.lineTo(-7, 10);
        this.ctx.closePath();
        this.ctx.fill();

        // Thrust flame
        if (this.ship.thrusting && this.gameState === 'PLAYING') {
            this.ctx.fillStyle = '#ffaa00';
            this.ctx.beginPath();
            this.ctx.moveTo(-5, 10);
            this.ctx.lineTo(0, 20 + Math.random() * 10);
            this.ctx.lineTo(5, 10);
            this.ctx.fill();
        }
        this.ctx.restore();

        // UI Overlay
        this.ctx.fillStyle = '#white';
        this.ctx.font = '16px monospace';
        // this.ctx.fillText(`FUEL: ${Math.floor(this.ship.fuel)}`, 10, 20);
        // this.ctx.fillText(`VEL Y: ${this.ship.vy.toFixed(2)}`, 10, 40);

        if (this.gameState === 'START') {
            const startBtn = document.getElementById('game-start-btn');
            if (startBtn) startBtn.classList.remove('hidden');
        } else if (this.gameState === 'SUCCESS') {
            this.ctx.fillStyle = '#00f3ff';
            this.ctx.font = '30px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('MISSION ACCOMPLISHED', this.width / 2, this.height / 2);
            this.ctx.font = '16px monospace';
            this.ctx.fillText('Press SPACE to restart', this.width / 2, this.height / 2 + 30);
        } else if (this.gameState === 'CRASH') {
            this.ctx.fillStyle = '#ff0055';
            this.ctx.font = '30px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('MISSION FAILED', this.width / 2, this.height / 2);
            this.ctx.font = '16px monospace';
            this.ctx.fillText('Press SPACE to restart', this.width / 2, this.height / 2 + 30);
        }

    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Only init if canvas exists
    if (document.getElementById('lander-canvas')) {
        new LanderGame('lander-canvas');
    }
});
