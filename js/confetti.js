document.addEventListener("DOMContentLoaded", function() {
    (function () {
        var canvas = document.getElementById('confetti-canvas');
        var ctx = canvas.getContext('2d');
        var W = window.innerWidth;
        var H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        var colors = [
            "rgba(255, 0, 0, 0.4)",
            "rgba(255, 127, 0, 0.4)",
            "rgba(255, 255, 0, 0.4)",
            "rgba(0, 255, 0, 0.4)",
            "rgba(0, 0, 255, 0.4)",
            "rgba(75, 0, 130, 0.4)",
            "rgba(148, 0, 211, 0.4)"
        ];

        var mp = 75;
        var particles = [];
        for (var i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 10 + 1,
                d: Math.random() * mp,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 10
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            for (var i = 0; i < mp; i++) {
                var p = particles[i];
                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                ctx.stroke();
            }

            update();
        }

        function update() {
            for (var i = 0; i < mp; i++) {
                var p = particles[i];
                p.y += Math.cos(p.d) + 1 + p.r / 2;
                p.x += Math.sin(p.d);

                if (p.x > W + 5 || p.x < -5 || p.y > H) {
                    if (i % 3 > 0) {
                        particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d, color: p.color, tilt: p.tilt };
                    } else {
                        if (Math.sin(p.d) > 0) {
                            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: p.tilt };
                        } else {
                            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: p.tilt };
                        }
                    }
                }
            }
        }

        setInterval(draw, 20);
    })();
});
