import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function floodFill() {
  const fillColor = "#000000";
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (!ctx || !canvas) return;

  const dfs = (data, currentX: number, currentY: number, old_color: string, new_color: string) => {
    if( currentX<0 || currentX >= canvas.height || currentY <0 || currentY >= canvas.width) return;
    data = setColorAtPixel(data, currentX, currentY, new_color);
    dfs(data, currentX+1, currentY, old_color, new_color);
  }

}