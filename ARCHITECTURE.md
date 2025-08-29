# Schéma d'Architecture du Projet : "Espagnol Facile"

L'application suit une architecture **client-serveur moderne**, avec une séparation claire des préoccupations. Elle est conçue pour être sécurisée, maintenable, évolutive et testable.

## 1. Vue d'ensemble de la Structure des Fichiers

Voici une représentation arborescente de l'organisation du projet :

```
/
├── server.ts                  # Serveur backend (proxy pour Gemini)
│
├── public/
│   └── favicon.svg              # Icône du site
│
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Barre latérale de navigation
│   │   ├── MainContent.tsx      # Conteneur principal du contenu
│   │   ├── Lesson.tsx           # Affiche une leçon
│   │   ├── Exercise.tsx         # Affiche un exercice écrit
│   │   ├── ListeningExercise.tsx# Affiche un exercice d'écoute
│   │   ├── BacExams.tsx         # Affiche les annales du bac
│   │   ├── AuthModal.tsx        # Fenêtre modale pour la connexion/inscription
│   │   ├── AuthForm.tsx         # Formulaire pour la connexion/inscription
│   │   ├── Tabs.tsx             # Composant réutilisable d'onglets
│   │   ├── Icons.tsx            # Collection d'icônes SVG
│   │   ├── LoadingSpinner.tsx   # Indicateur de chargement
│   │   └── *.test.tsx           # Tests unitaires pour les composants
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx      # Contexte global pour l'authentification
│   │
│   ├── data/
│   │   ├── courseData.ts        # Contenu statique des cours et exercices
│   │   └── examData.ts          # Données pour les annales du bac
│   │
│   ├── services/
│   │   ├── authService.ts       # Logique d'authentification (simulée)
│   │   └── geminiService.ts     # Communication avec le backend pour l'API Gemini
│   │
│   ├── App.tsx                  # Composant racine, gère l'état principal
│   ├── index.tsx                # Point d'entrée de l'application React
│   └── types.ts                 # Définitions TypeScript centrales
│
├── .gitignore                   # Fichiers à ignorer par Git
├── index.html                   # Fichier HTML principal
├── LICENSE                      # Licence du projet (MIT)
├── metadata.json                # Métadonnées de l'application
└── README.md                    # Documentation du projet
```

## 2. Flux des Données et Gestion de l'État

L'architecture des données est conçue pour être claire et prévisible.

#### État Principal du Frontend (Centralisé dans `App.tsx`)

-   Le composant `App.tsx` agit comme le **chef d'orchestre du frontend**. Il détient l'état principal de l'interface utilisateur, tel que `selectedLevel`, `selectedTopicId`, `theme`, etc.
-   Il utilise le patron de conception **"Lifting State Up"** : l'état est "remonté" au parent commun le plus proche et distribué aux enfants via des props. Les enfants communiquent en retour via des fonctions de rappel (ex: `onSelectLevel`).

#### Flux de Données pour l'IA

-   Lorsque l'utilisateur demande la génération d'un exercice, le frontend (`geminiService.ts`) **n'appelle plus directement l'API Gemini**.
-   À la place, il envoie une requête HTTP POST au **serveur backend** (`server.ts`).
-   Ce serveur, qui détient la clé API en toute sécurité, relaie la demande à Gemini, puis renvoie la réponse au client. Cela **empêche l'exposition de la clé API** dans le navigateur.

#### État Transversal (React Context)

-   Pour l'état qui doit être accessible de manière globale, comme les informations de l'utilisateur connecté, l'**API Context** de React est utilisée.
-   `AuthContext.tsx` expose l'utilisateur actuel (`currentUser`) et les méthodes d'authentification (`login`, `logout`) à n'importe quel composant de l'application, sans avoir à passer des props à travers de multiples niveaux (**évite le "prop drilling"**).

## 3. Serveur Intermédiaire (Backend)

Un serveur Node.js/Express (`server.ts`) a été introduit pour des raisons de sécurité et de séparation des préoccupations.

-   **Rôle principal** : Agir comme un **proxy sécurisé** pour l'API Google Gemini. La clé API est stockée et utilisée uniquement sur le serveur, la protégeant ainsi de toute exposition côté client.
-   **Responsabilités** :
    -   Recevoir les requêtes de génération d'exercices du client.
    -   Construire et envoyer la requête à l'API Gemini.
    -   Gérer les erreurs de communication avec l'API.
    -   Retourner les données formatées au client.

## 4. Principes Architecturaux

#### Séparation des Préoccupations (Separation of Concerns)

-   **Frontend (`/src`)** : Responsable de l'interface utilisateur, de la gestion de l'état de l'UI et de l'interaction avec l'utilisateur.
-   **Backend (`server.ts`)** : Responsable de la logique métier sensible (comme les appels API avec des clés secrètes) et de la communication avec des services externes.
-   **Services Frontend (`/src/services`)** : Agissent comme une couche d'abstraction pour la communication, que ce soit avec le backend (`geminiService`) ou avec le stockage local (`authService`).
-   **Données (`/data`)** : Le contenu statique est séparé du code de l'application, ce qui facilite sa mise à jour.

#### Modularité et Réutilisabilité

-   L'interface est décomposée en petits **composants réutilisables** (`Tabs`, `Icons`, `LoadingSpinner`).
-   Les **services sont abstraits**, ce qui signifie qu'on pourrait facilement modifier la source des données sans changer les composants.

#### Robustesse et Qualité

-   **TypeScript** est utilisé partout pour un typage statique fort, ce qui élimine de nombreuses erreurs courantes au moment du développement.
-   Une **suite de tests automatisés** (`*.test.tsx`) valide le comportement des composants clés, assurant que l'application reste stable.

Cette architecture solide fait du projet une base excellente, prête à être enrichie de nouvelles fonctionnalités de manière sécurisée et organisée.