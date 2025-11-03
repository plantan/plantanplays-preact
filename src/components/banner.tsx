import { useRef, useEffect } from 'preact/hooks'
import banner_url from '@assets/banner.webp';
import './banner.css'

type Star = {
    x: number,
    y: number,
    r: number,
    alpha: number,
    blinkSpeed: number,
    dx: number,
    dy: number
};

function makeStars(): Star[] {
    const canvas = document.getElementById('star_canvas') as HTMLCanvasElement;
    const starCount = window.innerWidth * 0.1;
    return Array.from({ length: starCount }, (): Star => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.max(0.75, Math.random() * canvas.height * 0.002),
        alpha: Math.random(),
        blinkSpeed: Math.random() * 0.005 + 0.005,
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
    }));
}

function resizeStarCanvas() {
    let canvas = document.getElementById('star_canvas') as HTMLCanvasElement;
    canvas.height = document.getElementById('banner_img')!.clientHeight;
    canvas.width = window.innerWidth;
}

export function Banner() {
    const starsRef = useRef([] as Star[]);

    function animate() {
        const canvas = document.getElementById('star_canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of starsRef.current) {
            // Blink
            s.alpha += s.blinkSpeed;
            if (s.alpha > 1 || s.alpha < 0) s.blinkSpeed *= -1;

            // Drift
            s.x += s.dx;
            s.y += s.dy;
            if (s.x < 0) s.x = canvas.width;
            if (s.x > canvas.width) s.x = 0;
            if (s.y < 0) s.y = canvas.height;
            if (s.y > canvas.height) s.y = 0;

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }

    useEffect(() => {
        resizeStarCanvas();
        window.addEventListener('resize', () => {
            resizeStarCanvas();
            starsRef.current = makeStars();
        });
        starsRef.current = makeStars();
        window.requestAnimationFrame(animate);
    }, []);

    return (
        <div id='banner'>
            <canvas id="star_canvas"></canvas>
            <img src={banner_url} id='banner_img' />
        </div>
    );
}
