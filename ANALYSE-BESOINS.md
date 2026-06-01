# ANALYSE DES BESOINS
## Projet : Système de Gestion de Bibliothèque Municipale

---

## 📋 Introduction

Maintenant que j'ai bien identifié toutes les parties prenantes et compris leurs motivations, je dois analyser en détail leurs besoins. Cette analyse me permettra de définir précisément ce que l'application doit faire et comment elle doit fonctionner.

---

## 🎯 APPROCHE CENTRÉE SUR LES OBJECTIFS

Pour mener cette analyse, j'applique la méthode des 3 questions : **Pourquoi ? Quoi ? Comment ?**

### 1️⃣ POURQUOI ? - Comprendre la raison derrière chaque demande

Avant de foncer tête baissée dans le développement, je dois comprendre **pourquoi** chaque fonctionnalité est nécessaire.

#### Exemple 1 : Recherche de livres

**Demande initiale :** "On veut une barre de recherche"

**Pourquoi ?**
- Les lecteurs doivent pouvoir trouver rapidement un livre parmi 100 000 références
- Sans moteur de recherche efficace, c'est impossible de parcourir tout le catalogue
- Les lecteurs n'ont pas le temps de passer des heures à chercher

**Vraie motivation :**
Permettre aux lecteurs de trouver ce qu'ils cherchent en quelques secondes pour leur donner envie de lire plus.

**Impact sur le développement :**
- Nécessite une recherche full-text performante
- Filtres multiples (auteur, genre, année, disponibilité)
- Suggestions automatiques pendant la frappe
- Optimisation Big Data avec index PostgreSQL et cache Redis

---

#### Exemple 2 : Système de réservations

**Demande initiale :** "Les lecteurs doivent pouvoir réserver un livre"

**Pourquoi ?**
- Quand un livre est emprunté, le lecteur se déplace pour rien
- Les lecteurs abandonnent leur recherche si le livre n'est pas dispo
- La bibliothèque perd des opportunités de prêt

**Vraie motivation :**
Éviter la frustration et garantir que chaque lecteur puisse lire le livre qu'il souhaite, même s'il doit attendre.

**Impact sur le développement :**
- File d'attente automatique
- Notification quand le livre devient disponible
- Délai de 7 jours pour venir récupérer le livre réservé
- Annulation automatique si non récupéré

---

#### Exemple 3 : Notifications automatiques

**Demande initiale :** "Envoyer des emails de rappel"

**Pourquoi ?**
- Les lecteurs oublient la date de retour
- Les livres en retard bloquent d'autres lecteurs
- Le personnel passe du temps à relancer manuellement

**Vraie motivation :**
Réduire les retards pour que les livres circulent mieux et que le personnel se concentre sur l'accompagnement plutôt que l'administratif.

**Impact sur le développement :**
- Système de tâches planifiées (cron jobs)
- Emails automatiques : 3 jours avant, jour J, après retard
- Template personnalisé par type de notification
- Historique des notifications envoyées

---

### 2️⃣ QUOI ? - Déterminer ce qui doit être accompli

Maintenant que je comprends le **pourquoi**, je peux définir **quoi** faire concrètement.

#### Fonctionnalités nécessaires identifiées

##### **POUR LES LECTEURS :**

**Consultation du catalogue**
- Accès au catalogue complet des 100 000 livres
- Recherche avancée (titre, auteur, ISBN, genre)
- Filtres multiples (disponibilité, année, note moyenne)
- Fiche détaillée de chaque livre (résumé, auteur, disponibilité)

**Gestion des emprunts**
- Voir mes emprunts en cours avec date de retour
- Historique de mes emprunts passés
- Renouveler un emprunt (si pas de réservation en attente)
- Alerte si retard

**Réservations**
- Réserver un livre non disponible
- Voir ma position dans la file d'attente
- Recevoir une notification quand le livre est dispo
- Annuler une réservation

**Fonctionnalités sociales**
- Laisser un avis et une note sur un livre lu
- Consulter les avis des autres lecteurs
- Ajouter des livres à mes favoris
- Recevoir des recommandations basées sur mes lectures

