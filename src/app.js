const { useEffect, useMemo, useRef, useState } = React;
const motion = window.Motion?.motion || window.framerMotion?.motion;

const translations = {
  pt: {
    navPlay: "Jogar",
    login: "Login",
    register: "Registrar",
    heroKicker: "THE",
    heroTitle: "Crazy Island",
    heroText:
      "Uma ilha selvagem cheia de segredos, monstros e tesouros. Minere, construa, explore e sobreviva em um vasto mundo aberto 2D.",
    playNow: "Jogar Agora",
    descriptionTitle: "Aventura de Plataforma 2D",
    description:
      "The Crazy Island é um jogo de plataforma 2D cheio de aventuras, ilhas misteriosas, inimigos desafiadores, tesouros escondidos e batalhas épicas. Explore diferentes regiões da ilha, desbloqueie equipamentos poderosos e torne-se uma lenda.",
    featuresTitle: "Recursos",
    authTitle: "Conta do Jogador",
    email: "E-mail",
    password: "Senha",
    name: "Nome",
    confirmPassword: "Confirmar senha",
    enter: "Entrar",
    google: "Entrar com Google",
    recover: "Recuperar senha",
    gameTitle: "Fase: Praia Inicial",
    gameHelp: "Use A/D ou setas para mover, W/Espaço para pular e K para atacar.",
    shopTitle: "Loja Premium",
    adminTitle: "Painel Administrativo",
    footerTerms: "Termos de Uso",
    footerPrivacy: "Política de Privacidade",
    footerSupport: "Suporte",
    saved: "Sessão simulada salva localmente.",
  },
  en: {
    navPlay: "Play",
    login: "Login",
    register: "Register",
    heroKicker: "THE",
    heroTitle: "Crazy Island",
    heroText: "A wild island full of secrets, monsters and treasure. Mine, build, explore and survive in a vast 2D open world.",
    playNow: "Play Now",
    descriptionTitle: "2D Platform Adventure",
    description:
      "The Crazy Island is a 2D platform game packed with adventure, mysterious islands, challenging enemies, hidden treasures and epic battles. Explore island regions, unlock powerful gear and become a legend.",
    featuresTitle: "Features",
    authTitle: "Player Account",
    email: "Email",
    password: "Password",
    name: "Name",
    confirmPassword: "Confirm password",
    enter: "Sign In",
    google: "Sign in with Google",
    recover: "Recover password",
    gameTitle: "Level: First Beach",
    gameHelp: "Use A/D or arrows to move, W/Space to jump and K to attack.",
    shopTitle: "Premium Shop",
    adminTitle: "Admin Panel",
    footerTerms: "Terms",
    footerPrivacy: "Privacy",
    footerSupport: "Support",
    saved: "Mock session saved locally.",
  },
  es: {
    navPlay: "Jugar",
    login: "Login",
    register: "Registro",
    heroKicker: "THE",
    heroTitle: "Crazy Island",
    heroText: "Una isla salvaje llena de secretos, monstruos y tesoros. Mina, construye, explora y sobrevive en un mundo 2D.",
    playNow: "Jugar Ahora",
    descriptionTitle: "Aventura de Plataforma 2D",
    description:
      "The Crazy Island es un juego de plataforma 2D lleno de aventuras, islas misteriosas, enemigos desafiantes, tesoros ocultos y batallas épicas.",
    featuresTitle: "Recursos",
    authTitle: "Cuenta del Jugador",
    email: "Email",
    password: "Contraseña",
    name: "Nombre",
    confirmPassword: "Confirmar contraseña",
    enter: "Entrar",
    google: "Entrar con Google",
    recover: "Recuperar contraseña",
    gameTitle: "Nivel: Playa Inicial",
    gameHelp: "Usa A/D o flechas para moverte, W/Espacio para saltar y K para atacar.",
    shopTitle: "Tienda Premium",
    adminTitle: "Panel Administrativo",
    footerTerms: "Términos",
    footerPrivacy: "Privacidad",
    footerSupport: "Soporte",
    saved: "Sesión simulada guardada localmente.",
  },
  fr: {
    navPlay: "Jouer",
    login: "Connexion",
    register: "Créer",
    heroKicker: "THE",
    heroTitle: "Crazy Island",
    heroText: "Une île sauvage pleine de secrets, monstres et trésors. Minez, construisez, explorez et survivez en 2D.",
    playNow: "Jouer",
    descriptionTitle: "Aventure Plateforme 2D",
    description:
      "The Crazy Island est un jeu de plateforme 2D rempli d'aventures, d'îles mystérieuses, d'ennemis difficiles, de trésors cachés et de batailles épiques.",
    featuresTitle: "Fonctionnalités",
    authTitle: "Compte Joueur",
    email: "Email",
    password: "Mot de passe",
    name: "Nom",
    confirmPassword: "Confirmer",
    enter: "Entrer",
    google: "Google",
    recover: "Récupérer",
    gameTitle: "Niveau: Plage Initiale",
    gameHelp: "A/D ou flèches pour bouger, W/Espace pour sauter et K pour attaquer.",
    shopTitle: "Boutique Premium",
    adminTitle: "Administration",
    footerTerms: "Conditions",
    footerPrivacy: "Confidentialité",
    footerSupport: "Support",
    saved: "Session simulée enregistrée.",
  },
  de: {
    navPlay: "Spielen",
    login: "Login",
    register: "Registrieren",
    heroKicker: "THE",
    heroTitle: "Crazy Island",
    heroText: "Eine wilde Insel voller Geheimnisse, Monster und Schätze. Erkunde und überlebe in einer 2D-Welt.",
    playNow: "Jetzt Spielen",
    descriptionTitle: "2D-Plattformabenteuer",
    description: "The Crazy Island ist ein 2D-Plattformspiel mit Abenteuern, Inseln, Gegnern, Schätzen und epischen Kämpfen.",
    featuresTitle: "Funktionen",
    authTitle: "Spielerkonto",
    email: "E-Mail",
    password: "Passwort",
    name: "Name",
    confirmPassword: "Passwort bestätigen",
    enter: "Einloggen",
    google: "Mit Google",
    recover: "Passwort zurücksetzen",
    gameTitle: "Level: Startstrand",
    gameHelp: "A/D oder Pfeile bewegen, W/Leertaste springen, K angreifen.",
    shopTitle: "Premium-Shop",
    adminTitle: "Adminbereich",
    footerTerms: "Nutzungsbedingungen",
    footerPrivacy: "Datenschutz",
    footerSupport: "Support",
    saved: "Lokale Demo-Sitzung gespeichert.",
  },
  it: {
    navPlay: "Gioca",
    login: "Login",
    register: "Registrati",
    heroKicker: "THE",
    heroTitle: "Crazy Island",
    heroText: "Un'isola selvaggia piena di segreti, mostri e tesori. Esplora e sopravvivi in un mondo 2D.",
    playNow: "Gioca Ora",
    descriptionTitle: "Avventura Platform 2D",
    description: "The Crazy Island è un platform 2D pieno di avventure, isole misteriose, nemici, tesori e battaglie epiche.",
    featuresTitle: "Funzionalità",
    authTitle: "Account Giocatore",
    email: "Email",
    password: "Password",
    name: "Nome",
    confirmPassword: "Conferma password",
    enter: "Entra",
    google: "Google",
    recover: "Recupera password",
    gameTitle: "Livello: Spiaggia Iniziale",
    gameHelp: "A/D o frecce per muoverti, W/Spazio per saltare e K per attaccare.",
    shopTitle: "Negozio Premium",
    adminTitle: "Pannello Admin",
    footerTerms: "Termini",
    footerPrivacy: "Privacy",
    footerSupport: "Supporto",
    saved: "Sessione demo salvata.",
  },
  ja: {
    navPlay: "プレイ",
    login: "ログイン",
    register: "登録",
    heroKicker: "THE",
    heroTitle: "Crazy Island",
    heroText: "秘密、モンスター、宝物に満ちた野生の島。2Dの世界で探索し、生き残ろう。",
    playNow: "今すぐプレイ",
    descriptionTitle: "2Dプラットフォーム冒険",
    description: "The Crazy Islandは冒険、謎の島、強敵、隠された宝物、壮大な戦いを備えた2Dゲームです。",
    featuresTitle: "機能",
    authTitle: "プレイヤーアカウント",
    email: "メール",
    password: "パスワード",
    name: "名前",
    confirmPassword: "確認",
    enter: "入る",
    google: "Googleでログイン",
    recover: "回復",
    gameTitle: "ステージ: 最初の浜辺",
    gameHelp: "A/Dまたは矢印で移動、W/Spaceでジャンプ、Kで攻撃。",
    shopTitle: "プレミアムショップ",
    adminTitle: "管理パネル",
    footerTerms: "利用規約",
    footerPrivacy: "プライバシー",
    footerSupport: "サポート",
    saved: "デモセッションを保存しました。",
  },
};

