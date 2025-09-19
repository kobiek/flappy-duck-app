import { Metadata } from "next";
import FlappyDuck from "@/components/FlappyDuck";

export const metadata: Metadata = {
  title: "Flappy Duck - Farcaster Frame",
  description: "Play Flappy Duck game in a Farcaster Frame",
  openGraph: {
    title: "Flappy Duck",
    description: "A fun Flappy Bird style game with a duck!",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <FlappyDuck />
    </main>
  );
}