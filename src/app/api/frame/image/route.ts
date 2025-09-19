import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="1200" height="630" fill="url(#skyGradient)"/>
      
      <circle cx="200" cy="100" r="40" fill="white" opacity="0.8"/>
      <circle cx="230" cy="90" r="50" fill="white" opacity="0.8"/>
      <circle cx="260" cy="100" r="40" fill="white" opacity="0.8"/>
      
      <circle cx="800" cy="150" r="35" fill="white" opacity="0.8"/>
      <circle cx="825" cy="140" r="45" fill="white" opacity="0.8"/>
      <circle cx="850" cy="150" r="35" fill="white" opacity="0.8"/>
      
      <rect x="400" y="0" width="80" height="200" fill="#228B22"/>
      <rect x="400" y="350" width="80" height="280" fill="#228B22"/>
      
      <rect x="700" y="0" width="80" height="150" fill="#228B22"/>
      <rect x="700" y="300" width="80" height="330" fill="#228B22"/>
      
      <rect x="0" y="580" width="1200" height="50" fill="#8B4513"/>
      
      <circle cx="300" cy="300" r="40" fill="#FFD700"/>
      <rect x="340" y="290" width="20" height="12" fill="#FFA500"/>
      <circle cx="285" cy="285" r="6" fill="#000"/>
      
      <text x="600" y="100" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#2563EB">Flappy Duck</text>
      <text x="600" y="160" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="#1E40AF">A Farcaster Frame Game</text>
      
      <text x="600" y="480" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="#374151">Click to make the duck fly!</text>
      <text x="600" y="520" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#6B7280">Avoid the pipes and get the highest score</text>
    </svg>
  `;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}