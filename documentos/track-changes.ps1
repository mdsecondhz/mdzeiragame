$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$outputFile = Join-Path $repoPath "modificacoes.md"

$rootPath = Resolve-Path (Join-Path $repoPath "..")
Push-Location $rootPath

$isGit = git rev-parse --is-inside-work-tree 2>$null
if ($isGit -ne "true") {
    "# Modificacoes de Codigo`n`nEste diretorio nao esta dentro de um repositorio Git ou o Git nao esta disponivel.`n" | Out-File -FilePath $outputFile -Encoding utf8
    Write-Host "Nao foi possivel rastrear alteracoes: repositorio Git nao detectado."
    Pop-Location
    exit
}

$timestamp = Get-Date -Format "dd/MM/yyyy HH:mm:ss"
$content = "# Modificacoes de Codigo`n`n"
$content += "> [!NOTE]`n"
$content += "> Relatorio gerado automaticamente em **$timestamp**.`n`n"

$status = git status -s
if (-not $status) {
    $content += "### Estado Atual`n`nNenhuma modificacao nao commitada encontrada. O repositorio esta limpo.`n"
    $content | Out-File -FilePath $outputFile -Encoding utf8
    Write-Host "Nenhuma alteracao encontrada. Arquivo modificacoes.md atualizado."
    Pop-Location
    exit
}

$content += "### Arquivos Alterados`n`n"
$status -split "`n" | ForEach-Object {
    if (-not $_.Trim()) { return }
    $code = $_.Substring(0, 2).Trim()
    $file = $_.Substring(3).Trim()
    $type = ""
    if ($code -eq "M") { $type = "Modificado" }
    elseif ($code -eq "A") { $type = "Adicionado" }
    elseif ($code -eq "D") { $type = "Excluido" }
    elseif ($code -eq "??") { $type = "Nao monitorado" }
    else { $type = "Alterado ($code)" }
    $content += "- **$file** [$type]`n"
}
$content += "`n---`n`n"

$content += "### Detalhes das Modificacoes (Diff)`n`n"

$stagedDiff = git diff --cached
if ($stagedDiff) {
    $content += "#### Alteracoes Prontas para Commit (Staged Diffs)`n`n"
    $content += '```diff' + "`n" + $stagedDiff + "`n" + '```' + "`n`n"
}

$unstagedDiff = git diff
if ($unstagedDiff) {
    $content += "#### Alteracoes em Progresso (Unstaged Diffs)`n`n"
    $content += '```diff' + "`n" + $unstagedDiff + "`n" + '```' + "`n`n"
}

$content | Out-File -FilePath $outputFile -Encoding utf8
Write-Host "Alteracoes salvas em documentos/modificacoes.md com sucesso."
Pop-Location
