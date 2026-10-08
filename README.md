# DAM URL Generator

Générateur d'URL média pour les ressources stockées dans un Digital Asset Management (DAM), avec transformation d'image via Fastly Image Optimizer (Fastly IO).

## Objectif

Cette application permet de construire rapidement une URL de média à partir :

- d'un identifiant media (ID DAM)
- d'un nom de fichier
- d'une extension
- d'un domaine Fastly
- d'un ensemble de paramètres de redimensionnement et d'optimisation

Le rôle de Fastly est alors de traiter la demande, charger le média source, appliquer les paramètres demandés (taille, format, qualité, crop, etc.), puis servir la version transformée.

En bref :

DAM -> ID média -> URL construite -> Fastly -> transformation d'image -> image optimisée envoyée au navigateur

---

## Architecture logique

Le flux est le suivant :

1. Le DAM référence une ressource media avec un identifiant unique.
2. L'application construit une URL structurale du type :
   https://[domaine]/[source]/[mediaId]/[mediaName].[extension]?[parameters]
3. Le CDN Fastly reçoit la requête.
4. Fastly identifie le média source et applique les directives transmises.
5. L'image est redimensionnée, compressée, convertie et mise en cache.
6. Le navigateur reçoit l'image optimisée.

---

## Exemple d'URL générée

```text
https://media.adeo.com/media/12345678/perceuse-sans-fil.jpg?width=400&height=300&fit=crop&format=webp&quality=80
```

Explication :

- domain : media.adeo.com
- source : media
- mediaId : 12345678
- mediaName : perceuse-sans-fil
- extension : jpg
- width=400 : largeur de 400 px
- height=300 : hauteur de 300 px
- fit=crop : recadrage au format demandé
- format=webp : conversion en WebP
- quality=80 : qualité de compression

---

## Utilité de l'application

Cette petite interface est particulièrement utile pour :

- tester rapidement des URLs média sans les écrire à la main
- vérifier les effets de redimensionnement
- préparer des URLs à intégrer dans des templates, des pages CMS, des composants front
- explorer les paramètres Fastly IO sans avoir à mémoriser la syntaxe
- prévisualiser l'image directement dans l'interface

---

## Fonctionnalités

- génération automatique de l'URL à partir des champs saisis
- sélection du domaine
- sélection de la source média
- ajout de paramètres Fastly IO dynamiquement
- aide contextuelle sur chaque paramètre
- mise à jour de l'URL en temps réel
- prévisualisation de l'image
- copie de l'URL dans le presse-papier
- ouverture directe du lien dans un nouvel onglet

---

## Paramètres Fastly IO pris en charge

Les paramètres ci-dessous sont ceux couramment utilisés pour la transformation d'images via Fastly Image Optimizer.

### Redimensionnement

- `width`
  - Redimensionne la largeur de l'image
  - Exemple : `width=400`

- `height`
  - Redimensionne la hauteur de l'image
  - Exemple : `height=300`

- `dpr`
  - Gère la densité de pixels pour les écrans Retina
  - Exemple : `dpr=2`

- `fit`
  - Détermine la façon dont l'image s'adapte au cadre
  - Valeurs courantes : `bounds`, `cover`, `crop`
  - Exemple : `fit=crop`

### Recadrage

- `crop`
  - Coupe une image selon des dimensions et un point de départ
  - Exemple : `crop=300,300,0,0`
  - Exemple de crop depuis le bord gauche : `crop=800,600,0,0`
  - Exemple de crop depuis plusieurs bords : `crop=800,600,100,50` pour retirer 100 px à gauche et 50 px en haut avant le recadrage

- `precrop`
  - Coupe avant le redimensionnement
  - Exemple : `precrop=500,500,100,50`

- `trim`
  - Supprime les pixels sur les bords
  - Exemple : `trim=auto`

### Format et compression

- `format`
  - Change le format de sortie
  - Exemples : `format=webp`, `format=jpg`, `format=png`, `format=gif`

- `quality`
  - Contrôle la qualité de compression
  - Exemple : `quality=80`

- `optimize`
  - Applique des optimisations de compression
  - Exemples : `optimize=low`, `optimize=medium`, `optimize=high`

- `auto`
  - Active une optimisation automatique
  - Exemple : `auto=webp`

### Ajustements visuels

- `brightness`
  - Luminosité
  - Exemple : `brightness=20`

- `contrast`
  - Contraste
  - Exemple : `contrast=-10`

- `saturation`
  - Saturation
  - Exemple : `saturation=80`

- `blur`
  - Flou
  - Exemple : `blur=10`

- `sharpen`
  - Netteté
  - Exemple : `sharpen=2,1,0.5`