**Mon compte**
- Créer un compte et se connecter
- Modifier mes informations personnelles
- Gérer mes notifications (préférences email)
- Supprimer mon compte (RGPD)

##### **POUR LES BIBLIOTHÉCAIRES :**

**Gestion des prêts**
- Enregistrer un nouveau prêt (scanner ISBN + carte lecteur)
- Enregistrer un retour
- Voir tous les prêts en cours
- Gérer les retards (relances, pénalités)

**Gestion du catalogue**
- Ajouter un nouveau livre au catalogue
- Modifier les informations d'un livre
- Supprimer un livre (si perdu/abîmé)
- Voir les statistiques par livre (nb emprunts, note moyenne)

**Gestion des réservations**
- Voir toutes les réservations en attente
- Notifier un lecteur quand son livre est prêt
- Annuler une réservation expirée

**Gestion des lecteurs**
- Créer un compte lecteur
- Consulter le profil d'un lecteur
- Voir l'historique des emprunts d'un lecteur
- Bloquer un compte en cas de problème

##### **POUR L'ADMINISTRATEUR :**

**Dashboard statistiques**
- Nombre total de livres, lecteurs, emprunts
- Taux d'occupation du catalogue
- Livres les plus empruntés
- Genres les plus populaires
- Évolution du nombre d'emprunts (graphiques)

**Gestion des utilisateurs**
- Créer des comptes bibliothécaires/admin
- Gérer les rôles et permissions
- Désactiver un compte

**Rapports**
- Exporter des rapports (CSV, PDF)
- Statistiques mensuelles/annuelles
- Liste des livres jamais empruntés

---

### 3️⃣ COMMENT ? - Explorer les moyens pour réaliser l'objectif

Maintenant que je sais **quoi** faire, je dois décider **comment** le faire techniquement.

#### Architecture technique choisie

**SPA (Single Page Application) + API REST MVC**

**Pourquoi ce choix ?**
- Expérience utilisateur fluide (pas de rechargement de page)
- Séparation frontend/backend (plus maintenable)
- Scalabilité (API réutilisable pour une future app mobile)
- Correspond au référentiel CDA (application multicouche)

**Stack technique :**
- **Frontend :** React + Vite (interactivité, composants réutilisables)
- **Backend :** Laravel (PHP framework, ORM puissant, sécurité intégrée)
- **Base de données :** PostgreSQL (meilleure gestion des gros volumes)
- **Cache :** Redis (optimiser les requêtes fréquentes)
- **Authentification :** Laravel Sanctum (JWT tokens)

#### Solutions techniques pour les défis identifiés

##### **Challenge 1 : Gérer 100 000 livres (Big Data)**

**Comment ?**
- **Index PostgreSQL** sur les champs de recherche (title, author, ISBN)
- **Recherche full-text** avec `to_tsvector` et `to_tsquery`
- **Pagination obligatoire** (20 livres par page max)
- **Cache Redis** pour les recherches fréquentes (TTL 1h)
- **Lazy loading** côté frontend (chargement progressif)

##### **Challenge 2 : Recherche rapide et pertinente**

**Comment ?**
- Moteur de recherche full-text PostgreSQL
- Algorithme de pertinence (score de similarité)
- Suggestions pendant la frappe (debounce 300ms)
- Filtres combinables (genre + disponibilité + année)
- Tri par pertinence, popularité ou date d'ajout

##### **Challenge 3 : Notifications automatiques**

**Comment ?**
- **Laravel Scheduler** (cron job)
- Vérification quotidienne des dates de retour
- **Queue Jobs** pour l'envoi d'emails asynchrones
- Templates d'emails avec Laravel Blade
- Service d'envoi : Laravel Mail + SMTP

##### **Challenge 4 : Gestion de la file d'attente des réservations**

**Comment ?**
- Table `reservations` avec champ `position` et `status`
- Algorithme FIFO (First In, First Out)
- Événement déclenché au retour d'un livre
- Notification automatique au premier dans la file
- Expiration automatique après 7 jours

##### **Challenge 5 : Sécurité et RGPD**

**Comment ?**
- **Authentification JWT** avec Laravel Sanctum
- **Validation stricte** des données (FormRequests Laravel)
- **Protection CSRF** et **CORS** configurés
- **Chiffrement des mots de passe** (bcrypt)
- **Suppression compte** : anonymisation ou suppression réelle
- **Export données perso** : endpoint API générant un JSON

