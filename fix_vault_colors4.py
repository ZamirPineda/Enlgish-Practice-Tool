with open("src/pages/VocabularyVaultView.tsx", "r") as f:
    content = f.read()

content = content.replace("bg-accent text-white shadow-[0_20px_45px_-28px_rgba(14,165,233,0.95)]", "bg-sky-800 text-slate-100 shadow-[0_20px_45px_-28px_rgba(14,165,233,0.95)]")
content = content.replace("text-sky-100", "text-sky-900")
content = content.replace("bg-white/5", "bg-white/90")
content = content.replace("border-white/10", "border-sky-900/10")
content = content.replace('text-[10px] tracking-[0.28em] opacity-70', 'text-[10px] tracking-[0.28em] opacity-90')

with open("src/pages/VocabularyVaultView.tsx", "w") as f:
    f.write(content)

with open("src/pages/MathView.tsx", "r") as f:
    content = f.read()

# fix contrast for sky-600 background.
content = content.replace("bg-sky-600 text-white", "bg-sky-700 text-white")

with open("src/pages/MathView.tsx", "w") as f:
    f.write(content)
