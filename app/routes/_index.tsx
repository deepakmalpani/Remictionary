import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remictionary" },
    { name: "description", content: "Lets start drawing!" },
  ];
};

export default function Index() {
  return (
    <div>
    </div>
  );
}