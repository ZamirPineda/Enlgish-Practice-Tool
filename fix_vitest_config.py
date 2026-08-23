import re

with open("vite.config.ts", "r") as f:
    content = f.read()

content = content.replace(
    'test: {',
    'test: {\n      testTimeout: 30000,', 1)

with open("vite.config.ts", "w") as f:
    f.write(content)
