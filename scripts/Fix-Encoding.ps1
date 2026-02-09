$docsDir = Join-Path $PSScriptRoot "..\public\study-docs"
$encoding1252 = [System.Text.Encoding]::GetEncoding(1252)

function Get-HtmlFiles($dir) {
    Get-ChildItem -Path $dir -Recurse -Filter "*.html"
}

$files = Get-HtmlFiles $docsDir
Write-Host "Found $($files.Count) HTML files."

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check for the tell-tale sign of double encoding: Ã (U+00C3)
    if ($content -match "\u00C3") {
        Write-Host "Fixing encoding for: $($file.Name)"
        try {
            # Convert the UTF-8 string back to the bytes that created it (assuming it was interpreted as Windows-1252)
            $bytes = $encoding1252.GetBytes($content)
            
            # Write the raw bytes back to the file
            [System.IO.File]::WriteAllBytes($file.FullName, $bytes)
        } catch {
            Write-Error "Failed to fix $($file.Name): $_"
        }
    }
}

Write-Host "Done."
