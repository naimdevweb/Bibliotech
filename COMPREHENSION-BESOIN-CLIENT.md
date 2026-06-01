# COMPRÉHENSION DU BESOIN CLIENT
## Projet : Système de Gestion de Bibliothèque Municipale

---

## 📋 Introduction

Dans le cadre de mon projet CDA, je dois développer une application web pour moderniser la gestion d'une bibliothèque municipale. Avant de me lancer dans le développement, j'ai pris le temps de bien comprendre les besoins réels de mes utilisateurs. Ce document retrace ma démarche d'analyse et de compréhension du besoin client.

---

## 💡 Comprendre le POURQUOI avant le QUOI

### La méthode de la pelle

Quand j'ai commencé à réfléchir à ce projet, je me suis rappelé l'exemple de la pelle qu'on nous a donné en formation. Un client dit "j'ai besoin d'une pelle", on pourrait simplement lui donner une pelle. Mais si on creuse plus loin :

- **Il veut une pelle** → pourquoi ?
- **Pour creuser un trou** → pourquoi ?
- **Pour planter un arbre** → pourquoi ?
- **Pour faire de l'ombre** → pourquoi ?
- **Parce que le soleil tape trop fort sur la terrasse** → Ah ! En fait, il a besoin d'un parasol !

C'est exactement ce que j'ai appliqué pour comprendre les vrais besoins de la bibliothèque.

### Application à mon projet

La bibliothèque pourrait dire : "On a besoin d'un logiciel de gestion des prêts". Mais j'ai creusé plus profondément :

**Demande initiale :** "On veut informatiser nos prêts de livres"

**Pourquoi ?**
- Les fiches papier prennent trop de temps
- On perd parfois la trace des emprunts
- Les lecteurs ne savent pas quels livres sont disponibles

**Pourquoi c'est un problème ?**
- Le personnel passe 30% de son temps en tâches administratives
- Des livres sont perdus ou jamais rendus
- Les lecteurs se déplacent pour rien quand le livre n'est pas dispo

**Quel est le vrai besoin ?**
- **Gagner du temps** pour que le personnel puisse se concentrer sur l'accompagnement des lecteurs
- **Faciliter l'accès à la culture** pour que les habitants lisent plus
- **Optimiser les ressources** pour éviter les pertes et mieux gérer le budget

**Solution réelle :** Une application complète qui facilite la vie des lecteurs ET du personnel, avec catalogue en ligne, réservations, notifications automatiques, et suivi en temps réel.

---

## 👥 IDENTIFICATION DES PARTIES PRENANTES

Pour réussir ce projet, j'ai identifié toutes les personnes concernées par l'application. Chacune a des besoins et des attentes différentes.

### Qui sont les parties prenantes de mon projet ?

#### 1. **Le Client / Commanditaire : La Bibliothèque Municipale**
- **Rôle :** Finance et valide le projet
- **Besoin principal :** Moderniser la gestion pour réduire les coûts et améliorer le service
- **Attente :** Une solution simple, efficace et facile à prendre en main
- **Priorité :** 🔴 HAUTE

#### 2. **Les Utilisateurs Finaux - Lecteurs**
- **Rôle :** Utilisent l'application pour consulter, réserver et emprunter des livres
- **Besoins principaux :**
  - Trouver rapidement les livres qui les intéressent
  - Savoir si un livre est disponible avant de se déplacer
  - Réserver un livre qui les intéresse
  - Recevoir des rappels pour les retours
  - Découvrir de nouveaux livres
- **Attente :** Interface simple, rapide, accessible depuis mobile
- **Priorité :** 🔴 HAUTE

#### 3. **Les Utilisateurs Finaux - Bibliothécaires**
- **Rôle :** Gèrent les emprunts, retours, et le catalogue
- **Besoins principaux :**
  - Enregistrer rapidement les prêts et retours
  - Suivre les retards et relancer les lecteurs
  - Gérer le catalogue de livres
  - Voir les statistiques d'utilisation
- **Attente :** Interface efficace, gain de temps, moins de tâches répétitives
- **Priorité :** 🔴 HAUTE

#### 4. **L'Administrateur / Directeur de Bibliothèque**
- **Rôle :** Supervise l'ensemble, gère les utilisateurs et les statistiques
- **Besoins principaux :**
  - Dashboard avec statistiques clés
  - Gestion des droits utilisateurs
  - Rapports d'activité
- **Attente :** Vision d'ensemble, aide à la prise de décision
- **Priorité :** 🔴 HAUTE

#### 5. **Moi - Le Développeur / Candidat CDA**
- **Rôle :** Conception, développement et déploiement
- **Besoin principal :** Valider le titre professionnel CDA
- **Attente :** Projet démontrant mes compétences techniques, code de qualité
- **Priorité :** 🔴 HAUTE

#### 6. **Le Jury CDA**
- **Rôle :** Évalue le projet pour validation du titre
- **Besoin principal :** Vérifier que je maîtrise les compétences requises (CCP1, CCP2, CCP3)
- **Attente :** Architecture solide, code propre, sécurisé, et documenté
- **Priorité :** 🔴 HAUTE

#### 7. **Le Formateur (jeremy@garage404.com)**
- **Rôle :** M'accompagne dans la réalisation du projet
- **Besoin principal :** Suivre mon avancement et me guider
- **Attente :** Documentation claire, respect des bonnes pratiques
- **Priorité :** 🟡 MOYENNE

#### 8. **Hébergeurs / Fournisseurs Techniques**
- **Rôle :** Hébergent l'application (Vercel, Railway)
- **Impact :** Disponibilité et performance de l'application
- **Priorité :** 🟡 MOYENNE

