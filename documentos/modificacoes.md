# Modificacoes de Codigo

> [!NOTE]
> Relatorio gerado automaticamente em **16/06/2026 15:32:12**.

### Arquivos Alterados

- **index.html** [Modificado]
- **package.json** [Modificado]
- **.gitignore** [Nao monitorado]
- **.node/** [Nao monitorado]
- **documentos/** [Nao monitorado]
- **package-lock.json** [Nao monitorado]
- **src/libs/** [Nao monitorado]

---

### Detalhes das Modificacoes (Diff)

#### Alteracoes em Progresso (Unstaged Diffs)

```diff
diff --git a/index.html b/index.html index 728108e..d39a4d9 100644 --- a/index.html +++ b/index.html @@ -8,12 +8,12 @@        name="description"        content="The Crazy Island ├® uma aventura plataforma 2D com explora├º├úo, combate, evolu├º├úo, loja, conquistas e mundos misteriosos."      /> -    <script src="https://cdn.tailwindcss.com"></script> -    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script> -    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script> -    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> -    <script src="https://unpkg.com/framer-motion@10/dist/framer-motion.js"></script> -    <script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script> +    <script src="src/libs/tailwind.js"></script> +    <script src="src/libs/react.js"></script> +    <script src="src/libs/react-dom.js"></script> +    <script src="src/libs/babel.js"></script> +    <script src="src/libs/framer-motion.js"></script> +    <script src="src/libs/phaser.js"></script>      <link rel="stylesheet" href="src/styles.css" />    </head>    <body> diff --git a/package.json b/package.json index 304baab..d3d5929 100644 --- a/package.json +++ b/package.json @@ -5,7 +5,8 @@    "description": "Landing page, playable 2D platform prototype and production-ready backend scaffold for The Crazy Island.",    "scripts": {      "start": "node server/index.js", -    "dev": "node server/index.js" +    "dev": "node server/index.js", +    "track": "node documentos/track-changes.js"    },    "dependencies": {      "@paypal/checkout-server-sdk": "^1.0.3",
```


