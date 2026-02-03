import React, { useEffect, useRef, useMemo } from 'react';

interface WaveformProps {
  pulseData: string;
}

const Waveform: React.FC<WaveformProps> = ({ pulseData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  // Pre-calculate smoothed data to create organic curves
  const smoothedData = useMemo(() => {
     if (!pulseData) return [];
     const raw = pulseData.split('').map(d => d === '1' ? 1 : 0);
     const smoothed = [];
     const windowSize = 8; // Smoother
     
     for (let i = 0; i < raw.length; i++) {
         let sum = 0;
         let count = 0;
         for (let j = -windowSize; j <= windowSize; j++) {
             const idx = i + j;
             if (idx >= 0 && idx < raw.length) {
                 const weight = 1 - (Math.abs(j) / (windowSize + 1));
                 sum += raw[idx] * weight;
                 count += weight;
             }
         }
         smoothed.push(sum / count);
     }
     return smoothed;
  }, [pulseData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
           canvas.width = rect.width * dpr;
           canvas.height = rect.height * dpr;
           ctx.scale(dpr, dpr);
        }
        
        const width = rect.width;
        const height = rect.height;
        
        ctx.clearRect(0, 0, width, height);

        // Background: Deep Dark Gray
        ctx.fillStyle = '#18181b'; // zinc-900
        ctx.fillRect(0, 0, width, height);
        
        if (smoothedData.length === 0) {
             animationRef.current = requestAnimationFrame(render);
             return;
        }

        // Config
        const pointSpacing = 5; 
        const speed = 2;
        offsetRef.current -= speed; // Move Left to Right
        
        // Draw Curves
        const drawCurve = (phaseShift: number, opacity: number, thickness: number) => {
             ctx.beginPath();
             const centerY = height / 2;
             
             // Iterate across screen width
             for (let x = 0; x <= width + pointSpacing; x += pointSpacing) {
                 // Dynamic index based on flow
                 const scrollX = x + offsetRef.current + phaseShift;
                 
                 const dataIndex = Math.floor(scrollX / pointSpacing) % smoothedData.length;
                 const rawIndex = dataIndex < 0 ? dataIndex + smoothedData.length : dataIndex;
                 const val = smoothedData[rawIndex] || 0;
                 
                 // Combine Signal Data with a gentle Sine Wave for the "rest" state movement
                 const baseAmplitude = height * 0.4;
                 const signalComponent = val * baseAmplitude;
                 
                 // Continuous sine wave that moves independently of data
                 const sineComponent = Math.sin((x + offsetRef.current * 0.5) * 0.01 + (phaseShift * 0.01)) * (height * 0.05);
                 
                 const y = centerY - signalComponent + sineComponent; // Invert signal for up = high
                 
                 if (x === 0) ctx.moveTo(x, y);
                 else {
                     // Bezier curve for smoothness could be better, but lineTo with high point density is fine
                     ctx.lineTo(x, y);
                 }
             }

             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
             ctx.lineWidth = thickness;
             ctx.lineJoin = 'round';
             ctx.lineCap = 'round';
             ctx.shadowColor = 'white';
             ctx.shadowBlur = 10;
             ctx.stroke();
             ctx.shadowBlur = 0;
        };

        // Draw Layer 2 (Ghost/Secondary Wave) - darker, slightly offset
        drawCurve(150, 0.4, 2);
        
        // Draw Layer 1 (Main Wave) - bright
        drawCurve(0, 0.9, 3);
        
        // Glass Reflection (Diagonal Shine) calculated in CSS primarily, 
        // but we can add subtle canvas overlay if needed.
        
        animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
        cancelAnimationFrame(animationRef.current);
    };
  }, [smoothedData]);

  if (!pulseData) return null;

  return (
    <div className="w-full">
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#18181b] shadow-2xl group border border-white/10">
         {/* Canvas Layer */}
         <canvas 
            ref={canvasRef} 
            className="w-full h-full block"
            style={{ width: '100%', height: '100%' }}
         />
         
         {/* UI Overlays matching reference */}
         <div className="absolute top-4 left-5 text-xs text-white/40 tracking-widest font-medium pointer-events-none">
            SIGNAL VISUALIZATION
         </div>
         
         <div className="absolute bottom-4 right-5 flex items-center gap-2 pointer-events-none">
             {/* Audio icon simulation */}
             <div className="flex gap-0.5 items-end h-3">
                 <div className="w-0.5 h-1 bg-white/40 animate-[pulse_1s_ease-in-out_infinite]"></div>
                 <div className="w-0.5 h-3 bg-white/40 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                 <div className="w-0.5 h-2 bg-white/40 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
             </div>
             <span className="text-xs text-white/40 tracking-widest font-medium">LIVE DATA</span>
         </div>
         
         {/* Glass Shine Effect - Diagonal Reflection */}
         <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-linear-to-br from-transparent via-white/5 to-transparent rotate-12 pointer-events-none" />
         
         {/* Inner Glow Borders */}
         <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
         
         {/* Edge Highlights */}
         <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
         <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default Waveform;
