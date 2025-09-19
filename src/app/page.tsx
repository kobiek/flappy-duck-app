import { Metadata } from "next";
import FlappyDuck from "@/components/FlappyDuck";

export const metadata: Metadata = {
  title: "Flappy Duck - Farcaster Frame Game",
  description: "Play Flappy Duck game in a Farcaster Frame! Click to make the duck jump and avoid pipes.",
  openGraph: {
    title: "Flappy Duck - Farcaster Frame Game",
    description: "A fun Flappy Bird style game with a duck! Click to play.",
    images: ["https://flappy-duck-app.vercel.app/api/frame/image"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://flappy-duck-app.vercel.app/api/frame/image",
    "fc:frame:button:1": "🎮 Play Flappy Duck",
    "fc:frame:post_url": "https://flappy-duck-app.vercel.app/api/frame",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <FlappyDuck />
    </main>
  );
}