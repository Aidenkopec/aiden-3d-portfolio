#!/bin/bash

# Simple script to help set up music for the portfolio
# This creates placeholder files and shows where to get real music

echo "🎵 Setting up music for your portfolio..."

# Create music directory if it doesn't exist
mkdir -p public/music

echo ""
echo "📁 Music directory created at: public/music/"
echo ""
echo "🎶 To add music to your portfolio:"
echo ""
echo "1. Go to Pixabay Music (no account needed):"
echo "   https://pixabay.com/music/"
echo ""
echo "2. Download these 3 tracks and save them as:"
echo "   • deep-space.mp3 (search: 'ambient space')"
echo "   • synthwave-nights.mp3 (search: 'synthwave')" 
echo "   • digital-dreams.mp3 (search: 'digital ambient')"
echo ""
echo "3. Place all MP3 files in the public/music/ folder"
echo ""
echo "4. Refresh your portfolio - the music player will work automatically!"
echo ""
echo "✅ Setup complete! Add your MP3 files and enjoy your musical portfolio."

# Create a simple HTML file with direct links for easy downloading
cat > public/music/download-links.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Free Music Download Links</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #1a1a1a; color: white; }
        .container { max-width: 600px; margin: 0 auto; }
        .link-box { background: #2a2a2a; padding: 20px; margin: 15px 0; border-radius: 8px; }
        a { color: #4CAF50; text-decoration: none; font-weight: bold; }
        a:hover { color: #66BB6A; }
        .filename { color: #FFC107; font-family: monospace; }
        .step { background: #333; padding: 15px; margin: 10px 0; border-left: 4px solid #4CAF50; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎵 Portfolio Music Setup</h1>
        
        <div class="step">
            <h3>Step 1: Download Free Music</h3>
            <p>Click these links to find free music. Download as MP3 format.</p>
        </div>

        <div class="link-box">
            <h4>🌌 Deep Space Ambient</h4>
            <p>Save as: <span class="filename">deep-space.mp3</span></p>
            <a href="https://pixabay.com/music/search/ambient%20space/" target="_blank">
                Search Pixabay for "ambient space" →
            </a>
        </div>

        <div class="link-box">
            <h4>🌃 Synthwave Nights</h4>
            <p>Save as: <span class="filename">synthwave-nights.mp3</span></p>
            <a href="https://pixabay.com/music/search/synthwave/" target="_blank">
                Search Pixabay for "synthwave" →
            </a>
        </div>

        <div class="link-box">
            <h4>💭 Digital Dreams</h4>
            <p>Save as: <span class="filename">digital-dreams.mp3</span></p>
            <a href="https://pixabay.com/music/search/digital%20ambient/" target="_blank">
                Search Pixabay for "digital ambient" →
            </a>
        </div>

        <div class="step">
            <h3>Step 2: Place Files</h3>
            <p>Put all 3 MP3 files in your <strong>public/music/</strong> folder</p>
        </div>

        <div class="step">
            <h3>Step 3: Enjoy!</h3>
            <p>Refresh your portfolio and click the music button in the navbar 🎶</p>
        </div>
    </div>
</body>
</html>
EOF

echo "📄 Created download-links.html - open this file in your browser for easy links!"
echo ""
echo "To open the download helper:"
echo "open public/music/download-links.html"
