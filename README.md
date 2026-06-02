# StyleMe.fr — Ton styliste personnel IA 👗✨

Un assistant IA qui simplifie ton matin, optimise ton dressing, et te reconnecte avec les vêtements que tu aimes.

## 🎯 Mission

StyleMe.fr s'engage pour une **consommation mode plus consciente** :
- 🌍 Matin simplifié
- 👔 Dressing optimisé
- 👥 Styles partagés
- 💚 Communauté engagée

Nos conseils personnalisés limitent les achats réflexes et t'aident à mieux porter ce que tu possèdes déjà.

## 🌐 Visite le site

→ **[styleme.fr](https://styleme.fr)**

## 🛠️ Tech Stack

- **Frontend** : HTML5, CSS3 (responsive design)
- **JavaScript** : Vanilla JS (pas de dépendances de runtime)
- **Multi-langue** : FR, EN, DE, ES
- **Testing** : Playwright (Chromium, Firefox, WebKit, Mobile)
- **CI/CD** : GitHub Actions
- **Hosting** : GitHub Pages
- **SEO** : Open Graph, JSON-LD, sitemap.xml

## 🚀 Déploiement

Le site est **déployé automatiquement** sur GitHub Pages à chaque push sur `main`.

### Activer GitHub Pages

1. Va dans **Settings** → **Pages**
2. Choisis **GitHub Actions** comme source
3. Sauvegarde

Le workflow `deploy-pages.yml` se déclenche automatiquement à chaque push sur `main`.

Le domaine custom `styleme.fr` est configuré via `CNAME`.

## 📦 Installation locale

```bash
# Cloner le repo
git clone git@github.com:mehtapke-cmyk/styleme.git
cd styleme

# Installer les dépendances
npm install

# Lancer un serveur local
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

## 🧪 Tests navigateurs

```bash
# Installer les navigateurs (une seule fois)
npm run browsers:install

# Lancer tous les tests
npm run test:browser

# Lancer un navigateur spécifique
npm run test:browser:chromium
npm run test:browser:firefox
npm run test:browser:webkit
npm run test:browser:mobile
```

### Générer les captures d'écran

```bash
npm run test:screenshots
```

Les captures sont écrites dans `screenshots/` (non versionné).

## 📂 Structure du projet

```
styleme/
├── index.html              # Page d'accueil
├── comment-ca-marche.html  # Page "Comment ça marche"
├── conseils.html           # Page "Conseils"
├── comparaison.html        # Page "Pourquoi Styleme"
├── rejoindre.html          # Page "Rejoindre"
├── faq.html                # FAQ
├── credits.html            # Crédits & Team
├── confidentialite.html    # Politique de confidentialité
├── mentions-legales.html   # Mentions légales
│
├── style-v2.css            # CSS principal (responsive)
├── style-mobile-refresh.css # Optimisations mobiles
├── style.css               # CSS fallback
│
├── script.js               # Logic général
├── interactions-v2.js      # Interactions & animations
├── partials-v2.js          # Composants réutilisables
│
├── assets/                 # Images, vidéos, icônes
│   └── video/              # Vidéos MP4
│
├── tests/                  # Tests Playwright
├── screenshots/            # Captures (généré, non versionné)
├── playwright-report/      # Rapport Playwright (généré)
│
├── .github/workflows/      # CI/CD GitHub Actions
│   ├── browser-checks.yml  # Tests navigateurs
│   └── deploy-pages.yml    # Déploiement Pages
│
└── README.md               # Ce fichier
```

## 🎨 Design

- **Thème clair** : Fond blanc/bleu pâle, typographie élégante
- **Palette de couleurs** : Noir, menthe, corail, rose, jaune, bleu
- **Typographie** : Fraunces (titres), Packard/Inter (body)
- **Responsive** : Mobile-first (testé sur 200+ configurations)

## 📊 SEO & Social

- ✅ Open Graph tags (og:title, og:image, etc.)
- ✅ JSON-LD schema (WebSite, Organization)
- ✅ Twitter Card optimisée
- ✅ sitemap.xml pour indexation
- ✅ robots.txt configuré
- ✅ Google Analytics 4 intégré

## 🔧 CI/CD

### Browser Checks (browser-checks.yml)
- S'exécute à chaque PR et push sur `main`/`work`
- Lance les 200+ tests Playwright
- Upload les captures et rapports

### Deploy Pages (deploy-pages.yml)
- S'exécute automatiquement après chaque push sur `main`
- Déploie le site sur GitHub Pages
- URL : `https://styleme.fr`

## 🤝 Contribuer

1. Crée une branche : `git checkout -b feature/ma-feature`
2. Fais tes changements
3. Lance les tests : `npm run test:browser`
4. Crée une PR vers `main`
5. Une fois approuvée, merge et le site se déploie automatiquement !

## 📝 Licence

Voir [LICENSE](LICENSE)

## 👥 Équipe

Créé par Mehtap Keles & Team 💚

---

**Questions ?** Consulte les pages [FAQ](faq.html), [Mentions légales](mentions-legales.html) ou [Confidentialité](confidentialite.html).