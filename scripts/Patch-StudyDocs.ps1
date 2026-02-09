$docsDir = Join-Path $PSScriptRoot "..\public\study-docs"

function Get-HtmlFiles($dir) {
    Get-ChildItem -Path $dir -Recurse -Filter "*.html"
}

$files = Get-HtmlFiles $docsDir
Write-Host "Found $($files.Count) HTML files."

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false

    # 1. Check/Add Viewport Meta
    if (-not ($content -match '<meta name="viewport"')) {
        $content = $content -replace '</head>', '  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>'
        $modified = $true
    }

    # 2. Adjust Body Padding
    if ($content -match 'padding:\s*2rem;') {
        $content = $content -replace 'padding:\s*2rem;', 'padding: clamp(1rem, 3vw, 2rem);'
        $modified = $true
    }

    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Patched: $($file.Name)"
    }
}

Write-Host "Done."
