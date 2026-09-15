import re

with open("/Users/justin/.gemini/antigravity/brain/a4fe8da0-d893-47d1-92ee-7ec3e905cbe2/pitch_deck.html", "r") as f:
    content = f.read()

# Replace css to enable print on all 8 slides
print_css = """
    @page {
      size: 16in 9in;
      margin: 0;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #0B1413 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .slide {
      display: flex !important;
      width: 16in;
      height: 9in;
      min-height: 9in;
      max-height: 9in;
      page-break-after: always;
      break-after: page;
      box-sizing: border-box;
      padding: 0.6in 1in;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .slide:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
    .fixed { display: none !important; }
"""

content = re.sub(r'<style>.*?</style>', f'<style>{print_css}</style>', content, flags=re.DOTALL)
# Remove navigation script and buttons
content = re.sub(r'<div class="fixed bottom-0.*?</div>\s*<script>.*?</script>', '', content, flags=re.DOTALL)

with open("/Users/justin/Public/projects/AroggyaGram 3/deck_print.html", "w") as f:
    f.write(content)

print("deck_print.html written successfully")
