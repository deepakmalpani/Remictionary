import { useEffect, useRef } from "react";

export const DrawingArea = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e : {offsetX: number, offsetY: number}) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    //Function to draw
    const draw = (e: {offsetX: number, offsetY: number}) => {
        if(!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if(ctx){
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    //Function to end drawing
    const endDrawing = () => {
        isDrawing = false;
    }

    const canvas : HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    //Set initial drawing styles
    if(ctx){
        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
    }

    //Event listeners for drawing
    canvas?.addEventListener('mousedown',startDrawing);
    canvas?.addEventListener('mousemove',draw);
    canvas?.addEventListener('mouseup',endDrawing);
    canvas?.addEventListener('mouseout',endDrawing);

    return () => {
        //Remove event listeners
        canvas?.removeEventListener('mousedown',startDrawing);
        canvas?.removeEventListener('mousemove',draw);
        canvas?.removeEventListener('mouseup',endDrawing);
        canvas?.removeEventListener('mouseout',endDrawing);
    }

  }, []);

  return (
    <canvas
    ref = {canvasRef}
      id="test"
      width="450"
      height="450"
      className="border-solid border-black border"
    ></canvas>
  );
};
