import { NextRequest, NextResponse } from "next/server";

let gameScores: { [key: string]: number } = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buttonIndex = body?.untrustedData?.buttonIndex;
    const fid = body?.untrustedData?.fid || "anonymous";
    
    if (buttonIndex === 1) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/game-image?action=jump" />
            <meta property="fc:frame:button:1" content="🦆 Jump!" />
            <meta property="fc:frame:button:2" content="🔄 Restart" />
            <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/game" />
          </head>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    } else if (buttonIndex === 2) {
      gameScores[fid] = 0;
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/image" />
            <meta property="fc:frame:button:1" content="🎮 Start Game" />
            <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame" />
          </head>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Game API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}