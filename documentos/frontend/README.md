# 🖥️ Arquitetura do Frontend - The Crazy Island

Este documento serve como guia técnico para o frontend da aplicação **The Crazy Island**.

---

## 🏗️ Visão Geral

O frontend do jogo é implementado como uma aplicação Single Page (SPA) baseada em:
*   **React (v18)** para renderização de interface reativa, controle de rotas de exibição, loja, autenticação fictícia e painel administrativo.
*   **Phaser 3** para o Canvas 2D jogável (fase plataforma).
*   **TailwindCSS** (via CDN) para layout responsivo rápido.
*   **Framer Motion** (via CDN) para micro-animações fluidas no Hero.
*   **Vanilla CSS** (`src/styles.css`) para estilização principal de cores (com suporte a temas), tipografia, efeitos estilo pixel art e painéis de jogo.

---

## 🎨 Design System & Estilização

### 🌗 Temas Claro e Escuro
Os estilos definidos em `src/styles.css` utilizam variáveis CSS vinculadas ao atributo `data-theme` na tag HTML principal. O estado do tema é persistido no `localStorage` sob a chave `crazy-theme`.

Principais variáveis:
- `--background`: Cor principal do plano de fundo.
- `--surface`: Cor dos cartões e painéis.
- `--brand`: Cor de destaque do jogo (geralmente amarelo/ouro ou verde-neon pixelado).
- `--text`: Cor principal das fontes.
- `--muted`: Cor secundária para textos auxiliares.

### 🧩 Efeitos de Interface
- **Pixel-chips:** Elementos visuais com visual pixelado para cartões e inventários.
- **Micro-animações:** O Framer Motion anima a entrada da seção hero (`.hero-content`) com efeito de subida e opacidade gradativa.

---

## 🌐 Internacionalização (i18n)

A tradução está embutida diretamente no código no arquivo [app.js](file:///c:/Users/aluno/OneDrive/Desktop/mdzeira%20aula%2012/src/app.js) em um dicionário chamado `translations` contendo 7 idiomas:
1.  **PT (Português)**
2.  **EN (Inglês)**
3.  **ES (Espanhol)**
4.  **FR (Francês)**
5.  **DE (Alemão)**
6.  **IT (Italiano)**
7.  **JA (Japonês)**

A persistência do idioma do usuário é armazenada no `localStorage` na chave `crazy-lang`.

---

## 🎮 O Motor de Jogo: Phaser 3

A fase 2D plataforma é renderizada no componente React `GameCanvas`.

### ⚡ Características Técnicas:
- **Resolução de Tela:** 960x540 pixels (escala automática com `Phaser.Scale.FIT`).
- **Sistema de Física:** Arcade Physics com gravidade vertical (`gravity: { y: 1150 }`).
- **Controles mapeados:**
  - `Setas` ou `A`/`D`: Movimentação lateral do jogador.
  - `W` ou `Espaço` ou `Seta para Cima`: Pulo (verificando se o jogador está encostando no chão).
  - `K`: Executa um ataque de espada de curto alcance com cooldown de 450ms.

### 👾 Entidades e Métodos Auxiliares:
- `preload()`: Preparação dos recursos visuais (atualmentes renderizados geometricamente em tempo real).
- `create()`: Constrói o cenário, inicializa a colisão de plataformas, spawna inimigos (`Slime`, `Pirata Fantasma`, etc.) e cria o HUD de moedas e HP.
- `update(time)`: Loop principal para leitura de inputs e cálculo de ataque.
- `makeBox(scene, x, y, w, h, color)`: Helper para desenhar caixas de personagens de teste com bordas pretas estilo cartoon.
- `makePlatform(scene, group, x, y, w, h, dirtColor, grassColor)`: Cria plataformas com visual de grama/terra.

---

## 🧩 Componentes React

1.  **`App`**: Gerencia o estado do idioma, tema, modo de autenticação visual (login vs registro) e organiza as seções da página.
2.  **`Header`**: Barra de navegação responsiva com botões para as seções, seletores de idioma e alternador de tema.
3.  **`Hero`**: Landing page principal com chamada para ação ("Jogar Agora") e tipografia estilizada em CSS.
4.  **`GameCanvas`**: Componente de ciclo de vida que inicializa a instância do jogo Phaser no `useEffect` e destrói adequadamente ao desmontar o componente para evitar vazamento de memória.
