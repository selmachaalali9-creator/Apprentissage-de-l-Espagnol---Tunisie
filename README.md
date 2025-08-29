# Apprentissage de l'Espagnol - Tunisie

Une application web interactive et moderne conçue pour aider les élèves de 3ème année et du baccalauréat en Tunisie à apprendre l'espagnol (matière optionnelle).

**[Voir la démo en direct](https://VOTRE_NOM_UTILISATEUR.github.io/NOM_DU_DEPOT/)** <!-- Lien à remplacer après le déploiement -->

 
<!-- Ajoutez ici une capture d'écran de votre application -->

## 🚀 Description

Ce projet offre une plateforme complète avec des cours structurés, des exercices interactifs, des compréhensions orales et des annales du baccalauréat. L'objectif est de fournir un outil d'apprentissage moderne, accessible et engageant, doté de fonctionnalités avancées pour une expérience utilisateur optimale.

## ✨ Fonctionnalités

-   📚 **Cours Détaillés** : Leçons de grammaire et de vocabulaire pour les niveaux 3ème Année et Bac, avec support audio pour certaines leçons.
-   ✍️ **Exercices Interactifs** : Questions à choix multiples et à compléter avec correction instantanée, score en pourcentage et explications détaillées pour chaque réponse incorrecte.
-   🤖 **Génération d'Exercices par IA Sécurisée** : Créez des exercices personnalisés sur n'importe quel sujet avec un niveau de difficulté ajustable (Facile, Moyen, Difficile) grâce à l'API Google Gemini, via un serveur intermédiaire qui protège la clé API.
-   🎧 **Compréhension Orale** : Écoutez des dialogues authentiques et testez votre compréhension avec des questions et une transcription disponible.
-   📜 **Annales du Bac** : Accédez aux sujets des années précédentes pour une préparation complète à l'examen.
-   👤 **Authentification Utilisateur** : Système de connexion et d'inscription sécurisé pour permettre un futur suivi de la progression.
-   📱 **Design Responsive** : Expérience utilisateur fluide et optimisée sur ordinateur, tablette et mobile, avec une navigation adaptée.
-   🌙 **Mode Sombre** : Basculez entre un thème clair et sombre pour un meilleur confort visuel. Votre préférence est sauvegardée.
-   🧪 **Tests Automatisés** : Une suite de tests avec Jest et React Testing Library pour garantir la fiabilité et la stabilité de l'application.

## 🛠️ Technologies Utilisées

-   **Frontend** : React, TypeScript
-   **Backend** : Node.js, Express
-   **Styling** : Tailwind CSS
-   **IA Générative** : Google Gemini API
-   **Tests** : Jest & React Testing Library
-   **Déploiement (Suggéré)** : GitHub Pages, Vercel, Netlify

## 🏛️ Architecture du Projet

L'application est construite sur une architecture client-serveur moderne. Pour une description détaillée de la structure des fichiers, de la gestion de l'état et des principes de conception, veuillez consulter notre document d'architecture.

**[➡️ Lire la documentation sur l'architecture](./ARCHITECTURE.md)**

## ⚙️ Comment lancer le projet

Ce projet est conçu pour fonctionner dans un environnement de développement web qui supporte un frontend React et un backend Node.js.

1.  Assurez-vous d'avoir tous les fichiers du projet dans un même dossier.
2.  Configurez votre clé API Gemini en tant que variable d'environnement `API_KEY` pour le serveur.
3.  Lancez le serveur backend (ex: `node server.js` ou `ts-node server.ts`).
4.  Ouvrez le fichier `index.html` dans un navigateur web moderne.

---
*Créé avec passion par Selma Chaalali*
