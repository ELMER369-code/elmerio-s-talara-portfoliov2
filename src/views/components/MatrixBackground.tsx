import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full window size initially
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?/~';
        const fontSize = 16;
        let columns = Math.ceil(canvas.width / fontSize);
        let drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        let animationFrameId: number;

        const draw = () => {
            // Adds translucent background to create trailing effect
            // We use the navy-deep color (e.g. #020617) with some transparency
            ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Matrix character color is always green as requested
            ctx.fillStyle = '#00ff41';
            ctx.font = `${fontSize}px monospace`;



            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop based on random chance
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            if (!canvasRef.current) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const newCols = Math.ceil(canvas.width / fontSize);
            if (newCols > columns) {
                for (let x = columns; x < newCols; x++) {
                    // Start new columns at random heights
                    drops[x] = Math.random() * (canvas.height / fontSize);
                }
            }
            columns = newCols;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block"
        />
    );
};

export default MatrixBackground;
