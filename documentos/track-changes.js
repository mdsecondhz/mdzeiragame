const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const repoPath = path.resolve(__dirname, "..");
const outputFile = path.join(__dirname, "modificacoes.md");

function runGit(cmd) {
  try {
    return execSync(cmd, { cwd: repoPath, encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }).trim();
  } catch (err) {
    return "";
  }
}

function main() {
  const isGit = runGit("git rev-parse --is-inside-work-tree");
  if (isGit !== "true") {
    fs.writeFileSync(
      outputFile,
      "# Modificações de Código\n\nEste diretório não está dentro de um repositório Git ou o Git não está disponível.\n"
    );
    console.log("Não foi possível rastrear alterações: repositório Git não detectado.");
    return;
  }

  const timestamp = new Date().toLocaleString("pt-BR");
  let content = `# Modificações de Código\n\n`;
  content += `> [!NOTE]\n`;
  content += `> Relatório gerado automaticamente em **${timestamp}**.\n\n`;

  // Get status
  const status = runGit("git status -s");
  if (!status) {
    content += `### Estado Atual\n\nNenhuma modificação não commitada encontrada. O repositório está limpo.\n`;
    fs.writeFileSync(outputFile, content);
    console.log("Nenhuma alteração encontrada. Arquivo modificacoes.md atualizado.");
    return;
  }

  content += `### Arquivos Alterados\n\n`;
  const lines = status.split("\n");
  lines.forEach((line) => {
    if (!line.trim()) return;
    const code = line.slice(0, 2).trim();
    const file = line.slice(3).trim();
    let type = "";
    if (code === "M") type = "📝 Modificado";
    else if (code === "A") type = "➕ Adicionado";
    else if (code === "D") type = "❌ Excluído";
    else if (code === "??") type = "❓ Não monitorado";
    else type = `Alterado (${code})`;

    content += `- **${file}** [${type}]\n`;
  });
  content += `\n---\n\n`;

  // Get diff of staged and unstaged changes
  content += `### Detalhes das Modificações (Diff)\n\n`;

  // Staged changes
  const stagedDiff = runGit("git diff --cached");
  if (stagedDiff) {
    content += `#### 📌 Alterações Prontas para Commit (Staged Diffs)\n\n`;
    content += `\`\`\`diff\n${stagedDiff}\n\`\`\`\n\n`;
  }

  // Unstaged changes
  const unstagedDiff = runGit("git diff");
  if (unstagedDiff) {
    content += `#### 🚧 Alterações em Progresso (Unstaged Diffs)\n\n`;
    content += `\`\`\`diff\n${unstagedDiff}\n\`\`\`\n\n`;
  }

  fs.writeFileSync(outputFile, content);
  console.log("Alterações salvas em documentos/modificacoes.md com sucesso.");
}

main();
