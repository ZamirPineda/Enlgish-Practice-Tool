$ErrorActionPreference = "Stop"

$source = "G:\Estudio"
# Resolve absolute path for destination
$dest = Join-Path (Get-Location) "public\study-docs"
$indexFile = Join-Path $dest "index.json"

Write-Host "Source: $source"
Write-Host "Dest: $dest"

# Ensure destination exists
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
}

# Use Robocopy for robust copying
# Robocopy returns exit codes that are not always 0 for success (e.g. 1 means files copied).
# We can wrap it to ignore non-error codes (< 8).
Write-Host "Copying files using Robocopy..."
$robocopyOptions = @("/E", "/XO", "/NFL", "/NDL", "/R:0", "/W:0", "/MT:8")
$p = Start-Process -FilePath "robocopy" -ArgumentList (@($source, $dest) + $robocopyOptions) -Wait -PassThru
if ($p.ExitCode -ge 8) {
    Write-Error "Robocopy failed with exit code $($p.ExitCode)"
} else {
    Write-Host "Robocopy completed successfully."
}

# Define recursive function to build index
function Get-DirTree {
    param (
        [string]$Path,
        [string]$RelativePath
    )

    # Get-ChildItem might fail on very long paths without \\?\ prefix.
    # We'll use the literal path from the input.
    # Note: For long paths, we might need to prefix with \\?\ if relying on standard .NET methods, 
    # but PowerShell Core is better. Let's try standard first.
    
    $items = Get-ChildItem -Path $Path -Force
    $result = @()

    foreach ($item in $items) {
        $itemRelativePath = if ($RelativePath) { "$RelativePath/$($item.Name)" } else { $item.Name }
        
        if ($item.PSIsContainer) {
            $children = Get-DirTree -Path $item.FullName -RelativePath $itemRelativePath
            $result += @{
                name = $item.Name
                type = "directory"
                path = $itemRelativePath
                children = $children
            }
        } elseif ($item.Name -like "*.html") {
            $result += @{
                name = $item.Name
                type = "file"
                path = $itemRelativePath
            }
        }
    }
    return $result
}

Write-Host "Generating index..."
$tree = Get-DirTree -Path $dest
$json = $tree | ConvertTo-Json -Depth 20
Set-Content -Path $indexFile -Value $json -Encoding UTF8
Write-Host "Index generated at $indexFile"
