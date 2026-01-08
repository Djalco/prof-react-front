# 📊 Dashboard - Guide d'utilisation

## 🎯 Fonctionnalités

Votre application dispose maintenant d'un **dashboard complet** avec navigation :

### Pages disponibles :

1. **🏠 Dashboard (Accueil)** - `/`
   - Vue d'ensemble avec accès rapide aux sections
   - Cartes pour naviguer vers Professeurs et Messages
   - Actions rapides

2. **👨‍🏫 Professeurs** - `/profs`
   - Liste de tous les professeurs
   - Ajouter, modifier, supprimer des professeurs
   - Recherche et gestion

3. **💬 Messages** - `/messages`
   - Consulter tous les messages
   - Ajouter de nouveaux messages
   - Affichage avec dates

4. **🔐 Connexion** - `/login`
   - Authentification sécurisée
   - Gestion des sessions avec JWT

## 🗺️ Navigation

### Barre de navigation
La navbar est présente sur toutes les pages du dashboard et contient :
- **Logo** : Retour à l'accueil
- **Menu Professeurs** : Accès à la liste des profs
- **Menu Messages** : Accès aux messages
- **Bouton Déconnexion** : Se déconnecter et retourner au login

### Routes disponibles

```
/                    → Dashboard (accueil)
/login              → Page de connexion
/profs              → Liste des professeurs
/prof-create        → Ajouter un professeur
/prof/:id           → Modifier un professeur
/messages           → Liste des messages
```

## 🎨 Structure des composants

```
src/
├── layouts/
│   └── DashboardLayout.js     # Layout avec navbar
├── pages/
│   ├── Dashboard.js           # Page d'accueil du dashboard
│   ├── Home.js                # Liste des professeurs
│   ├── Messages.js            # Gestion des messages
│   ├── Login.js               # Page de connexion
│   └── Form.js                # Formulaire prof
├── components/
│   ├── common/
│   │   ├── Navbar.js          # Barre de navigation
│   │   └── TextInput.js       # Input réutilisable
│   └── profs/
│       ├── ProfList.js
│       ├── ProfItem.js
│       └── ProfForm.js
├── services/
│   ├── auth.service.js        # Service d'authentification
│   ├── prof.service.js        # Service CRUD profs
│   └── message.service.js     # Service CRUD messages
└── styles/
    └── dashboard.css          # Styles personnalisés
```

## 🚀 Utilisation

### Lancer l'application

```bash
# Terminal 1 - Backend API
cd api-express-cors-jwt
npm start

# Terminal 2 - Frontend React
cd prof-react-front
npm start
```

### Workflow typique

1. **Connexion** : Entrez vos identifiants sur `/login`
2. **Dashboard** : Vous arrivez sur la page d'accueil
3. **Navigation** : Utilisez la navbar pour naviguer entre sections
4. **Professeurs** : 
   - Cliquez sur "Professeurs" dans la navbar
   - Ajoutez/modifiez/supprimez des profs
5. **Messages** : 
   - Cliquez sur "Messages" dans la navbar
   - Consultez et ajoutez des messages
6. **Déconnexion** : Cliquez sur "Déconnexion" pour sortir

## 🔒 Sécurité

- Toutes les routes sont protégées (sauf `/login`)
- Le token JWT est automatiquement ajouté aux requêtes
- Déconnexion automatique si le token expire (401)
- Redirection vers login si non authentifié

## 🎨 Design

- **Bootstrap 5** pour l'interface
- **Icônes emoji** pour une meilleure UX
- **Animations CSS** pour les transitions
- **Design responsive** (mobile-friendly)
- **Cards avec hover effects**
- **Loading spinners** pendant les chargements

## 📋 API Endpoints utilisés

```
POST   /api/v1/auth           # Connexion
GET    /api/v1/profs          # Liste des profs
POST   /api/v1/profs          # Créer un prof
PUT    /api/v1/profs/:id      # Modifier un prof
DELETE /api/v1/profs/:id      # Supprimer un prof
GET    /api/v1/messages       # Liste des messages
POST   /api/v1/messages       # Créer un message
```

## ✨ Améliorations apportées

✅ Dashboard avec page d'accueil visuelle  
✅ Navigation globale avec navbar  
✅ Section Messages complète  
✅ Layout réutilisable pour toutes les pages  
✅ Styles personnalisés et modernes  
✅ Meilleure organisation du code  
✅ UX améliorée avec icônes et animations  
