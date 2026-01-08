# Prof React Front-End

Application React pour la gestion des professeurs avec authentification JWT.

## 📁 Structure du projet

```
src/
├── components/           # Composants réutilisables
│   ├── common/          # Composants communs (inputs, boutons, etc.)
│   │   └── TextInput.js
│   └── profs/           # Composants spécifiques aux professeurs
│       ├── ProfForm.js  # Formulaire d'ajout/modification
│       ├── ProfItem.js  # Ligne de tableau pour un prof
│       └── ProfList.js  # Liste des professeurs
│
├── config/              # Fichiers de configuration
│   └── api.config.js    # Configuration de l'API (URL, endpoints)
│
├── context/             # Contextes React
│   └── AuthContext.js   # Gestion de l'état d'authentification
│
├── pages/               # Pages principales de l'application
│   ├── Home.js         # Page d'accueil avec liste des profs
│   ├── Login.js        # Page de connexion
│   └── Form.js         # Re-export du formulaire
│
├── routes/              # Configuration du routage
│   ├── AppRoutes.js    # Définition des routes
│   └── ProtectedRoute.js # HOC pour protéger les routes
│
├── services/            # Services pour les appels API
│   ├── api.service.js  # Configuration Axios avec intercepteurs
│   ├── auth.service.js # Service d'authentification
│   └── prof.service.js # Service CRUD pour les professeurs
│
├── utils/               # Fonctions utilitaires
│   └── auth.js         # Utilitaires d'authentification (token management)
│
├── App.js              # Composant racine
└── index.js            # Point d'entrée de l'application
```

## 🏗️ Architecture

### Services
- **api.service.js**: Client Axios configuré avec intercepteurs pour :
  - Ajouter automatiquement le token JWT aux requêtes
  - Gérer les erreurs d'authentification (redirection vers login si 401)
  
### Context API
- **AuthContext**: Gestion centralisée de l'état d'authentification
  - Hook `useAuth()` pour accéder à l'état depuis n'importe quel composant

### Routes protégées
- Les routes nécessitant une authentification sont enveloppées dans `<ProtectedRoute>`
- Redirection automatique vers `/login` si non authentifié

### Composants
- **Composants atomiques** dans `components/common/`: réutilisables partout
- **Composants métier** dans `components/profs/`: spécifiques au domaine

## 🚀 Démarrage

```bash
npm install
npm start
```

## 🔑 Authentification

L'application utilise JWT (JSON Web Token) stocké dans le localStorage :
- **Login**: `POST /api/v1/auth` avec `{nom, mdp}`
- **Token** stocké automatiquement après connexion réussie
- **Token** ajouté à chaque requête via l'intercepteur Axios
- **Déconnexion** supprime le token et redirige vers login

## 📦 Dépendances principales

- React Router Dom (routing)
- Axios (requêtes HTTP)
- Bootstrap (UI)

## 🎯 Bonnes pratiques implémentées

✅ Séparation des préoccupations (services, composants, pages)  
✅ Réutilisabilité des composants  
✅ Gestion centralisée de l'état d'authentification  
✅ Intercepteurs Axios pour la gestion des tokens  
✅ Routes protégées avec HOC  
✅ Configuration centralisée de l'API  
✅ Gestion des erreurs et états de chargement  
