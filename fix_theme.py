import os
import glob
import re

files = [
    'd:/2025-2026/Web/my-profile-web/src/views/pages/Home.tsx',
] + glob.glob('d:/2025-2026/Web/my-profile-web/src/views/components/*.tsx')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Remove accentColor declaration correctly handling spaces and newlines
    content = re.sub(r"const accentColor = vibe === 'cyan' \? 'cyan-electric' : 'green-hacker';\n\s*", "", content)
    
    # 2. Specific case in ComplexityMeter
    content = re.sub(r"const glowColor = vibe === 'cyan' \? 'rgba\(0, 242, 255, 0\.5\)' : 'rgba\(0, 255, 65, 0\.5\)';\n\s*", "", content)
    
    # 3. Replace interpolations
    content = content.replace('${accentColor}', 'theme-accent')
    
    # 4. Replace glowColor in ComplexityMeter
    content = content.replace('${glowColor}', 'var(--glow-color)')

    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
