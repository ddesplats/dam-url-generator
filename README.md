# dam-url-generator
dam url generator
Générateur d'URL Média & Optimisation Fastly IO

Ce petit outil web permet de construire rapidement des URLs de médias formatées selon la structure standard Adeo/Leroy Merlin, tout en intégrant les paramètres de transformation d'image fournis par l'API Fastly Image Optimizer (IO).🚀 Fonctionnalités principalesConstruction d'URL Structurée : Génère automatiquement une URL valide au format :
https://[domain]/[media source]/[media id]/[free media name].[extension]?[parameters]

Valeurs par défaut intelligentes :
Domaine : media.adeo.com (configurable).Extension : jpg (par défaut).Source : media (valeur par défaut) ou mkp (marketplace).
Intégration Fastly IO : Guide l'utilisateur dans l'ajout de paramètres de transformation (redimensionnement, format, qualité, etc.) sans avoir à connaître par cœur la syntaxe de l'API.
Aide Contextuelle : Chaque paramètre sélectionné dans la liste déroulante affiche une description précise des valeurs attendues et des conseils d'utilisation basés sur la documentation officielle.
Interactivité Temps Réel : L'URL finale est recalculée instantanément à chaque modification de champ ou de paramètre.Actions Rapides :Prévisualisation : Cliquez sur l'URL générée pour tester le rendu direct de l'image dans un nouvel onglet.
Copie en un clic : Bouton dédié pour copier l'URL dans le presse-papier.

🛠️ Paramètres Fastly IO supportés
L'outil intègre les options de transformation les plus utilisées pour optimiser les performances web :

format 
Change le format de fichier en sortie.
webp, pjpg, png, gif

width / height
Redimensionne l'image (pixels ou ratio).
800, 0.5

auto
Automatise l'optimisation (format WebP).
webp

quality
Ajuste le taux de compression (1-100).
85, 60

fit
Définit comment l'image remplit le cadre.
cover, bounds, crop

dpr
Gère la densité de pixels pour les écrans Retina.
2, 3

sharpen
Améliore la netteté des détails.
0.5,2,0
