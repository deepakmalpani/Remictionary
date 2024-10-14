import { Circle, Eraser, PaintBucket, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DrawingToolBarProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const DrawingToolbar = ({ canvasRef }: DrawingToolBarProps) => {
  const updateCanvasProperties = (properties: {
    color?: string;
    lineWidth?: number;
  }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      if (properties.color) {
        ctx.strokeStyle = properties.color;
      }
      if (properties.lineWidth) {
        ctx.lineWidth = properties.lineWidth;
      }
    }
  };

  // const onFillToolClick = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   if (ctx  && canvas) {
  //     ctx.fillStyle = 'black';
  
  //     const fillArea = (e: MouseEvent) => {
  //       const rect = canvas.getBoundingClientRect();
  //       console.log(rect);
  //       const x = e.clientX - rect.left;
  //       const y = e.clientY - rect.top;
  //       // ctx.fillRect(x, y, 10, 10); // Adjust the width and height as needed
  //       ctx.fill();
  //   };
  
  //     canvas.addEventListener('mousedown', (e) => {
  //       fillArea(e);
  //       canvas.addEventListener('mousemove', fillArea);
  //     });
  
  //     canvas.addEventListener('mouseup', () => {
  //       canvas.removeEventListener('mousemove', fillArea);
  //     });
  
  //     canvas.addEventListener('mouseout', () => {
  //       canvas.removeEventListener('mousemove', fillArea);
  //     });
  //   }
  // };

  const onFillToolClick = () => {
    const color = 'black';
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
  
    const floodFill = (x: number, y: number, fillColor: string) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const targetColor = getColorAtPixel(data, x, y);

      console.log(targetColor);
  
      if (colorsMatch(targetColor, fillColor)) return;
  
      const stack = [[x, y]];
  
      while (stack.length) {
        const [currentX, currentY] = stack.pop()!;
        const currentPos = (currentY * canvas.width + currentX) * 4;
  
        if (!colorsMatch(getColorAtPixel(data, currentX, currentY), targetColor)) continue;
  
        setColorAtPixel(data, currentX, currentY, fillColor);
  
        if (currentX > 0) stack.push([currentX - 1, currentY]);
        if (currentX < canvas.width - 1) stack.push([currentX + 1, currentY]);
        if (currentY > 0) stack.push([currentX, currentY - 1]);
        if (currentY < canvas.height - 1) stack.push([currentX, currentY + 1]);
      }
  
      ctx.putImageData(imageData, 0, 0);
    };
  
    const getColorAtPixel = (data: Uint8ClampedArray, x: number, y: number) => {
      const pos = (y * canvas.width + x) * 4;
      return [data[pos], data[pos + 1], data[pos + 2], data[pos + 3]];
    };
  
    const setColorAtPixel = (data: Uint8ClampedArray, x: number, y: number, color: string) => {
      const pos = (y * canvas.width + x) * 4;
      const [r, g, b, a] = hexToRgba(color);
      data[pos] = r;
      data[pos + 1] = g;
      data[pos + 2] = b;
      data[pos + 3] = a;
    };
  
    const colorsMatch = (color1: number[], color2: string) => {
      const [r, g, b, a] = hexToRgba(color2);
      return color1[0] === r && color1[1] === g && color1[2] === b && color1[3] === a;
    };
  
    const hexToRgba = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 24) & 255;
      const g = (bigint >> 16) & 255;
      const b = (bigint >> 8) & 255;
      const a = bigint & 255;
      return [r, g, b, a];
    };
  
    const fillArea = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      floodFill(x, y, color);
    };
  
    canvas.addEventListener('mousedown', (e) => {
      fillArea(e);
      canvas.addEventListener('mousemove', fillArea);
    });
  
    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', fillArea);
    });
  
    canvas.addEventListener('mouseout', () => {
      canvas.removeEventListener('mousemove', fillArea);
    });
  };

  return (
    <TooltipProvider>
      <div className="bg-background p-2 border-t flex justify-center">
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  updateCanvasProperties({ color: "black", lineWidth: 5 });
                }}
              >
                <Pencil />
                <span className="sr-only">Pencil tool</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pencil tool</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  updateCanvasProperties({ lineWidth: 2 });
                }}
              >
                <Circle className="h-2 w-2" />
                <span className="sr-only">Small tool size</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Small tool size</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  updateCanvasProperties({ lineWidth: 5 });
                }}
              >
                <Circle className="h-3 w-3" />
                <span className="sr-only">Medium tool size</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Medium tool size</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  updateCanvasProperties({ lineWidth: 10 });
                }}
              >
                <Circle className="h-4 w-4" />
                <span className="sr-only">Large tool size</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Large tool size</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  updateCanvasProperties({color: "white" ,lineWidth: 20 });
                }}
              >
                <Eraser/>
                <span className="sr-only">Eraser tool</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Eraser tool</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  onFillToolClick();
                }}
              >
                <PaintBucket/>
                <span className="sr-only">Fill tool</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Fill tool</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
