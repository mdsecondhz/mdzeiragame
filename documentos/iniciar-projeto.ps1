$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPath = Resolve-Path (Join-Path $scriptPath "..")
$nodeDir = Join-Path $rootPath ".node"
$nodeZip = Join-Path $nodeDir "node.zip"
$nodeFolder = Join-Path $nodeDir "node-v20.11.0-win-x64"

Push-Location $rootPath

# 1. Download do Node.js portatil caso nao exista
if (-not (Test-Path (Join-Path $nodeFolder "node.exe"))) {
    Write-Host "Baixando o Node.js portatil oficial (v20.11.0) para rodar o backend..."
    New-Item -ItemType Directory -Force -Path $nodeDir | Out-Null
    
    # Download
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.11.0/node-v20.11.0-win-x64.zip" -OutFile $nodeZip
    
    Write-Host "Extraindo arquivos do Node.js..."
    Expand-Archive -Path $nodeZip -DestinationPath $nodeDir
    Remove-Item $nodeZip
    Write-Host "Node.js portatil instalado em .node/."
} else {
    Write-Host "Node.js portatil ja esta instalado em .node/."
}

# Temporariamente adiciona a pasta do Node portatil ao PATH do processo atual
# Isso permite que scripts de instalacao do npm encontrem o comando 'node' executavel
$env:PATH = "$nodeFolder;" + $env:PATH
Write-Host "PATH do processo temporariamente atualizado com o caminho do Node portatil."

# 2. Instalar dependencias
Write-Host "Instalando dependencias do projeto (npm install)..."
npm install --no-audit --no-fund

# 3. Iniciar o servidor
Write-Host "Iniciando o servidor backend em http://localhost:3001..."
node server/index.js

Pop-Location