---

## 📊 MATRICE DES PARTIES PRENANTES

| Partie Prenante | Rôle Principal | Intérêt / Impact | Priorité | Niveau d'Influence |
|-----------------|---------------|------------------|----------|-------------------|
| **Bibliothèque (Client)** | Financement & Validation | Objectifs et budget | 🔴 HAUTE | ⭐⭐⭐⭐⭐ |
| **Lecteurs** | Utilisation quotidienne | Satisfaction & Usabilité | 🔴 HAUTE | ⭐⭐⭐⭐ |
| **Bibliothécaires** | Gestion opérationnelle | Efficacité & Gain de temps | 🔴 HAUTE | ⭐⭐⭐⭐⭐ |
| **Administrateur** | Supervision | Pilotage & Décisions | 🔴 HAUTE | ⭐⭐⭐⭐⭐ |
| **Moi (Développeur)** | Réalisation technique | Qualité du produit | 🔴 HAUTE | ⭐⭐⭐⭐⭐ |
| **Jury CDA** | Évaluation | Conformité au référentiel | 🔴 HAUTE | ⭐⭐⭐⭐⭐ |
| **Formateur** | Accompagnement | Respect des bonnes pratiques | 🟡 MOYENNE | ⭐⭐⭐ |
| **Hébergeurs** | Infrastructure | Disponibilité technique | 🟡 MOYENNE | ⭐⭐ |

---

## 🎯 RÔLES ET RESPONSABILITÉS DES PARTIES PRENANTES

### Définir les attentes

Chaque partie prenante doit clairement exprimer ses besoins. J'ai donc organisé des "interviews fictives" pour me mettre à leur place :

**Le directeur de la bibliothèque :**
> "Je veux pouvoir voir en un coup d'œil combien de livres sont empruntés, lesquels sont en retard, et quels sont les livres les plus populaires. Ça m'aidera à mieux gérer le budget d'acquisition."

**Une bibliothécaire :**
> "Je passe trop de temps à chercher les fiches papier, noter les dates, calculer les retards. J'aimerais juste scanner un code-barre et que tout se fasse automatiquement."

**Un lecteur régulier :**
> "J'aimerais pouvoir voir depuis chez moi si le livre que je veux est disponible. Et recevoir un mail quand un livre réservé est dispo, plutôt que de passer tous les jours à la bibliothèque."

### Fournir des retours

Tout au long du développement, je vais devoir recueillir les retours pour m'assurer que l'application répond bien aux attentes. Pour cela, je prévois :

- **Maquettes validées** avant de coder
- **Tests utilisateurs** pendant le développement
- **Démo régulière** au formateur
- **Feedback du jury** lors de la soutenance

### Prendre des décisions clés

Certaines parties prenantes ont le pouvoir de prendre des décisions importantes :

- **Le client (bibliothèque)** : valide les fonctionnalités prioritaires
- **Le jury CDA** : détermine si je valide ou non
- **Moi-même** : choix techniques (technologies, architecture)

---

## 🔍 TECHNIQUES D'IDENTIFICATION DES PARTIES PRENANTES

Pour être sûr de n'oublier personne, j'ai utilisé plusieurs techniques :

### 1. Brainstorming

J'ai listé toutes les personnes qui pourraient être concernées :
- Qui va utiliser l'application ?
- Qui la finance ?
- Qui l'évalue ?
- Qui peut influencer le projet ?

### 2. Analyse documentaire

J'ai examiné :
- Le référentiel CDA (RNCP 37873)
- Les documents de formation
- Les règles métier du projet

### 3. Mise en situation

Je me suis mis à la place de chaque utilisateur :
- "Si j'étais un lecteur, qu'est-ce que j'attendrais ?"
- "Si j'étais bibliothécaire, comment je voudrais travailler ?"

### 4. Carte des parties prenantes

J'ai créé un schéma visuel pour mieux comprendre les relations entre les parties prenantes.

---

## ✅ IMPORTANCE DE L'IDENTIFICATION DES PARTIES PRENANTES

### Alignement des objectifs

Identifier toutes les parties prenantes me permet de m'assurer que les objectifs sont alignés :
- Le client veut **réduire les coûts**
- Les bibliothécaires veulent **gagner du temps**
- Les lecteurs veulent **faciliter l'accès aux livres**
- Le jury veut **valider mes compétences**

Mon application doit répondre à tous ces besoins simultanément.

### Gestion des risques

Comprendre qui peut influencer le projet m'aide à anticiper les problèmes :
- Si je ne consulte pas les bibliothécaires, je risque de créer une interface inadaptée
- Si j'ignore les attentes du jury, je risque de ne pas valider mon titre
- Si je néglige les lecteurs, l'application ne sera pas utilisée

### Communication efficace

Une identification claire facilite la communication :
- Je sais à qui m'adresser pour chaque question
- Je peux adapter mon discours selon l'interlocuteur
- Je réduis les malentendus

---

## 📝 SYNTHÈSE

Grâce à cette analyse approfondie des parties prenantes, j'ai une vision claire de :

✅ **Qui** est concerné par le projet
✅ **Pourquoi** chacun s'y intéresse
✅ **Quoi** chacun attend de l'application
✅ **Comment** je vais répondre à ces attentes

Cette compréhension du besoin client me permet maintenant de passer à l'étape suivante : l'analyse détaillée des besoins.

---

**Document créé dans le cadre du projet CDA - RNCP 37873**
**Candidat :** Naim H.
**Formation :** Concepteur Développeur d'Applications
**Date :** Janvier 2026
