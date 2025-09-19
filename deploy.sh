#!/bin/bash
# Deploy script for Flappy Duck Frame

echo "🚀 Deploying Flappy Duck to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your Frame is now live and ready for Farcaster!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the deployment URL from above"
echo "2. Update NEXT_PUBLIC_URL environment variable on Vercel"
echo "3. Test your Frame at: https://warpcast.com/~/developers/frames"
echo "4. Share in Farcaster posts!"