const featureKeys = ["Plataforma 2D", "Sistema de evolução", "Loja", "Conquistas", "Missões", "Salvamento em nuvem"];
const enemies = ["Slime", "Pirata Fantasma", "Aranha Gigante", "Guerreiro Tribal", "Morcego Sombrio"];
const bosses = ["Guardião da Floresta", "Kraken Ancestral", "Rei Esqueleto", "Dragão Vulcânico"];
const maps = ["Praia Inicial", "Floresta Tropical", "Caverna Cristalina", "Vulcão Ativo", "Ruínas Perdidas", "Castelo Final"];

function App() {
  const [lang, setLang] = useState(localStorage.getItem("crazy-lang") || "pt");
  const [theme, setTheme] = useState(localStorage.getItem("crazy-theme") || "dark");
  const [mode, setMode] = useState("login");
  const [notice, setNotice] = useState("");
  const t = translations[lang] || translations.pt;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    localStorage.setItem("crazy-theme", theme);
    localStorage.setItem("crazy-lang", lang);
  }, [theme, lang]);

  function handleAuth(event) {
    event.preventDefault();
    localStorage.setItem("crazy-session", JSON.stringify({ mode, at: new Date().toISOString() }));
    setNotice(t.saved);
  }

  return (
    <div className="app-shell">
      <Header t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <Hero t={t} />
      <main>
        <section id="sobre" className="section grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="font-black uppercase text-[color:var(--brand)]">The Crazy Island</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">{t.descriptionTitle}</h2>
            <p className="mt-5 text-xl leading-8 text-[color:var(--muted)]">{t.description}</p>
          </div>
          <div className="panel p-5">
            <div className="grid grid-cols-2 gap-3">
              {maps.map((map, index) => (
                <div key={map} className="pixel-chip bg-[color:var(--surface-solid)] p-4">
                  <span className="text-2xl">{["🏖", "🌴", "💎", "🌋", "🏛", "🏰"][index]}</span>
                  <p className="mt-2 font-black">{map}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="text-4xl font-black">{t.featuresTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureKeys.map((feature, index) => (
              <div key={feature} className="feature-card p-5">
                <div className="mb-4 h-10 w-10 bg-[color:var(--brand)] text-center text-2xl font-black leading-10 text-black">
                  {index + 1}
                </div>
                <h3 className="text-xl font-black">{feature}</h3>
                <p className="mt-2 text-[color:var(--muted)]">
                  Progressão persistente, feedback claro e estrutura pronta para salvar na nuvem.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="jogo" className="section">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black">{t.gameTitle}</h2>
              <p className="mt-2 text-[color:var(--muted)]">{t.gameHelp}</p>
            </div>
            <div className="flex gap-2">
              <span className="btn btn-gold">XP 1280</span>
              <span className="btn">Lv. 4</span>
            </div>
          </div>
          <GameCanvas />
        </section>

        <section id="login" className="section grid gap-8 lg:grid-cols-[0.85fr_1fr]">
          <div className="panel p-6">
            <h2 className="text-3xl font-black">{t.authTitle}</h2>
            <div className="mt-5 flex gap-2">
              <button className={`btn ${mode === "login" ? "btn-primary" : ""}`} onClick={() => setMode("login")}>{t.login}</button>
              <button className={`btn ${mode === "register" ? "btn-primary" : ""}`} onClick={() => setMode("register")}>{t.register}</button>
            </div>
            <form className="mt-5 grid gap-3" onSubmit={handleAuth}>
              {mode === "register" && <input className="auth-input" placeholder={t.name} required />}
              <input className="auth-input" type="email" placeholder={t.email} required />
              <input className="auth-input" type="password" placeholder={t.password} required />
              {mode === "register" && <input className="auth-input" type="password" placeholder={t.confirmPassword} required />}
              <button className="btn btn-primary" type="submit">{mode === "login" ? t.enter : t.register}</button>
              <button className="btn" type="button" onClick={() => setNotice(t.saved)}>{t.google}</button>
              <button className="btn" type="button" onClick={() => setNotice(t.saved)}>{t.recover}</button>
            </form>
            {notice && <p className="mt-4 font-bold text-[color:var(--brand)]">{notice}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {enemies.concat(bosses).map((name) => (
              <div className="admin-card p-4" key={name}>
                <p className="text-sm font-black uppercase text-[color:var(--brand)]">Bestiário</p>
                <h3 className="mt-1 text-xl font-black">{name}</h3>
                <p className="mt-2 text-sm text-[color:var(--muted)]">IA própria, animações, dano escalável e recompensas.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="loja" className="section">
          <h2 className="text-4xl font-black">{t.shopTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["500 moedas", "R$ 9,90"],
              ["1000 moedas", "R$ 16,90"],
              ["Pacote Lendário", "R$ 49,90"],
            ].map(([item, price]) => (
              <div className="shop-card p-6" key={item}>
                <h3 className="text-2xl font-black">{item}</h3>
                <p className="mt-3 text-3xl font-black text-[color:var(--brand)]">{price}</p>
                <button className="btn btn-gold mt-5 w-full" onClick={() => alert("Checkout Stripe/PayPal preparado no backend.")}>
                  Checkout
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin" className="section">
          <h2 className="text-4xl font-black">{t.adminTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Usuários", "Itens", "Loja", "Pagamentos", "Idiomas", "Estatísticas"].map((item) => (
              <div className="admin-card p-5" key={item}>
                <h3 className="text-xl font-black">{item}</h3>
                <p className="mt-2 text-[color:var(--muted)]">Módulo estruturado para rotas protegidas por JWT e perfil admin.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-[color:var(--line)] py-8">
        <div className="footer-inner flex flex-wrap items-center justify-between gap-4">
          <strong>The Crazy Island</strong>
          <div className="flex flex-wrap gap-3 text-sm font-bold text-[color:var(--muted)]">
            <a href="#">{t.footerTerms}</a>
            <a href="#">{t.footerPrivacy}</a>
            <a href="#">{t.footerSupport}</a>
            <a href="#">Discord</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Header({ t, lang, setLang, theme, setTheme }) {
  return (
    <header className="site-header">
      <nav className="nav-inner flex min-h-[74px] flex-wrap items-center justify-between gap-3 py-3">
        <a className="flex items-center gap-3 font-black" href="#">
          <span className="logo-mark" aria-hidden="true"></span>
          <span>The Crazy Island</span>
        </a>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <a className="btn btn-primary" href="#jogo">{t.navPlay}</a>
          <a className="btn" href="#login">{t.login}</a>
          <a className="btn" href="#login">{t.register}</a>
          {Object.keys(translations).map((code) => (
            <button
              key={code}
              className={`btn lang-btn ${lang === code ? "active" : ""}`}
              onClick={() => setLang(code)}
              title={code.toUpperCase()}
            >
              {code.toUpperCase()}
            </button>
          ))}
          <button className="btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Tema">
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero({ t }) {
  const Wrapper = motion?.section || "section";
  const props = motion
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } }
    : {};
  return (
    <section className="hero">
      <div className="hero-art" aria-hidden="true"></div>
      <Wrapper className="hero-content" {...props}>
        <p className="text-4xl font-black tracking-[0.4em] text-[color:var(--brand)] md:text-6xl">{t.heroKicker}</p>
        <h1 className="pixel-title mt-1 text-[clamp(4.2rem,14vw,11.8rem)] leading-[0.82]">Crazy<br />Island</h1>
        <p className="mx-auto mt-8 max-w-4xl text-2xl font-bold leading-9 text-white/90">{t.heroText}</p>
        <div className="mt-9 flex justify-center">
          <a className="btn btn-primary text-lg" href="#jogo">{t.playNow}</a>
        </div>
      </Wrapper>
    </section>
  );
}

function GameCanvas() {
  const container = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (!container.current || !window.Phaser) return;
    const config = {
      type: Phaser.AUTO,
      parent: container.current,
      width: 960,
      height: 540,
      backgroundColor: "#0d1820",
      physics: { default: "arcade", arcade: { gravity: { y: 1150 }, debug: false } },
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: { preload, create, update },
    };

    let player;
    let cursors;
    let keys;
    let enemiesGroup;
    let coins = 0;
    let hp = 100;
    let coinText;
    let hpText;
    let attackCooldown = 0;

    function preload() {}

    function create() {
      const scene = this;
      drawSky(scene);
      const platforms = scene.physics.add.staticGroup();
      makePlatform(scene, platforms, 0, 500, 960, 40, "#235431", "#5dde73");
      makePlatform(scene, platforms, 130, 400, 180, 24, "#235431", "#5dde73");
      makePlatform(scene, platforms, 430, 340, 180, 24, "#235431", "#5dde73");
      makePlatform(scene, platforms, 690, 420, 190, 24, "#235431", "#5dde73");

      player = makeBox(scene, 80, 430, 34, 46, "#19d889");
      player.body.setCollideWorldBounds(true);
      scene.physics.add.collider(player, platforms);

      enemiesGroup = scene.physics.add.group();
      [280, 570, 820].forEach((x, i) => {
        const enemy = makeBox(scene, x, 450 - i * 40, 34, 34, i === 1 ? "#8d5cf6" : "#e14b55");
        enemy.body.setVelocityX(i % 2 ? -70 : 70);
        enemy.body.setBounce(1, 0);
        enemiesGroup.add(enemy);
      });
      scene.physics.add.collider(enemiesGroup, platforms);
      scene.physics.add.overlap(player, enemiesGroup, () => {
        hp = Math.max(0, hp - 0.45);
        hpText.setText(`HP ${Math.ceil(hp)}`);
      });

      const coinsGroup = scene.physics.add.staticGroup();
      [170, 485, 745].forEach((x, i) => {
        const coin = scene.add.rectangle(x, 360 - i * 60, 18, 18, "#f7c94b");
        coin.setStrokeStyle(3, "#875f12");
        coinsGroup.add(coin);
      });
      scene.physics.add.overlap(player, coinsGroup, (p, coin) => {
        coin.destroy();
        coins += 50;
        coinText.setText(`Moedas ${coins}`);
      });

      cursors = scene.input.keyboard.createCursorKeys();
      keys = scene.input.keyboard.addKeys("W,A,D,K,SPACE");
      coinText = scene.add.text(20, 18, "Moedas 0", { fontFamily: "Arial Black", fontSize: "22px", color: "#ffffff" });
      hpText = scene.add.text(20, 48, "HP 100", { fontFamily: "Arial Black", fontSize: "22px", color: "#ffffff" });
      scene.add.text(690, 18, "K = ataque", { fontFamily: "Arial Black", fontSize: "20px", color: "#f7c94b" });
    }

    function update(time) {
      const left = cursors.left.isDown || keys.A.isDown;
      const right = cursors.right.isDown || keys.D.isDown;
      const jump = cursors.up.isDown || keys.W.isDown || keys.SPACE.isDown;
      player.body.setVelocityX(left ? -240 : right ? 240 : 0);
      if (jump && player.body.touching.down) player.body.setVelocityY(-510);
      if (keys.K.isDown && time > attackCooldown) {
        attackCooldown = time + 450;
        const hit = this.add.rectangle(player.x + (player.body.velocity.x >= 0 ? 34 : -34), player.y, 54, 28, "#ffffff", 0.6);
        this.time.delayedCall(110, () => hit.destroy());
        enemiesGroup.getChildren().forEach((enemy) => {
          if (Phaser.Math.Distance.Between(hit.x, hit.y, enemy.x, enemy.y) < 58) enemy.destroy();
        });
      }
    }

    gameRef.current = new Phaser.Game(config);
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div className="game-frame panel" ref={container}></div>;
}

function makeBox(scene, x, y, w, h, color) {
  const box = scene.add.rectangle(x, y, w, h, color);
  box.setStrokeStyle(4, "#08130d");
  scene.physics.add.existing(box);
  return box;
}

function makePlatform(scene, group, x, y, w, h, dirt, grass) {
  const base = scene.add.rectangle(x + w / 2, y + h / 2, w, h, dirt);
  base.setStrokeStyle(3, "#0a1c10");
  const top = scene.add.rectangle(x + w / 2, y + 3, w, 8, grass);
  group.add(base);
  return base;
}

function drawSky(scene) {
  scene.add.rectangle(480, 270, 960, 540, "#17273d");
  scene.add.rectangle(480, 210, 960, 260, "#315a67", 0.45);
  scene.add.circle(805, 70, 34, "#f7c94b", 0.9);
  for (let i = 0; i < 24; i++) {
    scene.add.circle(Phaser.Math.Between(0, 960), Phaser.Math.Between(20, 240), Phaser.Math.Between(1, 3), "#f9f4a6", 0.75);
  }
  scene.add.rectangle(140, 455, 35, 130, "#6d4329");
  scene.add.rectangle(140, 370, 150, 42, "#165c2b");
  scene.add.rectangle(705, 438, 32, 150, "#6d4329");
  scene.add.rectangle(705, 350, 160, 42, "#165c2b");
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
