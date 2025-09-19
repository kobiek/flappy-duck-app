import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buttonIndex = body?.untrustedData?.buttonIndex;
    
    if (buttonIndex === 1) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/game-image" />
            <meta property="fc:frame:button:1" content="🦆 Jump!" />
            <meta property="fc:frame:button:2" content="🔄 Restart" />
            <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/game" />
          </head>
          <body>
            <h1>Flappy Duck Game Started!</h1>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    }

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/image" />
          <meta property="fc:frame:button:1" content="🎮 Start Game" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame" />
        </head>
        <body>
          <h1>Welcome to Flappy Duck!</h1>
        </body>
      </html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("Frame API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/image" />
        <meta property="fc:frame:button:1" content="🎮 Play Flappy Duck" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame" />
      </head>
      <body>
        <h1>Flappy Duck - Farcaster Frame</h1>
        <p>Click the button below to start playing!</p>
      </body>
    </html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}