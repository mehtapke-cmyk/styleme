# StyleMe

Une plateforme d'échange de vêtements anti-fast-fashion et écoresponsable.

## Description

StyleMe est un site web statique qui promeut l'échange de vêtements pour réduire l'impact environnemental de la fast-fashion. Le site est disponible en français, anglais, allemand et espagnol.

## Fonctionnalités

- Sélecteur de langue en haut à droite
- Bannière informative sur l'anti-fast-fashion
- Images d'inspiration (placards modernes et échanges de vêtements)
- Formulaire de contact envoyant un email

## Comment lancer

Ouvrez `index.html` dans un navigateur web.

## Vérification dans les navigateurs

Le projet inclut Playwright pour vérifier les pages dans Chromium, Firefox, WebKit et un viewport mobile Chrome.

```bash
npm install
npm run browsers:install
npm run test:browser
```

Pour générer uniquement les captures Chromium des pages principales :

```bash
npm run test:screenshots
```


> `npm run browsers:install` installe Chromium, Firefox et WebKit avec les dépendances système nécessaires. Si ces dépendances système sont déjà présentes, utilisez `npm run browsers:install:no-deps`.

Vous pouvez aussi lancer un navigateur précis :

```bash
npm run test:browser:chromium
npm run test:browser:firefox
npm run test:browser:webkit
npm run test:browser:mobile
```

Les captures locales sont écrites dans `screenshots/` et ne sont pas versionnées.

## Technologies

- HTML
- CSS
- JavaScript

## Images

Les images sont chargées depuis Unsplash (libres de droits).