##### **Challenge 6 : Interface responsive et accessible**

**Comment ?**
- **Mobile-first** avec Tailwind CSS
- Grille responsive (breakpoints sm/md/lg/xl)
- **Accessibilité WCAG 2.1 AA** (ARIA labels, contrastes, navigation clavier)
- Tests sur Chrome, Firefox, Safari, Edge
- Tests mobile (iOS Safari, Chrome Android)

---

## 🔍 TECHNIQUES DE RECUEIL DES BESOINS UTILISÉES

Pour m'assurer de bien capter tous les besoins, j'ai utilisé plusieurs techniques :

### 1. Interviews et Discussions

**Avec qui ?**
- Mon formateur (pour comprendre les attentes pédagogiques)
- Des utilisateurs fictifs (mise en situation)

**Avantages :**
- Informations détaillées et spécifiques
- Comprendre les cas d'usage réels

**Exemples de questions posées :**

**Au directeur de bibliothèque :**
- Quel est le problème principal que vous rencontrez aujourd'hui ?
- Quels sont les processus les plus chronophages ?
- Quels bénéfices espérez-vous de cette application ?

**Aux bibliothécaires :**
- Combien de temps passez-vous sur les tâches administratives ?
- Quelles sont les erreurs les plus fréquentes ?
- Qu'est-ce qui vous faciliterait le plus le travail ?

**Aux lecteurs :**
- Qu'est-ce qui vous frustre le plus dans le système actuel ?
- Utilisez-vous votre smartphone pour chercher des livres ?
- Seriez-vous intéressés par des recommandations personnalisées ?

---

### 2. Ateliers de Travail (Brainstorming)

**Méthode :**
Sessions collaboratives pour identifier et prioriser les fonctionnalités.

**Avantages :**
- Consensus entre les parties prenantes
- Engagement des participants
- Créativité collective

**Exemple :**
Atelier "Quelles fonctionnalités pour améliorer l'expérience lecteur ?"
- ✅ Réservations en ligne
- ✅ Notifications automatiques
- ✅ Système d'avis
- ✅ Recommandations
- ❌ Chat en direct (complexité vs bénéfice)
- ❌ Réseau social complet (hors scope)

---

### 3. Observation et Études de Cas

**Méthode :**
Analyser les comportements et processus réels.

**Exemples :**
- Observation d'une bibliothèque physique (flux lecteurs, temps d'attente)
- Étude de plateformes similaires (Babelio, Goodreads, BnF)
- Analyse de solutions concurrentes (Koha, PMB)

**Avantages :**
- Connaissance des pratiques réelles
- Identification des points de friction
- Inspiration pour l'UX/UI

**Apprentissages :**
- Les lecteurs aiment voir les couvertures de livres (interface visuelle)
- La recherche doit être accessible dès la page d'accueil
- Les filtres doivent être visibles et clairs

---

### 4. Questionnaires et Sondages

**Méthode :**
Recueillir des données quantitatives sur un large échantillon.

**Avantages :**
- Large échantillon possible
- Rapide à distribuer et analyser
- Données chiffrées exploitables

**Exemple de sondage fictif :**

**Question :** Quelles fonctionnalités vous semblent les plus importantes ?
- ✅ 95% : Recherche rapide
- ✅ 87% : Notifications de retour
- ✅ 76% : Réservations en ligne
- ✅ 62% : Recommandations personnalisées
- ✅ 45% : Avis et notes
- ❌ 12% : Réseautage social

**Conclusion :** Priorité sur la recherche, les notifications et les réservations.

---

## 💬 EXEMPLES DE QUESTIONS POSÉES

Pour bien comprendre les besoins, j'ai posé des questions ciblées :

### ❓ Quel problème essayez-vous de résoudre ?

**Réponse du directeur :**
> "Nos lecteurs se déplacent parfois pour rien car le livre qu'ils veulent est déjà emprunté. On perd aussi beaucoup de temps à gérer les retards manuellement. Et on ne sait pas vraiment quels livres acheter car on n'a pas de statistiques d'utilisation."

