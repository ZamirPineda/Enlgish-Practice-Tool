$ErrorActionPreference = "Stop"

$targetDir = Join-Path (Get-Location) "public\study-docs"
$report = @()

Write-Host "Starting Security Audit on: $targetDir"

# regex patterns for secrets
# Using single quotes for strings to avoid escaping issues
$patterns = @{
    'Google API Key' = 'AIza[0-9A-Za-z-_]{35}'
    'OpenAI Key'     = 'sk-[a-zA-Z0-9]{32,}'
    'GitHub Token'   = 'ghp_[a-zA-Z0-9]{36}'
    'AWS Access Key' = 'AKIA[0-9A-Z]{16}'
    'Generic Token'  = '(?i)(api_key|access_token|secret_key)\s*[:=]\s*["''][a-zA-Z0-9_\-]{20,}["'']'
}

# regex for dangerous tags/attributes
$dangerous = @{
    'Script Tag'      = '<script'
    'Iframe Tag'      = '<iframe'
    'Object/Embed'    = '<(object|embed)'
    'Inline Event'    = '\son[a-z]+\s*='
    'Eval Function'   = 'eval\('
    'Cookie Access'   = 'document\.cookie'
}

# Ensure directory exists
if (-not (Test-Path $targetDir)) {
    Write-Error "Directory not found: $targetDir"
    exit 1
}

$files = Get-ChildItem -Path $targetDir -Recurse -Filter "*.html"

Write-Host "Scanning $($files.Count) files..."

foreach ($file in $files) {
    # Replace Join-Path for relative path calculation
    $relativePath = $file.FullName.Substring($targetDir.Length)
    
    try {
        $content = Get-Content -Path $file.FullName -Raw
        $issues = @()

        # Check for secrets
        foreach ($key in $patterns.Keys) {
            if ($content -match $patterns[$key]) {
                $issues += "Found potential $key"
            }
        }

        # Check for dangerous content
        foreach ($key in $dangerous.Keys) {
            if ($content -match $dangerous[$key]) {
                $issues += "Found $key"
            }
        }

        if ($issues.Count -gt 0) {
            # Add to report
            $obj = New-Object PSObject -Property @{
                File = $relativePath
                Issues = $issues -join ", "
            }
            $report += $obj
        }
    }
    catch {
        Write-Warning "Could not read file: $($file.FullName)"
    }
}

if ($report.Count -eq 0) {
    Write-Host "✅ No issues found. 0 files flagged." -ForegroundColor Green
} else {
    Write-Host "⚠️ Security Issues Found in $($report.Count) files:" -ForegroundColor Yellow
    $report | Select-Object File, Issues | Format-Table -AutoSize
}
