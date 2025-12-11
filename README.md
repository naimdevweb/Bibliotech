# Bibliotech - Système de Gestion de Bibliothèque Municipale

Application web moderne pour la gestion d'une bibliothèque municipale avec un catalogue de **100 000+ livres** (Big Data).

**Projet CDA (Concepteur Développeur d'Applications) - RNCP 37873**

---

## Technologies

### Frontend
- **React 19** (JavaScript)
- **Vite** (build tool)
- **React Router** (navigation)
- **Axios** (appels API)
- **Tailwind CSS** (styling)

### Backend
- **Laravel 10+** (PHP 8.2+)
- **PostgreSQL** (base de données - optimisé Big Data)
- **Redis** (cache)
- **Laravel Sanctum** (authentification JWT)

### Hébergement
- **Vercel** (frontend)
- **Railway** (backend + PostgreSQL)

---

## Architecture

**Application SPA (Single Page Application) + API REST MVC**

```
Frontend (React)  ←→  API REST (Laravel)  ←→  PostgreSQL + Redis
```

Cette architecture valide le **CCP3** du titre CDA : *Application distribuée multicouche*.

---

## Fonctionnalités

### Pour les lecteurs (utilisateurs)
- Catalogue avec recherche avancée (100k livres)
- Emprunts (21 jours, max 5 simultanés, 3 prolongations possibles)
- Réservations avec file d'attente FIFO
- Notifications automatiques par email

### Pour les bibliothécaires
- Gérer les prêts/retours
- Gérer le catalogue (CRUD livres, import CSV)
- Gérer les adhérents (activation, suspension)

### Pour les administrateurs
- Statistiques complètes
- Export PDF/CSV
- Gestion des utilisateurs

---

## Installation

### Prérequis
- **Node.js 18+** (pour React)
- **PHP 8.2+** (pour Laravel)
- **Composer** (gestionnaire de dépendances PHP)
- **PostgreSQL 14+**
- **Redis** (optionnel pour le cache)

### Installation Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Modifier .env avec l'URL du backend
npm run dev
```

Le frontend sera accessible sur **http://localhost:3000**

### Installation Backend

```bash
cd backend
composer install
cp .env.example .env
# Modifier .env avec les infos BDD PostgreSQL
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Le backend sera accessible sur **http://localhost:8000**

---

## Base de données

### Schéma principal

**Tables :**
- `users` (utilisateurs : lecteurs, bibliothécaires, admins)
- `books` (100 000+ livres)
- `loans` (emprunts)
- `reservations` (réservations)
- `notifications` (historique emails)

**Index PostgreSQL :**
- Index B-tree sur `books.title`, `books.author`, `books.isbn`
- Index GIN full-text pour la recherche avancée
- Index sur les foreign keys

---

## Optimisations Big Data

Pour gérer 100 000+ livres efficacement :

1. **Pagination** : 20 résultats par page maximum
2. **Cache Redis** : recherches fréquentes mises en cache
3. **Indexation PostgreSQL** : index B-tree + GIN full-text
4. **Recherche full-text** : `to_tsvector` PostgreSQL (français)

---

## Tests

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend
php artisan test
```

---

## Déploiement

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy sur Vercel
```

### Backend (Railway)
1. Connecter le repo GitHub à Railway
2. Configurer les variables d'environnement (.env)
3. Ajouter PostgreSQL addon
4. Deploy automatique à chaque push

---

## Conformité CDA (RNCP 37873)

Ce projet valide les **3 blocs de compétences (CCP)** du titre professionnel :

✅ **CCP1 : Interface utilisateur**
- Interface React responsive
- UX/UI accessible (WCAG 2.1 AA)
- Navigation fluide (React Router)

✅ **CCP2 : Persistance des données**
- Base PostgreSQL normalisée (3NF)
- Eloquent ORM
- Optimisations Big Data

✅ **CCP3 : Application distribuée multicouche**
- Architecture SPA + API REST MVC
- Frontend React (couche présentation)
- Backend Laravel (couche métier + données)
- Tests unitaires
- Déploiement CI/CD

---

## Sécurité

- ✅ Authentification JWT (Laravel Sanctum)
- ✅ Mots de passe hachés (bcrypt)
- ✅ Validation des entrées (FormRequest)
- ✅ Protection CSRF
- ✅ HTTPS en production
- ✅ Conformité RGPD (export/suppression données)

---

## Licence

Projet éducatif - CDA 2024-2025

---

## Auteur

**Naim** - Développeur CDA en formation