**Besoins identifiés :**
- ✅ Catalogue consultable en ligne
- ✅ Système de réservations
- ✅ Gestion automatique des retards
- ✅ Dashboard statistiques

---

### ❓ Quelles sont les contraintes actuelles ?

**Réponse :**
- **Budget limité :** Pas de budget pour un logiciel commercial coûteux
- **Temps :** Projet à livrer en 6 mois
- **Compétences :** Personnel pas très à l'aise avec l'informatique
- **Technique :** Pas de serveur sur place (hébergement cloud nécessaire)

**Impact sur le projet :**
- ✅ Solution open-source et gratuite (Laravel + React)
- ✅ Planning réaliste avec priorisation des fonctionnalités
- ✅ Interface simple et intuitive
- ✅ Hébergement cloud (Vercel + Railway)

---

### ❓ Quels bénéfices espérez-vous obtenir ?

**Réponses attendues :**

**Pour la bibliothèque :**
- Gain de temps : 30% de temps administratif en moins
- Réduction des pertes de livres : meilleur suivi
- Augmentation des emprunts : facilité d'accès
- Meilleure gestion du budget : statistiques d'utilisation

**Pour les bibliothécaires :**
- Moins de tâches répétitives
- Plus de temps pour l'accompagnement des lecteurs
- Moins de stress lié aux retards

**Pour les lecteurs :**
- Accès 24/7 au catalogue
- Pas de déplacement inutile
- Découverte de nouveaux livres
- Meilleure expérience globale

---

## 📊 PRIORISATION DES BESOINS (MÉTHODE MoSCoW)

Pour organiser le développement, j'ai classé les besoins par priorité selon la méthode MoSCoW :

### 🔴 MUST HAVE (Indispensable - MVP)

**Sans ces fonctionnalités, l'application ne peut pas fonctionner**

- ✅ Authentification (lecteur, bibliothécaire, admin)
- ✅ Catalogue de livres consultable
- ✅ Recherche de livres
- ✅ Gestion des emprunts (création, retour)
- ✅ Gestion des réservations
- ✅ Notifications de retour
- ✅ Interface responsive

---

### 🟠 SHOULD HAVE (Important - Phase 2)

**Fonctionnalités importantes qui améliorent significativement l'expérience**

- ✅ Système d'avis et notes
- ✅ Dashboard statistiques admin
- ✅ Recommandations personnalisées
- ✅ Export des données perso (RGPD)
- ✅ Favoris
- ✅ Renouvellement d'emprunt

---

### 🟡 COULD HAVE (Optionnel - Bonus)

**Nice to have, mais pas critique**

- ✅ Liste de souhaits communautaire
- ✅ Statistiques de lecture personnelles
- ✅ Badges de lecteur
- ✅ Suggestions d'achat (lecteurs proposent des livres)

---

### ⚪ WON'T HAVE (Hors scope pour cette version)

**Fonctionnalités exclues volontairement**

- ❌ Application mobile native (la PWA suffira)
- ❌ Réseau social complet
- ❌ Chat en direct
- ❌ Gestion des amendes financières
- ❌ E-books / livres numériques

---

## ✅ SYNTHÈSE DE L'ANALYSE DES BESOINS

Grâce à cette analyse approfondie, j'ai maintenant une vision claire de :

### Ce que je sais maintenant :

✅ **Pourquoi** chaque fonctionnalité est nécessaire (motivations)
✅ **Quoi** développer concrètement (liste des fonctionnalités)
✅ **Comment** le réaliser techniquement (stack, architecture, solutions)
✅ **Dans quel ordre** développer (priorisation MoSCoW)
✅ **Pour qui** je développe (parties prenantes et leurs besoins)

### Prochaines étapes :

➡️ Formaliser tout ça dans un **Cahier des Charges** structuré
➡️ Créer les **maquettes** de l'interface
➡️ Concevoir la **base de données** (MCD/MLD)
➡️ Planifier le **développement** par sprints

---

**Document créé dans le cadre du projet CDA - RNCP 37873**
**Candidat :** Naim H.
**Formation :** Concepteur Développeur d'Applications
**Date :** Janvier 2026
