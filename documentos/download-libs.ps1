$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPath = Resolve-Path (Join-Path $scriptPath "..")
$libsDir = Join-Path $rootPath "src\libs"

if (-not (Test-Path $libsDir)) {
    New-Item -ItemType Directory -Force -Path $libsDir | Out-Null
}

$files = @{
    "tailwind.js"      = "https://cdn.tailwindcss.com"
    "react.js"         = "https://unpkg.com/react@18/umd/react.production.min.js"
    "react-dom.js"     = "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    "babel.js"         = "https://unpkg.com/@babel/standalone/babel.min.js"
    "framer-motion.js" = "https://unpkg.com/framer-motion@10/dist/framer-motion.js"
    "phaser.js"        = "https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"
}

foreach ($filename in $files.Keys) {
    $url = $files[$filename]
    $dest = Join-Path $libsDir $filename
    Write-Host "Baixando $filename..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -TimeoutSec 45
        Write-Host "Salvo: $filename"
    } catch {
        Write-Host "Erro ao baixar $filename. Tentando novamente..."
        try {
            Invoke-WebRequest -Uri $url -OutFile $dest -TimeoutSec 60
            Write-Host "Salvo com sucesso: $filename"
        } catch {
            Write-Host "Falha definitiva ao baixar $filename."
        }
    }
}
