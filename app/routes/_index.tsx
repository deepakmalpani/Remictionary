import type { MetaFunction } from "@remix-run/node";
import { DrawingArea } from "~/components/canvas/drawing-area";

export const meta: MetaFunction = () => {
  return [
    { title: "Remictionary" },
    { name: "description", content: "Lets start drawing!" },
  ];
};

export default function Index() {
  return (
    <div>
      <DrawingArea/>
    </div>
  );
}