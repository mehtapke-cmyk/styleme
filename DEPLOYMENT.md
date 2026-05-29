# 🚀 Guide de Déploiement StyleMe.fr

## Vue d'ensemble

StyleMe.fr est déployé automatiquement sur **GitHub Pages** à chaque push sur la branche `main`.

## Architecture de déploiement

```
main branch (push)
       ↓
[GitHub Actions] browser-checks.yml (tests)
       ↓
[GitHub Actions] deploy-pages.yml (déploiement)
       ↓
GitHub Pages (styleme.fr)
```

## Configuration GitHub Pages

### 1️⃣ Vérifier les settings du repo

1. Va dans **Settings** du repo
2. Scroll vers **Pages** (à gauche)
3. Vérifie la configuration :

```
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

### 2️⃣ Domaine custom (déjà configuré)

- Le fichier `CNAME` contient : `styleme.fr`
- Le DNS doit pointer vers GitHub Pages
- Vérification : `nslookup styleme.fr`

## CI/CD Workflows

### browser-checks.yml
**Déclencheur** : Chaque PR + push sur main/work

```bash
1. Checkout code
2. npm install
3. npm run browsers:install
4. Démarrer serveurs HTTP (ports 8765, 8767)
5. npm run test:browser
6. Upload artifacts (screenshots, rapports)
```

**Durée** : ~2-3 minutes

### deploy-pages.yml
**Déclencheur** : Push sur main (après que browser-checks passe)

```bash
1. Checkout code
2. Upload tous les fichiers comme artifacts
3. Deploy sur GitHub Pages
4. Site disponible à https://styleme.fr
```

**Durée** : ~1 minute

## Déploiement local

Pour tester avant de pusher :

```bash
# 1. Installer dépendances
npm install
npm run browsers:install

# 2. Lancer un serveur
python3 -m http.server 8000
# ou
npx serve .

# 3. Ouvrir http://localhost:8000
```

## Processus de publication

### 🔄 Workflow normal

```bash
# 1. Créer une branche
git checkout -b feature/ma-feature

# 2. Faire des changements
# ... éditer fichiers ...

# 3. Lancer les tests localement
npm run test:browser

# 4. Commiter
git add .
git commit -m "feat: ma-feature"

# 5. Pusher
git push origin feature/ma-feature

# 6. Créer une Pull Request sur GitHub
# → Les tests s'exécutent automatiquement

# 7. Une fois approuvée, merge sur main
# → browser-checks s'exécute
# → deploy-pages s'exécute
# → Site mis à jour ! 🎉
```

### 🚀 Hotfix (urgent)

```bash
# 1. Pusher directement sur main (attention!)
git push origin main

# 2. Les workflows s'exécutent automatiquement
# 3. Site mis à jour en ~3-4 minutes
```

## Vérifications de déploiement

### ✅ Site en ligne

```bash
# Vérifier que le site est accessible
curl -I https://styleme.fr
# → Status: 200 OK

# Ou ouvrir dans le navigateur
open https://styleme.fr
```

### ✅ Vérifier l'OG image

```bash
# Pour les partages réseaux
open "https://www.opengraph.xyz/?url=https://styleme.fr"
```

### ✅ Vérifier les tests

1. Va dans **Actions** du repo GitHub
2. Clique sur le workflow `browser-checks`
3. Vérifie que tous les tests passent ✅

## Troubleshooting

### ❌ Le déploiement n'a pas fonctionné

**Symptôme** : Push sur main mais site pas mis à jour

**Solutions** :
1. Vérifie que les tests passent : regarde **Actions** tab
2. Vérifie la branche : `git branch -a` (doit être `main`)
3. Force push : `git push --force origin main` (attention!)
4. Vérifie le Cache : `curl -I https://styleme.fr` (vérifi cache headers)

### ❌ Les tests échouent

**Symptôme** : PR bloquée, tests rouges

**Solutions** :
1. Lance les tests localement : `npm run test:browser`
2. Regarde le rapport Playwright : **Actions** → artifact `playwright-report`
3. Fix les tests ou met à jour les snapshots
4. Repush

### ❌ Domaine custom ne marche pas

**Symptôme** : CNAME error

**Solutions** :
1. Vérifie `CNAME` (doit être : `styleme.fr`)
2. Vérifie le DNS : `nslookup styleme.fr` (doit pointer vers GitHub Pages)
3. Attends 24-48h pour la propagation DNS

## Monitoring

### Voir les déploiements

1. Va sur **Actions**
2. Clique sur **deploy-pages**
3. Vérifie l'historique des déploiements

### Voir les logs

```bash
# Sur GitHub Actions
1. Actions tab
2. Clique sur le workflow
3. Clique sur le job
4. Scroll pour voir les logs
```

## Performance

### Optimiser les assets

```bash
# Compresser les images
# (avant de pusher)
imagemin assets/ --out-dir=assets/

# Ou manuellement
# PNG: TinyPNG.com, Optipng
# JPEG: TinyJPG.com, Jpegoptim
# Video: Handbrake
```

### Vérifier les timings

```bash
# Audit Lighthouse
open "https://pagespeed.web.dev/?url=https://styleme.fr"

# Vérifier les Core Web Vitals
# → LCP: < 2.5s
# → INP: < 200ms
# → CLS: < 0.1
```

## Sécurité

### 🔐 Secrets & Env vars

- Pas de secrets en dur dans les fichiers !
- Utilise GitHub Secrets pour les API keys
- Vérifie avant de pusher : `git log -p` (search `secret`, `key`, `password`)

### 🔒 Branch protection

Configuré pour `main` :
- ✅ Require PR reviews
- ✅ Require status checks (browser-checks)
- ✅ Dismiss stale PR approvals on push

## FAQ Déploiement

**Q: Comment savoir si mon changement est en production ?**
R: Vérifie **Actions** → `deploy-pages` → dernière run doit être verte ✅

**Q: Puis-je déployer sans tests ?**
R: Non, les tests doivent passer. Si urgent, répare le test ou utilise `git push --force` (risqué!)

**Q: Le site a un cache vieux ?**
R: GitHub Pages a un cache. Attends 5 min ou vide le cache navigateur (Cmd+Shift+R sur Mac)

**Q: Combien de temps prend le déploiement ?**
R: ~3-5 minutes (tests + déploiement)

---

**Besoin d'aide ?** Consulte [README.md](README.md) ou ouvre une issue 💚
