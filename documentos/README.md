# 📂 Pasta de Documentacao - The Crazy Island

Esta pasta centraliza toda a documentacao de arquitetura, modificacoes e instrucoes para guiar o desenvolvimento do projeto **The Crazy Island**.

## 🏗️ Estrutura da Pasta

- [frontend/](file:///c:/Users/aluno/OneDrive/Desktop/mdzeira%20aula%2012/documentos/frontend/README.md): Documentacao detalhada sobre o funcionamento do React, Phaser 3, traducoes e estilos.
- [backend/](file:///c:/Users/aluno/OneDrive/Desktop/mdzeira%20aula%2012/documentos/backend/README.md): Documentacao detalhada sobre o servidor Express, banco de dados PostgreSQL, rotas, seguranca e pagamentos.
- [agente_skill.md](file:///c:/Users/aluno/OneDrive/Desktop/mdzeira%20aula%2012/documentos/agente_skill.md): Prompt customizavel para configurar uma IA para te auxiliar a programar neste repositorio.
- [modificacoes.md](file:///c:/Users/aluno/OneDrive/Desktop/mdzeira%20aula%2012/documentos/modificacoes.md): Relatorio contendo todas as alteracoes nao commitadas de arquivos e diffs.

---

## 🔄 Como atualizar o arquivo de Modificacoes (`modificacoes.md`)

Para gerar ou atualizar automaticamente a lista de arquivos alterados e seus respectivos diffs, execute o seguinte comando no terminal do Windows:

```powershell
powershell -ExecutionPolicy Bypass -File documentos/track-changes.ps1
```

*Se voce configurar o Node.js e o npm no seu PATH no futuro, podera rodar simplesmente:*
```bash
npm run track
```
