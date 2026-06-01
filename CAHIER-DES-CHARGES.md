# APPLICATION WEB DE GESTION DE BIBLIOTHÈQUE MUNICIPALE
## CAHIER DES CHARGES

---

**Projet réalisé dans le cadre du titre professionnel**
**Concepteur Développeur d'Applications (RNCP 37873)**

**Candidat :** Naim H.
**Formation :** CDA - Garage404
**Formateur :** Jeremy (jeremy@garage404.com)
**Date :** Janvier 2026
**Version :** 1.0

---

## 📑 SOMMAIRE

1. [Présentation de l'entreprise](#1-présentation-de-lentreprise)
2. [Votre Projet](#2-votre-projet)
3. [Objectifs](#3-objectifs)
4. [Fonctionnalités](#4-fonctionnalités)
5. [Besoins connexes](#5-besoins-connexes)
6. [Contraintes techniques](#6-contraintes-techniques)
7. [Pages & Arborescence](#7-pages--arborescence)
8. [Design](#8-design)
9. [Déroulement du projet](#9-déroulement-du-projet)

---

## 1. PRÉSENTATION DE L'ENTREPRISE

### Nom de l'entreprise
**Bibliothèque Municipale de [Ville]**
*(Projet fictif à visée pédagogique pour validation du titre CDA)*

### Année de création
Fondée en 1985

### Nombre d'employés
- 1 directeur/directrice
- 3 bibliothécaires
- 1 personnel administratif

### Site internet actuel
Aucun (système actuel : fiches papier)

### Secteur d'activité
☑ **Autre :** Culture et service public - Gestion de médiathèque

### Présentation de l'activité

La bibliothèque municipale est un établissement public qui met à disposition des habitants un catalogue de livres en prêt gratuit. Avec plus de 40 ans d'existence, elle joue un rôle central dans la vie culturelle locale en facilitant l'accès à la lecture pour tous.

Actuellement, la bibliothèque fonctionne avec un système de gestion manuelle basé sur des fiches papier. Les lecteurs doivent se déplacer physiquement pour :
- Consulter le catalogue disponible
- Vérifier la disponibilité d'un livre
- Emprunter et rendre des ouvrages
- S'inscrire ou renouveler leur adhésion

Cette méthode traditionnelle présente plusieurs limites :
- Perte de temps pour le personnel (tâches administratives répétitives)
- Manque de visibilité pour les lecteurs (impossible de savoir à distance si un livre est disponible)
- Risque d'erreurs humaines dans la gestion des prêts
- Difficulté à suivre les retards et les livres perdus
- Absence de statistiques fiables pour optimiser les acquisitions

Face à ces défis et dans une démarche de modernisation, la bibliothèque souhaite se doter d'une application web complète qui facilitera la vie des lecteurs et optimisera le travail du personnel.

### Principaux concurrents / Références

**Solutions professionnelles existantes :**
- **PMB (PhpMyBibli)** - Solution open-source pour bibliothèques - https://www.sigb.net/
- **Koha** - Système intégré de gestion de bibliothèque - https://koha-community.org/

**Plateformes grand public de référence :**
- **Babelio** - Réseau social de lecteurs - https://www.babelio.com/
- **Goodreads** - Plateforme de recommandation de livres - https://www.goodreads.com/
- **Catalogue BnF** - Bibliothèque nationale de France - https://catalogue.bnf.fr/

Ces plateformes serviront d'inspiration pour l'UX/UI, notamment pour :
- L'affichage visuel du catalogue avec couvertures
- Le système de recherche et de filtres
- Les fiches détaillées de livres
- Le système d'avis et de notation

---

## 2. VOTRE PROJET

### Description du projet

Ce projet naît d'un double besoin : moderniser la gestion d'une bibliothèque municipale tout en validant mes compétences dans le cadre du titre professionnel Concepteur Développeur d'Applications (CDA - RNCP 37873).

**Contexte :**

Depuis plusieurs mois, je suis en formation CDA et je dois présenter un projet de fin de formation devant un jury. J'ai choisi de développer une application web complète de gestion de bibliothèque car ce projet me permet de démontrer toutes les compétences attendues du référentiel CDA :

- **CCP1 - Interface utilisateur :** Créer une interface moderne, responsive et accessible
- **CCP2 - Persistance des données :** Concevoir et gérer une base de données relationnelle complexe
- **CCP3 - Application multicouche :** Développer une architecture SPA + API REST MVC

**Challenge technique particulier :**

J'ai volontairement complexifié le projet en intégrant un catalogue de **100 000 livres** (données réelles issues de l'API OpenLibrary). Ce challenge Big Data me permettra de démontrer mes compétences en optimisation de performances, indexation de base de données, et gestion de gros volumes de données - des compétences très recherchées en entreprise.

**Vision du projet :**

Je veux créer une application qui ne soit pas juste un CRUD basique, mais une vraie solution professionnelle qui pourrait être déployée en conditions réelles. L'application doit être :
- **Intuitive** pour que les lecteurs l'adoptent rapidement
- **Efficace** pour faire gagner du temps au personnel
- **Performante** malgré le gros volume de données
- **Sécurisée** en respectant les normes actuelles (RGPD, authentification JWT, etc.)
- **Maintenable** avec du code propre et documenté

**Déroulement imaginé :**

1. **Phase de conception** (1 mois) : Analyse des besoins, maquettes, conception BDD
2. **Phase de développement MVP** (2 mois) : Fonctionnalités essentielles (catalogue, emprunts, auth)
3. **Phase d'enrichissement** (2 mois) : Fonctionnalités avancées (réservations, avis, recommandations)
4. **Phase de tests et déploiement** (1 mois) : Tests, corrections, optimisations, mise en production
5. **Documentation et soutenance** (1 mois) : Dossier professionnel, préparation présentation jury

### Vos besoins

**Pourquoi ce projet ?**

1. **Besoin académique (prioritaire)**
   - Valider le titre professionnel CDA devant un jury
   - Démontrer ma maîtrise des technologies Laravel et React
   - Prouver ma capacité à gérer un projet complexe de A à Z
   - Obtenir un projet portfolio professionnel pour ma recherche d'emploi

2. **Besoin fonctionnel (simulation réaliste)**
   - Moderniser la gestion de la bibliothèque
   - Réduire la charge administrative du personnel
   - Faciliter l'accès au catalogue pour les lecteurs
   - Améliorer la rotation des livres et réduire les retards

3. **Besoin technique (apprentissage)**
   - Apprendre à gérer du Big Data (100 000 livres)
   - Maîtriser l'optimisation de performances (cache, index, pagination)
   - Implémenter une architecture professionnelle (SPA + API REST)
   - Respecter les bonnes pratiques de sécurité (RGPD, validation, authentification)

4. **Besoin de démonstration de compétences**
   - Montrer que je peux concevoir une base de données complexe
   - Prouver que je sais créer une interface moderne et responsive
   - Démontrer ma capacité à documenter et présenter un projet
   - Illustrer mon respect des standards de code (clean code, SOLID, DRY)

**Problématiques à résoudre :**

- Comment gérer efficacement 100 000 livres sans ralentir l'application ?
- Comment créer une interface simple malgré la complexité fonctionnelle ?
- Comment assurer la sécurité des données personnelles (RGPD) ?
- Comment rendre l'application accessible depuis mobile et desktop ?
- Comment implémenter un système de notifications automatiques ?
- Comment créer un algorithme de recommandations pertinent ?

---

## 3. OBJECTIFS

### Objectifs qualitatifs

**Pour le projet CDA (priorité absolue) :**
- ✅ Valider les 3 CCP du référentiel CDA (RNCP 37873)
- ✅ Démontrer ma maîtrise de Laravel et React
- ✅ Prouver ma capacité à gérer un projet complexe
- ✅ Obtenir un code propre, sécurisé et maintenable qui impressionnera le jury
- ✅ Créer un projet portfolio professionnel pour ma recherche d'emploi

**Pour l'expérience utilisateur :**
- ✅ Offrir une interface moderne, intuitive et agréable à utiliser
- ✅ Permettre aux lecteurs de trouver rapidement le livre qu'ils cherchent
- ✅ Faciliter la gestion quotidienne pour les bibliothécaires
- ✅ Donner une vision claire au directeur grâce aux statistiques

**Pour la qualité technique :**
- ✅ Assurer des temps de réponse rapides malgré le gros volume de données
- ✅ Garantir la sécurité des données personnelles (conformité RGPD)
- ✅ Créer une application accessible WCAG 2.1 AA
- ✅ Développer du code maintenable et évolutif

**Pour l'apprentissage personnel :**
- ✅ Maîtriser la gestion de Big Data
- ✅ Approfondir mes connaissances en optimisation de performances
- ✅ Développer mes compétences en architecture logicielle
- ✅ Apprendre à documenter un projet de manière professionnelle

### Objectifs quantitatifs

**Volumétrie :**
- 📊 **100 000 livres** dans le catalogue (données OpenLibrary)
- 📊 **500 lecteurs** inscrits (données fictives pour démo)
- 📊 **15-20 pages** dans l'application
- 📊 **20-25 composants React** réutilisables
- 📊 **30+ endpoints API** REST

**Performance :**
- ⚡ Temps de recherche : **< 500ms** pour une requête simple
- ⚡ Temps de chargement page : **< 2 secondes** (avec cache)
- ⚡ Pagination : **20 résultats** par page maximum
- ⚡ Cache Redis : **TTL 1h** pour les requêtes fréquentes

**Code :**
- 💻 Couverture de tests : **> 70%** (si temps le permet)
- 💻 Nombre de lignes de code : **≈ 15 000 lignes** (estimation)
- 💻 Documentation : **100%** des fonctions importantes avec JSDoc/PHPDoc

**Délais :**
- 📅 **6-7 mois** pour la réalisation complète
- 📅 **MVP fonctionnel** en 3 mois
- 📅 **Déploiement final** 1 mois avant la soutenance

**Conformité CDA :**
- ✅ Respect à **100%** du référentiel RNCP 37873
- ✅ Documentation complète (dossier professionnel, README, commentaires)
- ✅ Présentation de **15 minutes** devant le jury + questions

### Votre cible

**Cible principale : Les lecteurs (utilisateurs finaux)**

**Profil type 1 - Le lecteur régulier :**
- **Âge :** 25-55 ans
- **Sexe :** Mixte (légèrement plus de femmes statistiquement)
- **Profession :** Variée (employés, cadres, retraités, étudiants)
- **Fréquence de visite :** 2-3 fois par mois
- **Équipement :** Smartphone + ordinateur
- **Niveau tech :** Moyen (sait utiliser une appli web basique)
- **Besoins :** Trouver rapidement un livre, réserver, recevoir des rappels
- **Frustrations actuelles :** Déplacements inutiles, pas de visibilité sur la disponibilité

**Profil type 2 - Le bibliothécaire :**
- **Âge :** 30-60 ans
- **Sexe :** Mixte
- **Niveau tech :** Variable (de débutant à intermédiaire)
- **Temps passé sur l'app :** 6-8h par jour
- **Besoins :** Gagner du temps, moins de tâches répétitives, suivi facile des retards
- **Frustrations actuelles :** Trop de paperasse, recherche manuelle chronophage

**Profil type 3 - Le directeur/administrateur :**
- **Âge :** 40-65 ans
- **Niveau tech :** Moyen
- **Temps passé sur l'app :** 1-2h par jour
- **Besoins :** Vision d'ensemble, statistiques, aide à la décision pour les achats
- **Frustrations actuelles :** Pas de données chiffrées, difficile de piloter efficacement

**Cible secondaire : Le jury CDA**

- **Profil :** Professionnels du développement et formateurs
- **Attentes :** Code de qualité, architecture solide, sécurité, documentation
- **Évaluation :** Conformité au référentiel RNCP 37873

---

## 4. FONCTIONNALITÉS

### Type de site
☑ **Application web complète (SPA - Single Page Application)**

L'application sera une SPA moderne avec :
- Frontend React (interface utilisateur)
- Backend Laravel (API REST)
- Base de données PostgreSQL

### Fonctions attendues

#### ✅ Authentification et gestion des comptes

**Pour tous :**
- ☑ Inscription / Connexion / Déconnexion
- ☑ Système de rôles (Lecteur, Bibliothécaire, Admin)
- ☑ Authentification sécurisée JWT (Laravel Sanctum)
- ☑ Récupération de mot de passe par email
- ☑ Modification du profil utilisateur
- ☑ Suppression de compte (RGPD - droit à l'oubli)
- ☑ Export des données personnelles (RGPD)

#### ✅ Catalogue de livres (consultation publique)

**Accessible sans connexion :**
- ☑ Affichage du catalogue complet (100 000 livres)
- ☑ Recherche avancée (titre, auteur, ISBN, genre)
- ☑ Filtres multiples :
  - Par disponibilité (disponible / emprunté)
  - Par genre littéraire
  - Par année de publication
  - Par note moyenne
- ☑ Tri (pertinence, popularité, date d'ajout, note)
- ☑ Pagination (20 livres par page)
- ☑ Fiche détaillée de chaque livre :
  - Titre, auteur, ISBN
  - Couverture du livre
  - Résumé
  - Année de publication, genre
  - Nombre d'exemplaires disponibles
  - Note moyenne et avis des lecteurs
  - Statut (disponible, emprunté, réservé)

#### ✅ Fonctionnalités LECTEUR (connecté)

**Mes emprunts :**
- ☑ Voir mes emprunts en cours (date de retour, jours restants)
- ☑ Historique de mes emprunts passés
- ☑ Renouveler un emprunt (si pas de réservation en attente)
- ☑ Alerte visuelle si retard

**Réservations :**
- ☑ Réserver un livre non disponible
- ☑ Voir mes réservations en cours
- ☑ Position dans la file d'attente
- ☑ Notification quand le livre est disponible
- ☑ Annuler une réservation

**Fonctionnalités sociales :**
- ☑ Laisser un avis et une note (1-5 étoiles) sur un livre lu
- ☑ Consulter les avis des autres lecteurs
- ☑ Ajouter des livres à mes favoris
- ☑ Voir mes statistiques de lecture (livres lus, genres préférés)
- ☑ Recevoir des recommandations personnalisées

**Notifications :**
- ☑ Email de rappel 3 jours avant la date de retour
- ☑ Email le jour de la date de retour
- ☑ Email en cas de retard
- ☑ Email quand un livre réservé est disponible
- ☑ Préférences de notification (activer/désactiver par type)

#### ✅ Fonctionnalités BIBLIOTHÉCAIRE

**Gestion des prêts :**
- ☑ Créer un nouveau prêt (scanner ISBN + carte lecteur)
- ☑ Enregistrer un retour de livre
- ☑ Voir tous les prêts en cours
- ☑ Voir les prêts en retard
- ☑ Relancer automatiquement les lecteurs en retard

**Gestion du catalogue :**
- ☑ Ajouter un nouveau livre au catalogue
- ☑ Modifier les informations d'un livre
- ☑ Supprimer un livre (si perdu/abîmé)
- ☑ Ajuster la quantité d'exemplaires
- ☑ Import en masse (CSV)

**Gestion des réservations :**
- ☑ Voir toutes les réservations en attente
- ☑ Notifier un lecteur que son livre est prêt
- ☑ Annuler une réservation expirée (non récupérée sous 7 jours)

**Gestion des lecteurs :**
- ☑ Créer un compte lecteur
- ☑ Consulter le profil d'un lecteur
- ☑ Voir l'historique des emprunts d'un lecteur
- ☑ Bloquer un compte en cas de problème
- ☑ Débloquer un compte

#### ✅ Fonctionnalités ADMINISTRATEUR

**Dashboard statistiques :**
- ☑ Nombre total de livres, lecteurs actifs, emprunts en cours
- ☑ Taux d'occupation du catalogue (% de livres empruntés)
- ☑ Top 10 des livres les plus empruntés
- ☑ Top 10 des genres les plus populaires
- ☑ Évolution du nombre d'emprunts (graphiques mensuels/annuels)
- ☑ Liste des livres jamais empruntés

**Gestion des utilisateurs :**
- ☑ Créer des comptes bibliothécaires/admin
- ☑ Gérer les rôles et permissions
- ☑ Désactiver/activer un compte
- ☑ Voir tous les utilisateurs

**Rapports :**
- ☑ Export CSV des statistiques
- ☑ Rapport mensuel/annuel automatique

### Demandes spécifiques

**Système de recommandations :**
Algorithme basé sur :
- L'historique de lecture de l'utilisateur
- Les genres qu'il a le plus lus
- Les livres similaires (même auteur, même genre)
- Les livres bien notés qu'il n'a pas encore lus

**Notifications automatiques :**
Système de tâches planifiées (Laravel Scheduler) qui vérifie quotidiennement :
- Les dates de retour approchantes (J-3)
- Les dates de retour du jour (J)
- Les retards (J+1, J+7, J+14)
- Les réservations à annuler (non récupérées sous 7 jours)

**Recherche optimisée Big Data :**
- Recherche full-text PostgreSQL avec `to_tsvector`
- Suggestions pendant la frappe (debounce 300ms)
- Cache Redis pour les recherches fréquentes
- Index sur tous les champs de recherche

**Liste de souhaits communautaire (bonus) :**
Les lecteurs peuvent proposer des livres à acheter. Les bibliothécaires voient les suggestions et peuvent les valider.

---

## 5. BESOINS CONNEXES

### Besoins techniques

☑ **Hébergement**

**Frontend (React) :**
- **Plateforme :** Vercel
- **Raison :** Gratuit, optimisé pour React/SPA, déploiement automatique via Git
- **URL :** https://bibliotheque-municipale.vercel.app (exemple)

**Backend (Laravel) + Base de données :**
- **Plateforme :** Railway ou Render
- **Raison :** Support PostgreSQL + PHP, plan gratuit suffisant pour un projet de formation
- **Services :** API Laravel + PostgreSQL + Redis

☑ **Maintenance**

Pendant la durée du projet :
- Corrections de bugs au fur et à mesure
- Mises à jour de sécurité des dépendances
- Optimisations de performances si nécessaire

☑ **Formation**

**Pour moi-même :**
- Accompagnement du formateur tout au long du projet
- Code reviews régulières
- Validation de la compréhension à chaque étape

**Documentation utilisateur :**
- Guide d'utilisation pour les lecteurs
- Manuel administrateur pour les bibliothécaires
- FAQ

☑ **Intégration de services tiers**

**API OpenLibrary :**
- Import initial du catalogue de 100 000 livres
- Récupération des métadonnées (couvertures, résumés, auteurs)

**Service d'envoi d'emails :**
- Laravel Mail + SMTP (Mailtrap pour les tests, Gmail/SendGrid pour la prod)
- Templates d'emails personnalisés pour chaque type de notification

**Outils de monitoring (optionnel) :**
- Sentry (détection d'erreurs en production)
- Google Analytics (suivi de l'utilisation)

### Besoins marketing

Ce projet étant à visée pédagogique, les besoins marketing sont limés. Cependant, pour une mise en situation réaliste :

☑ **Référencement naturel (SEO de base)**
- Balises meta appropriées
- URLs sémantiques
- Structure HTML correcte (h1, h2, etc.)
- Sitemap.xml

☑ **Présence sur les réseaux sociaux (simulation)**
- Page fictive de la bibliothèque sur les réseaux
- Possibilité de partager un livre sur les réseaux (boutons de partage)

**Note :** L'objectif principal étant la validation du CDA, je ne développerai pas de stratégie marketing complète. L'accent sera mis sur la qualité technique et fonctionnelle.

---

## 6. CONTRAINTES TECHNIQUES

### Technologies imposées (par la formation)

**Stack technique VALIDÉE :**

**Frontend :**
- ✅ **React 18+** avec hooks (useState, useEffect, useContext, custom hooks)
- ✅ **Vite** comme bundler (plus rapide que Create React App)
- ✅ **Tailwind CSS** pour le styling (responsive, utility-first)
- ✅ **React Router** pour la navigation SPA
- ✅ **Axios** pour les appels API

**Backend :**
- ✅ **Laravel 10+** (PHP 8.2+)
- ✅ **Laravel Sanctum** pour l'authentification JWT
- ✅ **Eloquent ORM** pour la gestion de la base de données
- ✅ **Laravel Scheduler** pour les tâches planifiées (cron jobs)
- ✅ **Laravel Queue** pour les jobs asynchrones (emails)

**Base de données :**
- ✅ **PostgreSQL** (meilleure gestion des gros volumes que MySQL)
- ✅ **Redis** pour le cache

**Outils de développement :**
- ✅ **Git** pour le versioning
- ✅ **GitHub** pour l'hébergement du code
- ✅ **Composer** (gestionnaire de dépendances PHP)
- ✅ **npm** (gestionnaire de dépendances JavaScript)
- ✅ **Postman** pour tester l'API

### Contraintes de performance

**Challenge Big Data :**
- Le catalogue contient **100 000 livres** (données réelles OpenLibrary)
- Nécessite des optimisations poussées :
  - Index PostgreSQL sur tous les champs de recherche
  - Recherche full-text avec `to_tsvector` et `to_tsquery`
  - Cache Redis avec TTL 1h pour les requêtes fréquentes
  - Pagination obligatoire (20 résultats max par page)
  - Lazy loading des images de couverture

**Objectifs de performance :**
- Recherche : < 500ms
- Chargement d'une page : < 2 secondes (avec cache)
- API : temps de réponse < 300ms

### Contraintes de sécurité

**RGPD obligatoire :**
- ✅ Consentement explicite lors de l'inscription
- ✅ Droit à l'oubli (suppression de compte)
- ✅ Export des données personnelles (format JSON)
- ✅ Chiffrement des mots de passe (bcrypt)
- ✅ Pages légales (mentions légales, politique de confidentialité)

**Sécurité applicative :**
- ✅ Authentification JWT sécurisée (Laravel Sanctum)
- ✅ Protection CSRF
- ✅ Configuration CORS appropriée
- ✅ Validation stricte des données (FormRequests Laravel)
- ✅ Protection contre les injections SQL (Eloquent ORM)
- ✅ Pas de secrets en dur dans le code (.env)
- ✅ HTTPS en production

### Contraintes d'accessibilité

**WCAG 2.1 niveau AA :**
- ✅ Navigation au clavier possible
- ✅ ARIA labels sur les éléments interactifs
- ✅ Contrastes de couleurs respectés (ratio 4.5:1 minimum)
- ✅ Tailles de texte lisibles
- ✅ Focus visible sur les éléments
- ✅ Messages d'erreur clairs

### Contraintes de compatibilité

**Navigateurs supportés :**
- Chrome (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Edge (dernières versions)

**Responsive design :**
- ✅ Mobile (320px - 767px)
- ✅ Tablette (768px - 1023px)
- ✅ Desktop (1024px et plus)

**Approche :** Mobile-first avec Tailwind CSS

### Contraintes de code (pour le jury CDA)

**Standards de qualité obligatoires :**
- ✅ Architecture MVC stricte (séparation des responsabilités)
- ✅ Nommage clair et explicite (camelCase, PascalCase selon le contexte)
- ✅ Commentaires JSDoc/PHPDoc sur toutes les fonctions importantes
- ✅ Pas de code mort (code commenté, variables inutilisées)
- ✅ Principe DRY (Don't Repeat Yourself)
- ✅ Fonctions courtes (< 50 lignes idéalement)
- ✅ Gestion d'erreur avec try-catch
- ✅ Code formaté (Prettier + ESLint côté frontend, PSR-12 côté Laravel)
- ✅ README complet avec instructions d'installation

### Exemples de sites inspirants

**Pour l'UX/UI du catalogue :**
- **Babelio** (https://www.babelio.com/) : Affichage des livres avec couvertures, système d'avis
- **BnF Catalogue** (https://catalogue.bnf.fr/) : Recherche avancée, filtres multiples
- **Goodreads** (https://www.goodreads.com/) : Système de notation, recommandations

**Pour le dashboard admin :**
- **Laravel Nova** : Interface d'administration moderne
- **Google Analytics** : Graphiques et statistiques

**Pour le design général :**
- Style moderne et épuré
- Beaucoup de blanc, contrastes marqués
- Mise en avant des couvertures de livres
- Interface intuitive avec icônes claires

---

## 7. PAGES & ARBORESCENCE

### Nombre de pages estimé

**Total estimé : 15-20 pages**

Réparties en :
- **Pages publiques :** 3
- **Pages lecteur :** 6
- **Pages bibliothécaire :** 4
- **Pages administrateur :** 3
- **Pages légales :** 3

### Arborescence de votre futur site

```
BIBLIOTHÈQUE MUNICIPALE - ARBORESCENCE COMPLÈTE

┌─────────────────────────────────────────────────────────────┐
│                    PAGES PUBLIQUES                           │
│              (accessibles sans connexion)                    │
└─────────────────────────────────────────────────────────────┘

📄 / (Page d'accueil)
   ├─ Présentation de la bibliothèque
   ├─ Barre de recherche rapide
   ├─ Sélection de livres populaires
   └─ Boutons Connexion / Inscription

📄 /catalogue
   ├─ Recherche avancée (titre, auteur, ISBN, genre)
   ├─ Filtres (disponibilité, genre, année, note)
   ├─ Grille de livres (pagination 20/page)
   └─ Tri (pertinence, popularité, note)

📄 /livre/:id
   ├─ Fiche détaillée du livre
   ├─ Couverture, titre, auteur, résumé
   ├─ Disponibilité, nombre d'exemplaires
   ├─ Avis et notes des lecteurs
   ├─ Boutons : Emprunter / Réserver (si connecté)
   └─ Livres similaires

┌─────────────────────────────────────────────────────────────┐
│               AUTHENTIFICATION                               │
└─────────────────────────────────────────────────────────────┘

📄 /login
   └─ Formulaire de connexion (email + mot de passe)

📄 /inscription
   └─ Formulaire d'inscription (nom, email, mot de passe)

📄 /mot-de-passe-oublie
   └─ Récupération de mot de passe par email

┌─────────────────────────────────────────────────────────────┐
│               ESPACE LECTEUR                                 │
│           (nécessite d'être connecté)                        │
└─────────────────────────────────────────────────────────────┘

📄 /mon-compte
   ├─ Informations personnelles
   ├─ Modifier profil
   ├─ Préférences de notification
   ├─ Export de mes données (RGPD)
   └─ Supprimer mon compte (RGPD)

📄 /mes-emprunts
   ├─ Emprunts en cours (date de retour, jours restants)
   ├─ Historique des emprunts passés
   ├─ Alerte si retard
   └─ Bouton Renouveler (si possible)

📄 /mes-reservations
   ├─ Réservations en cours
   ├─ Position dans la file d'attente
   ├─ Statut (en attente / disponible / expirée)
   └─ Bouton Annuler

📄 /mes-favoris
   ├─ Liste des livres favoris
   └─ Retirer des favoris

📄 /mes-avis
   ├─ Avis que j'ai laissés
   ├─ Modifier/supprimer un avis
   └─ Laisser un nouvel avis

📄 /recommandations
   ├─ Livres recommandés pour moi
   ├─ Basé sur mon historique de lecture
   └─ Nouveautés dans mes genres préférés

┌─────────────────────────────────────────────────────────────┐
│            ESPACE BIBLIOTHÉCAIRE                             │
│         (rôle : bibliothecaire)                              │
└─────────────────────────────────────────────────────────────┘

📄 /biblio/dashboard
   ├─ Vue d'ensemble (emprunts du jour, retards, réservations)
   └─ Raccourcis vers les fonctions principales

📄 /biblio/prets
   ├─ Créer un nouveau prêt (scan ISBN + carte lecteur)
   ├─ Enregistrer un retour
   ├─ Liste des prêts en cours
   └─ Liste des prêts en retard

📄 /biblio/livres
   ├─ Gestion du catalogue
   ├─ Ajouter un livre
   ├─ Modifier un livre
   ├─ Supprimer un livre
   └─ Import CSV en masse

📄 /biblio/lecteurs
   ├─ Liste des lecteurs inscrits
   ├─ Consulter le profil d'un lecteur
   ├─ Voir l'historique des emprunts
   ├─ Bloquer/débloquer un compte
   └─ Créer un compte lecteur

📄 /biblio/reservations
   ├─ Liste des réservations en attente
   ├─ Notifier un lecteur (livre prêt)
   └─ Annuler une réservation expirée

┌─────────────────────────────────────────────────────────────┐
│            ESPACE ADMINISTRATEUR                             │
│              (rôle : admin)                                  │
└─────────────────────────────────────────────────────────────┘

📄 /admin/dashboard
   ├─ Statistiques globales (livres, lecteurs, emprunts)
   ├─ Graphiques d'évolution
   ├─ Top 10 livres les plus empruntés
   ├─ Top 10 genres populaires
   └─ Livres jamais empruntés

📄 /admin/utilisateurs
   ├─ Gestion des utilisateurs (lecteurs, bibliothécaires, admins)
   ├─ Créer un compte
   ├─ Modifier les rôles
   └─ Désactiver un compte

📄 /admin/rapports
   ├─ Générer des rapports (CSV, PDF)
   ├─ Statistiques mensuelles/annuelles
   └─ Export des données

┌─────────────────────────────────────────────────────────────┐
│               PAGES LÉGALES (RGPD)                           │
└─────────────────────────────────────────────────────────────┘

📄 /mentions-legales
   └─ Informations légales sur le site

📄 /politique-confidentialite
   └─ Politique de gestion des données personnelles (RGPD)

📄 /conditions-utilisation
   └─ Conditions générales d'utilisation
```

### Organisation par catégories

- **Pages publiques :** 3 (Accueil, Catalogue, Fiche livre)
- **Pages auth :** 3 (Connexion, Inscription, Mot de passe oublié)
- **Pages lecteur :** 6 (Compte, Emprunts, Réservations, Favoris, Avis, Recommandations)
- **Pages bibliothécaire :** 5 (Dashboard, Prêts, Livres, Lecteurs, Réservations)
- **Pages admin :** 3 (Dashboard, Utilisateurs, Rapports)
- **Pages légales :** 3 (Mentions, Confidentialité, CGU)

**Total : ≈ 20 pages**

---

## 8. DESIGN

### Éléments fournis vs À créer

| ÉLÉMENTS | FOURNIS | À CRÉER |
|----------|---------|---------|
| Logo | ☐ | ☑ |
| Charte graphique | ☐ | ☑ |
| Maquette / Wireframe | ☐ | ☑ |
| Typographies | ☐ | ☑ |

**Note :** Je vais créer tous les éléments graphiques moi-même dans le cadre du projet CDA.

### Nombre de propositions attendues

**1 proposition complète** comprenant :
- Logo de la bibliothèque
- Charte graphique (couleurs, typographies)
- Maquettes Figma de toutes les pages principales
- Wireframes de l'expérience utilisateur

### Style graphique attendu

☑ **Moderne**
☑ **Flat design**
☐ 3D
☐ Futuriste
☐ Interactif
☐ Retro

**Style choisi : Moderne et épuré avec flat design**

**Pourquoi ce choix ?**
- **Lisibilité** : Le flat design met l'accent sur le contenu (les livres)
- **Simplicité** : Interface intuitive, facile à prendre en main
- **Modernité** : Look professionnel et actuel
- **Performance** : Moins de ressources graphiques = chargement plus rapide
- **Accessibilité** : Contrastes clairs, navigation évidente

### Exigences graphiques

**Palette de couleurs :**
- **Couleur principale :** Bleu profond (#1E40AF ou similaire)
  - Symbolise la confiance, le savoir, la culture
  - Couleur classique pour les institutions culturelles
- **Couleur secondaire :** Orange doux (#F59E0B)
  - Pour les CTA (Call-To-Action), les boutons importants
  - Contraste chaud/froid équilibré
- **Couleur accent :** Vert (#10B981)
  - Pour les notifications de succès, les éléments positifs
- **Couleur alerte :** Rouge (#EF4444)
  - Pour les retards, les erreurs, les alertes
- **Neutres :** Blanc (#FFFFFF), Gris clair (#F3F4F6), Gris foncé (#374151), Noir (#111827)

**Typographies :**
- **Titres :** Police sans-serif moderne (ex: Inter, Poppins, ou Montserrat)
  - Poids : Bold (700) pour les titres principaux
- **Texte courant :** Police sans-serif lisible (ex: Inter Regular, Open Sans)
  - Poids : Regular (400) pour le texte, Medium (500) pour les sous-titres
- **Tailles :** Responsive avec Tailwind (text-sm, text-base, text-lg, text-2xl, etc.)

**Mise en page :**
- **Layout :** Grid Tailwind CSS pour un design responsive
- **Espacement :** Généreux (principe de "white space") pour la lisibilité
- **Cards :** Design en cartes pour les livres (ombre légère, coins arrondis)
- **Navigation :** Header fixe avec logo + menu + recherche
- **Footer :** Liens utiles + mentions légales

**Éléments visuels :**
- **Couvertures de livres :** Élément central, bien mises en valeur
- **Icônes :** Bibliothèque Heroicons (cohérent avec Tailwind)
- **Images :** Placeholder si pas de couverture disponible
- **Graphiques (admin) :** Chart.js pour les statistiques

**Inspiration visuelle :**
- Design proche de **Babelio** (grilles de livres, fiches détaillées)
- Inspiration **Material Design** pour les composants (boutons, inputs)
- Look **Tailwind UI** pour la cohérence globale

**Ce que je ne veux PAS :**
- ❌ Design surchargé avec trop d'éléments
- ❌ Couleurs criardes ou trop de couleurs différentes
- ❌ Animations excessives qui ralentissent l'app
- ❌ Police serif difficile à lire sur écran
- ❌ Manque de contrastes (accessibilité)

### Responsive Design

**Breakpoints Tailwind :**
- **Mobile :** < 640px (sm)
- **Tablette :** 640px - 1024px (md / lg)
- **Desktop :** > 1024px (xl / 2xl)

**Adaptations :**
- **Mobile :** Menu burger, grille 1 colonne, navigation simplifiée
- **Tablette :** Grille 2-3 colonnes, menu horizontal
- **Desktop :** Grille 4-5 colonnes, sidebar si besoin

---

## 9. DÉROULEMENT DU PROJET

### Gestion de projet

**Méthodologie :** Agile / Kanban adapté

Je vais travailler en mode agile avec des sprints de 2 semaines. À chaque sprint, je vais :
1. Définir les tâches prioritaires (sur GitHub Projects ou Trello)
2. Développer les fonctionnalités
3. Faire une démo au formateur pour validation
4. Ajuster en fonction des retours

**Outils de suivi :**
- **GitHub Projects** : Kanban board pour suivre l'avancement (To Do / In Progress / Done)
- **Git branches** : Une branche par fonctionnalité (feature/auth, feature/catalog, etc.)
- **Commits réguliers** : Messages clairs en anglais (convention Conventional Commits)

**Transparence :**
Je souhaite que le formateur puisse suivre mon avancement à tout moment via :
- Accès au repo GitHub
- Démos régulières (toutes les 2 semaines minimum)
- Points d'étape pour valider ma compréhension

### Communication

**Canaux privilégiés :**
- **Email** : jeremy@garage404.com (pour les questions non urgentes, partage de documents)
- **Discord / Slack** : Pour les échanges rapides, questions techniques
- **Visio-conférences** : Pour les code reviews, démonstrations, points bloquants
- **GitHub** : Pour les code reviews via Pull Requests

**Fréquence des échanges :**
- **Demo sprint** : Toutes les 2 semaines (30 min)
- **Code review** : À chaque fonctionnalité majeure terminée
- **Point bloquant** : Dès que je suis bloqué > 2h sur un problème
- **Validation avant passage à l'étape suivante** : Systématique

**Ce que j'attends du formateur :**
- Feedback sur mon code (qualité, bonnes pratiques)
- Validation que je comprends bien ce que je fais
- Conseil sur les choix techniques si j'hésite
- Alertes si je m'écarte du référentiel CDA

### Planning prévisionnel

**Phase 1 - Conception (1 mois - Janvier 2026)**
- Semaine 1-2 : Analyse des besoins, compréhension du besoin client ✅
- Semaine 3 : Maquettes Figma, wireframes
- Semaine 4 : Conception BDD (MCD, MLD, MPD), diagrammes UML

**Phase 2 - Setup & MVP (2 mois - Février-Mars 2026)**
- Semaine 1 : Setup projet (Laravel + React + PostgreSQL + Redis)
- Semaine 2-3 : Authentification (inscription, connexion, JWT, rôles)
- Semaine 4-5 : Catalogue de livres (affichage, recherche de base, filtres)
- Semaine 6-7 : Gestion des emprunts (création, retour, liste)
- Semaine 8 : Tests et corrections du MVP

**Phase 3 - Fonctionnalités avancées (2 mois - Avril-Mai 2026)**
- Semaine 9-10 : Système de réservations (file d'attente, notifications)
- Semaine 11 : Avis et notes sur les livres
- Semaine 12 : Favoris et recommandations
- Semaine 13 : Dashboard admin avec statistiques
- Semaine 14 : Notifications automatiques (Laravel Scheduler, emails)
- Semaine 15-16 : Import Big Data (100 000 livres OpenLibrary), optimisations

**Phase 4 - Tests, Optimisations, Déploiement (1 mois - Juin 2026)**
- Semaine 17 : Tests unitaires et fonctionnels
- Semaine 18 : Optimisations de performance (cache, index, lazy loading)
- Semaine 19 : Déploiement (Vercel + Railway)
- Semaine 20 : Tests en production, corrections

**Phase 5 - Documentation et Soutenance (1 mois - Juillet 2026)**
- Semaine 21-22 : Rédaction du dossier professionnel CDA
- Semaine 23 : Préparation de la présentation jury (slides)
- Semaine 24 : Répétitions de la soutenance

**Soutenance prévue : Fin Juillet 2026**

### Autre

**Critères de succès du projet :**
- ✅ Application fonctionnelle déployée en production
- ✅ Code de qualité validé par le formateur
- ✅ Documentation complète (README, commentaires, dossier pro)
- ✅ Conformité au référentiel CDA (100% des CCP validés)
- ✅ Présentation réussie devant le jury

**Gestion des risques :**
- **Risque : Retard dans le planning**
  → Mitigation : Prioriser les fonctionnalités MUST HAVE, reporter les COULD HAVE

- **Risque : Blocage technique sur Big Data**
  → Mitigation : Commencer tôt les optimisations, demander de l'aide au formateur

- **Risque : Code de mauvaise qualité**
  → Mitigation : Code reviews régulières, refactoring au fur et à mesure

- **Risque : Manque de temps pour la documentation**
  → Mitigation: Documenter au fur et à mesure (pas tout à la fin)

**Livrables attendus :**
1. Application web déployée (URL de prod)
2. Code source sur GitHub (repo public)
3. Dossier professionnel CDA complet
4. Documentation technique (README, schémas BDD, API)
5. Présentation PowerPoint pour le jury
6. Vidéo de démonstration (backup si problème technique le jour J)

---

## 📋 DÉLAIS

**Durée totale estimée : 6-7 mois**
- Début : Janvier 2026
- Soutenance : Juillet 2026

---

## 💰 BUDGET

**Projet à visée pédagogique : 0€**

Tous les outils utilisés sont gratuits :
- ✅ React, Laravel, PostgreSQL : Open-source gratuit
- ✅ Vercel (hébergement frontend) : Plan gratuit
- ✅ Railway/Render (backend + BDD) : Plan gratuit
- ✅ GitHub : Gratuit
- ✅ Figma : Plan gratuit
- ✅ Mailtrap (test emails) : Plan gratuit

**Note :** Dans un contexte réel, le budget serait d'environ 5 000-10 000€ pour un projet de cette envergure.

---

## ✅ VALIDATION DU CAHIER DES CHARGES

Ce cahier des charges sera soumis à validation auprès de :
- **Le formateur** (jeremy@garage404.com) pour validation technique et pédagogique
- **Moi-même** en tant que porteur du projet

Une fois validé, il servira de référence tout au long du développement.

---

**Document créé dans le cadre du projet CDA - RNCP 37873**
**Candidat :** Naim H.
**Formation :** Concepteur Développeur d'Applications
**Date de création :** Janvier 2026
**Version :** 1.0
**Statut :** En attente de validation

---

**Pour toute question ou suggestion, contactez :**
📧 [Ton email]
🔗 GitHub : [Lien vers ton repo]
📱 [Ton téléphone si besoin]