- `bw`
  - Conversion en noir et blanc
  - Exemple : `bw=1`

### Orientation / fond / canvas

- `orient`
  - Rotation ou orientation de l'image
  - Exemple : `orient=90`

- `bg-color`
  - Couleur d'arrière-plan
  - Exemple : `bg-color=ffffff`

- `canvas`
  - Ajoute de la zone autour de l'image
  - Exemple : `canvas=300,300`

- `pad`
  - Ajoute des pixels autour de l'image
  - Exemple : `pad=10`

### Métadonnées / filtres

- `metadata`
  - Contrôle la conservation des métadonnées
  - Exemple : `metadata=none`

- `resize-filter`
  - Choisit le filtre de redimensionnement
  - Exemple : `resize-filter=mitchell`

- `viewbox`
  - Paramètre spécifique à certains cas d'utilisation d'image vectorielle

### Paramètres avancés

- `disable`
  - Désactive certaines fonctionnalités par défaut

- `enable`
  - Active des fonctionnalités désactivées par défaut

- `profile`
  - Paramètre lié aux profils de conversion de vidéo/image

- `level`
  - Niveau de traitement ou contraintes de conversion

- `frame`
  - Extrait une frame depuis une image animée

- `canvas`
  - Gère un canvas supplémentaire autour de l'image

---

## Liste complète des paramètres Fastly IO documentés

Pour information, la documentation Fastly image optimizer référence notamment :

- `auto`
- `bg-color`
- `blur`
- `brightness`
- `bw`
- `canvas`
- `contrast`
- `crop`
- `disable`
- `dpr`
- `enable`
- `fit`
- `format`
- `frame`
- `height`
- `level`
- `metadata`
- `optimize`
- `orient`
- `pad`
- `precrop`
- `profile`
- `quality`
- `resize-filter`
- `saturation`
- `sharpen`
- `trim`
- `viewbox`
- `width`

Il existe aussi des headers spécifiques Fastly :

- `X-Fastly-Imageopto-Montage`
- `X-Fastly-Imageopto-Overlay`

---

## Exemples d'usages courants

### 1. Image produit en version mobile

```text
https://media.adeo.com/media/12345678/perceuse-sans-fil.jpg?width=320&height=240&fit=crop&format=webp&quality=75
```

### 2. Image hero avec crop centré

```text
https://media.adeo.com/media/12345678/chaise-design.jpg?width=1200&height=600&fit=crop&format=jpg&quality=85
```

### 3. Image retina pour écran de bureau

```text
https://media.adeo.com/media/12345678/produit.jpg?width=800&dpr=2&format=webp
```

### 4. Image de catalogue avec optimisation sans perte de ratio

```text
https://media.adeo.com/media/12345678/outil.jpg?width=600&fit=bounds&format=webp&quality=80
```

### 5. Image avec fond solide pour rendu de carte

```text
https://media.adeo.com/media/12345678/pack-shot.jpg?width=500&height=500&fit=crop&bg-color=ffffff&format=jpg
```

### 6. Crop à partir d'un bord de l'image

```text
https://media.adeo.com/media/12345678/produit-detail.jpg?crop=800,600,0,0&width=800&height=600&fit=crop&format=webp
```

Dans cet exemple, le crop démarre depuis le bord gauche et le bord haut de l'image source.

### 7. Crop à partir de plusieurs bords

```text
https://media.adeo.com/media/12345678/produit-detail.jpg?crop=900,600,120,80&width=900&height=600&fit=crop&format=jpg
```

Ici, le recadrage part de 120 px depuis le bord gauche et 80 px depuis le bord haut, afin de retirer des marges avant de redimensionner.

---

## Bonnes pratiques

- Utiliser `webp` quand le navigateur le supporte et quand le rendu est acceptable
- Ne pas surcharger les images avec des dimensions inutiles
- Préférer `fit=crop` pour les visuels produits ou marketing
- Réduire la qualité en fonction du contexte visuel
- utiliser `dpr` pour les écrans Retina
- garder des tailles cohérentes selon les breakpoints de design

---

## Remarque importante

Cette application ne rend pas l'image elle-même dans le navigateur. Elle construit une URL qui pointe vers le CDN Fastly. C'est Fastly qui :

- récupère le média source
- applique les paramètres
- génère la variante
- met en cache la version optimisée
- distribue l'image finale

C’est précisément la logique d’un système DAM + CDN + transformation d’images à la demande.

---

## Licence

Ce projet est fourni à des fins d'outillage interne / de démonstration.

---

## Auteurs / contexte

Projet de générateur d'URL média associé à un environnement DAM / Fastly, destiné à faciliter la création et le test de liens d’images redimensionnées.
