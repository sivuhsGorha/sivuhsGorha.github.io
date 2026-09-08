import React, { useEffect, useRef } from 'react';

export default function CyberGlobe() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;

        // Configuration
        const numPoints = 250;
        const connectionDistance = 0.32;
        const globeSizePercent = 0.55;

        let width = 0;
        let height = 0;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotX = 0;
        let targetRotY = 0;

        const resizeCanvas = () => {
            if (!container) return;
            width = container.clientWidth;
            height = container.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        // Fibonacci sphere point generation
        const points = [];
        const phi = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < numPoints; i++) {
            const y = 1 - (i / (numPoints - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            points.push({ x, y, z });
        }

        let time = 0;
        let currentRotX = 0.2;
        let currentRotY = 0;

        const render = () => {
            time += 0.0015;
            
            currentRotX += (targetRotX - currentRotX) * 0.05;
            currentRotY += (targetRotY - currentRotY) * 0.05;

            ctx.clearRect(0, 0, width, height);

            const globeRadius = Math.min(width, height) * globeSizePercent;

            const rotatedPoints = points.map(p => {
                const totalRotY = time + currentRotY;
                const r1_x = p.x * Math.cos(totalRotY) - p.z * Math.sin(totalRotY);
                const r1_z = p.x * Math.sin(totalRotY) + p.z * Math.cos(totalRotY);
                const r1_y = p.y;

                const totalRotX = 0.3 + currentRotX;
                const r2_y = r1_y * Math.cos(totalRotX) - r1_z * Math.sin(totalRotX);
                const r2_z = r1_y * Math.sin(totalRotX) + r1_z * Math.cos(totalRotX);
                const r2_x = r1_x;

                return { x: r2_x, y: r2_y, z: r2_z };
            });

            ctx.lineWidth = 1;
            for (let i = 0; i < rotatedPoints.length; i++) {
                for (let j = i + 1; j < rotatedPoints.length; j++) {
                    const p1 = rotatedPoints[i];
                    const p2 = rotatedPoints[j];
                    const d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);

                    if (d < connectionDistance) {
                        const zAvg = (p1.z + p2.z) / 2;
                        const opacity = Math.max(0.02, (zAvg + 1) / 2);
                        
                        ctx.strokeStyle = `rgba(138, 43, 226, ${opacity * 0.45})`; 
                        ctx.beginPath();
                        ctx.moveTo(width / 2 + p1.x * globeRadius, height / 2 + p1.y * globeRadius);
                        ctx.lineTo(width / 2 + p2.x * globeRadius, height / 2 + p2.y * globeRadius);
                        ctx.stroke();
                    }
                }
            }

            rotatedPoints.forEach(p => {
                const zScale = (p.z + 1) / 2;
                const opacity = Math.max(0.1, zScale);
                const size = Math.max(0.5, zScale * 2.8);

                ctx.fillStyle = `rgba(227, 168, 87, ${opacity})`;
                ctx.beginPath();
                ctx.arc(width / 2 + p.x * globeRadius, height / 2 + p.y * globeRadius, size, 0, Math.PI * 2);
                ctx.fill();

                if (zScale > 0.85) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
                    ctx.beginPath();
                    ctx.arc(width / 2 + p.x * globeRadius, height / 2 + p.y * globeRadius, size * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const mx = (e.clientX - rect.left) / width - 0.5;
            const my = (e.clientY - rect.top) / height - 0.5;
            
            targetRotY = mx * 1.5;
            targetRotX = my * 1.5;
        };

        const handleMouseLeave = () => {
            targetRotX = 0;
            targetRotY = 0;
        };

        resizeCanvas();
        render();

        window.addEventListener('resize', resizeCanvas);
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                width: '100%', 
                height: '100%', 
                minHeight: '450px', 
                position: 'relative', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'crosshair',
                overflow: 'hidden'
            }}
        >
            <canvas 
                ref={canvasRef} 
                style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%',
                    pointerEvents: 'none'
                }} 
            />
            <div 
                style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.08) 0%, transparent 55%)',
                    pointerEvents: 'none'
                }} 
            />
        </div>
    );
}
