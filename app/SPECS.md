# Styleme — Specs App : Onboarding progressif + Tribus

> Document de conception de l'application Styleme.fr (PWA).
> Version 1 — juin 2026. À enrichir, ne rien supprimer sans accord.

## 1. Principes

- **Application réservée aux adultes (18 ans ou plus).** L'inscription des mineurs est interdite. Les usages « en famille / enfants » sont une extension envisagée pour plus tard, pas maintenant.
- **PWA installable** (« Ajouter à l'écran d'accueil »), HTML/CSS/JS vanilla, déjà en place dans `app/` avec service worker + manifest. Pas de store pour démarrer.
- **Slow fashion, sans pub, sans incitation à l'achat.** On part du dressing existant.
- **Respect des données (RGPD).** Hébergement en France, consentement explicite, position approximative jamais exacte.

## 2. Onboarding progressif

Le prototype démarre **sans friction** : on garde les 4 étapes existantes (Bienvenue → quiz de style → ville/météo → première photo). Aucun email ni âge n'est demandé pour entrer et tester l'app — « tu décides plus tard ».

**Le compte, l'âge et le GPS ne sont demandés qu'au moment où l'utilisateur veut entrer dans une fonctionnalité sociale** (Tribus, ou proposer une pièce au Troc). C'est le « gate ». Avantage : moins d'abandon à l'entrée, et on ne collecte de données personnelles qu'au moment où elles sont réellement nécessaires (minimisation RGPD).

### Le « gate » (déclenché avant Tribus / Troc)

Trois éléments, dans une fiche unique :

1. **Email (lien magique)** — l'utilisateur saisit son email, reçoit un lien de connexion. Pas de mot de passe. L'email devient **l'identifiant unique** : il permet de retrouver le compte sur n'importe quel appareil.
2. **Confirmation 18+** — case « J'ai 18 ans ou plus ». Obligatoire pour continuer.
3. **Localisation** — activation du GPS, expliquée (« pour trouver des tribus et du troc près de toi »). Opt-in.

### Données et mémoire

- **Prénom** = le nom affiché dans l'app et les tribus (saisi au profil).
- **Tranche d'âge** (à partir de 18) plutôt qu'une date de naissance exacte.
- **Ville** pour la météo ; **GPS** uniquement pour la proximité sociale.
- **Email** = clé du compte. En production : compte côté serveur + jeton de session sur l'appareil. Dans le prototype : `localStorage` (`styleme_member`, `styleme_lang`, etc.).

### Garde-fous RGPD

- Consentement explicite + lien vers `confidentialite.html` au moment du gate.
- **Jamais de position exacte affichée** : on montre une distance approximative (« ~2 km ») et un rayon, pas un point sur une carte.
- Données hébergées en France ; désinscription en un clic.

## 3. Fonctionnalité Tribus (groupes géolocalisés) — 1re fonctionnalité sociale

Une **tribu** est un petit cercle de personnes proches qui partagent un point commun. Trois types :

- **Humeur** — slow, joyeux, posé, audacieux… (ce qui te ressemble aujourd'hui)
- **Quartier** — les gens autour de toi, au sens géographique
- **Style** — capsule wardrobe, lin, vintage, minimaliste…

### Parcours

- **Non-membre** : l'écran Tribus affiche une fiche d'accueil qui explique ce qu'est une tribu et le bouton **« Rejoindre les Tribus »** → ouvre le gate (compte + 18+ + GPS).
- **Membre** : l'écran affiche
  - un bouton **« + Créer une tribu »** (nom, type, rayon : 1 / 5 / 20 km),
  - la **liste des tribus proches** : nom, type, nombre de membres, distance approximative, bouton **Rejoindre**.

### Règles

- **18+ uniquement** (garanti par le gate).
- Proximité affichée en distance approximative, jamais de localisation précise.
- L'utilisateur décide de son niveau d'engagement (silencieux / observateur / actif) — à détailler plus tard.
- Modération et signalement : à concevoir avant l'ouverture publique.

## 4. Ce qui est livré dans le prototype

- **5e onglet « Tribus »** dans la barre de navigation (l'écran et la navigation réutilisent le moteur existant).
- **Écran Tribus** avec ses deux états (non-membre = gate / membre = liste + créer).
- **Deux bottom-sheets** : le gate (email + 18+ + GPS) et « Créer une tribu ».
- **Persistance** via `localStorage` (`styleme_member`) : une fois « entré », l'utilisateur reste membre au rechargement.
- **Données fictives** (tribus d'exemple autour d'Argelès) — l'IA et le backend ne sont pas branchés.
- **i18n** : FR + EN pour les nouveaux textes ; le français sert de repli pour les autres langues (i18n complet 12 langues = à suivre).

## 5. À suivre (prochaines étapes)

- Backend réel : envoi du lien magique, sessions, stockage compte (hébergé FR).
- Vraie géolocalisation + calcul de distance approximative côté serveur.
- Appliquer le même gate au **Troc** (« Proposer une pièce »).
- Modération, signalement, niveaux d'engagement dans les tribus.
- Traduction complète de l'écran Tribus dans les 12 langues.
- Profil utilisateur (prénom, tranche d'âge, ville) éditable.
