# Nexus Games - Boutique Premium de Jeux Vidéo

## 🎮 Bienvenue sur Nexus Games

Nexus Games est un site web de vente de jeux vidéo complet avec un **design premium** et des fonctionnalités avancées.

## 📁 Structure du Projet

```
nexus-games/
├── index.html          # Page d'accueil avec bannière et jeux en vedette
├── shop.html           # Boutique avec filtres et recherche
├── product.html        # Page détaillée d'un produit
├── cart.html           # Panier d'achat fonctionnel
├── css/
│   ├── styles.css      # Styles de base
│   └── premium.css     # Design premium et animations
├── js/
│   ├── data.js         # Données des jeux, catégories, etc.
│   ├── main.js         # Fonctions principales
│   ├── cart.js         # Gestion du panier
│   ├── shop.js         # Fonctionnalités de la boutique
│   └── product.js      # Page produit
├── images/             # Images des jeux (à ajouter)
└── assets/             # Ressources supplémentaires
```

## ✨ Fonctionnalités

### 🏠 Page d'Accueil
- **Bannière héroïne** avec slider automatique
- **Catégories populaires** avec icônes animées
- **Jeux en vedette** avec filtres (Tous, Nouveaux, Promos, Top Ventes)
- **Nouveautés** en carrousel
- **Top Ventes** avec classement
- **Bannière promotionnelle** avec compte à rebours
- **Newsletter** pour s'abonner aux offres

### 🛒 Boutique
- **Filtres avancés** :
  - Par catégorie (Action, RPG, FPS, etc.)
  - Par plateforme (PC, PS5, Xbox, Nintendo Switch)
  - Par prix (curseur)
  - Par note (5, 4, 3 étoiles)
  - Promotions uniquement
- **Tri** : En vedette, Nouveautés, Prix (croissant/décroissant), Meilleure note, Top Ventes
- **Affichage** : Grille ou Liste
- **Pagination** pour naviguer entre les pages
- **Recherche** par nom ou description

### 🎯 Page Produit
- **Galerie d'images** avec miniature et zoom
- **Informations détaillées** : prix, description, caractéristiques
- **Configuration requise** pour chaque plateforme
- **Onglets** : Détails, Configuration requise, Avis, Médias
- **Système de notation** avec étoiles
- **Avis clients** avec notes
- **Produits similaires** recommandés
- **Ajout au panier** avec sélection de quantité
- **Ajout aux favoris**

### 🛍️ Panier d'Achat
- **Liste des articles** avec images, prix, quantité
- **Mise à jour de la quantité**
- **Suppression d'articles**
- **Résumé de la commande** : sous-total, livraison, remise, total
- **Code promo** fonctionnel (codes : NEXUS20, SAVE10, FREESHIP, GAMEON)
- **Produits recommandés** (cross-sell)
- **Paiement sécurisé** (simulé)

## 🎨 Design Premium

- **Palette de couleurs** modernes et élégantes
- **Effets de gradient** sur les boutons et cartes
- **Animations fluides** (hover, scroll, transitions)
- **Ombres personnalisées** pour la profondeur
- **Design responsive** pour tous les appareils
- **Effets de glow** sur les éléments interactifs
- **Typographie** professionnelle (Inter, Playfair Display)

## 🚀 Comment Utiliser

### 1. Installation

Simplement copiez le dossier `nexus-games` sur votre serveur web ou ouvrez les fichiers directement dans un navigateur.

### 2. Personnalisation

#### Ajouter de nouveaux jeux
Modifiez le fichier `js/data.js` et ajoutez de nouveaux objets dans le tableau `games` :

```javascript
{
    id: 13,
    title: 'Nom du Jeu',
    description: 'Description du jeu...',
    price: 49.99,
    oldPrice: 59.99, // Optionnel pour les promotions
    category: ['action', 'adventure'],
    platform: ['pc', 'ps5'],
    developer: 'Nom du Développeur',
    publisher: 'Nom de l\'Éditeur',
    releaseDate: '2024-01-01',
    rating: 4.5,
    reviewCount: 100,
    isNew: true,
    isOnSale: true,
    discount: 15,
    image: 'URL_de_l\'image',
    images: ['URL1', 'URL2', 'URL3'],
    features: ['Caractéristique 1', 'Caractéristique 2'],
    story: 'Histoire du jeu...',
    gameplay: 'Description du gameplay...'
}
```

#### Modifier les catégories
Modifiez le tableau `categories` dans `js/data.js` :

```javascript
{
    id: 'nouvelle-categorie',
    name: 'Nom de la Catégorie',
    count: 50,
    icon: 'fa-icon-name'
}
```

#### Changer le design
Modifiez les fichiers CSS dans le dossier `css/` :
- `styles.css` : Structure de base
- `premium.css` : Design premium et animations

### 3. Codes Promo Valides

- **NEXUS20** : 20% de réduction
- **SAVE10** : 10% de réduction
- **FREESHIP** : Livraison gratuite
- **GAMEON** : 15% de réduction

## 📱 Compatibilité

- **Desktop** : Chrome, Firefox, Safari, Edge
- **Mobile** : iOS Safari, Chrome pour Android
- **Tablette** : iPad, Android

## 🎯 Fonctionnalités Techniques

- **LocalStorage** pour sauvegarder le panier
- **URL Parameters** pour les filtres et la recherche
- **Lazy Loading** des images (à implémenter)
- **Responsive Design** avec media queries
- **Animations CSS** pour une expérience fluide

## 🔧 Développement

### Prérequis
- Aucun ! Le site fonctionne avec HTML, CSS et JavaScript natif.

### Pour le développement
1. Ouvrez le projet dans votre éditeur de code préféré
2. Utilisez Live Server (extension VS Code) ou tout serveur local
3. Naviguez sur `http://localhost:3000` ou le port de votre choix

## 📊 Statistiques du Projet

- **Pages** : 4 (Accueil, Boutique, Produit, Panier)
- **Jeux** : 12 jeux pré-chargés
- **Catégories** : 8 catégories différentes
- **Plateformes** : 4 plateformes supportées
- **Lignes de code** : ~15 000+ (HTML, CSS, JS)

## 🎁 Fonctionnalités Futures (à implémenter)

- [ ] Système de connexion utilisateur
- [ ] Paiement en ligne réel (Stripe, PayPal)
- [ ] Historique des commandes
- [ ] Système de notation et avis
- [ ] Comparaison de produits
- [ ] Liste de souhaits persistante
- [ ] Notifications en temps réel
- [ ] Chat en direct avec le support

## 📝 Licence

Ce projet est ouvert et peut être utilisé librement pour des projets personnels ou commerciaux.

## 🙏 Remerciements

- Font Awesome pour les icônes
- Google Fonts pour les polices
- Tous les développeurs qui ont inspiré ce design

---

**Nexus Games © 2024** - Votre boutique premium de jeux vidéo
