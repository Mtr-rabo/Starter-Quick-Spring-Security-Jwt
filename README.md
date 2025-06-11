profile
Qwen3-235B-A22B
5:04 pm
Voici un README.md complet basé sur les informations extraites de ton fichier texte, qui reflète parfaitement ton projet combinant Angular + Spring Boot + JWT .

🔐 Spring Security JWT Fullstack Project
Projet full-stack utilisant Spring Boot (backend) avec JWT et Spring Security , et Angular (frontend).

📁 Structure du Projet

1
2
3
springSecurityJwt/
├── secSpringBootStatefull/ # Backend Spring Boot
└── user-management/ # Frontend Angular
Ce dépôt contient à la fois le backend Spring Boot et le frontend Angular dans une structure monorepo.

🧩 Fonctionnalités Implémentées
Authentification via JWT
Gestion des utilisateurs, profils et rôles
Interceptor Angular pour ajout automatique du token aux requêtes HTTP
Guards Angular (CanActivate) pour la protection des routes :
authenticat-guard
authorization-guard
Composants Angular :
admin, login, create-user, create-profile, list-users, list-profile
Services Angular :
auth-service, user-service, profile-service, role-service, loading-service
Modèles TypeScript :
user.model.ts, profile.model.ts, role.model.ts
🔧 Technologies Utilisées
Backend
Java 17, Spring Boot, Spring Security, JWT, Maven
Frontend
Angular 16+, Angular Material, Bootstrap 5
Authentification
JWT (JSON Web Token)
Base de données
H2 (en mémoire), ou MySQL/PostgreSQL (configurable)

🚀 Démarrage du Projet

1. Backend : Spring Boot
   Prérequis :
   Java 17+
   Maven
   bash

1
2
cd secSpringBootStatefull
mvn spring-boot:run
Le backend sera accessible sur : http://localhost:8080

2. Frontend : Angular
   Prérequis :
   Node.js (v16+ recommandé)
   Angular CLI
   bash

1
2
3
cd user-management
npm install
ng serve
L’application Angular sera disponible sur : http://localhost:4200

🌐 Configuration du Proxy (facultatif mais utile en dev)
Créez un fichier proxy.conf.json dans le dossier Angular (user-management) :

json

1
2
3
4
5
6
7
⌄
⌄
{
"/api": {
"target": "http://localhost:8080",
"secure": false,
"changeOrigin": true
}
}
Puis lancez Angular avec :

bash

1
ng serve --proxy-config proxy.conf.json
📝 Routes Utiles
Backend API
/api/auth/login
POST
Connexion utilisateur
/api/users
GET
Liste des utilisateurs
/api/profiles
GET
Liste des profils
/api/users/create
POST
Créer un utilisateur

Toutes les routes sont protégées sauf /api/auth/login.

Frontend Pages
Login
/login
Public
Dashboard Admin
/admin
ROLE_ADMIN
Liste des Profils
/admin/profiles
ROLE_ADMIN
Liste des Utilisateurs
/admin/users
ROLE_ADMIN
Créer un Profil
/admin/create-profile
ROLE_ADMIN
Créer un Utilisateur
/admin/create-user
ROLE_ADMIN

🔐 Sécurité
Authentification basée sur JWT
Gestion des rôles via Spring Security Authorities
Accès conditionné par rôle grâce à @PreAuthorize("hasAuthority('ROLE_ADMIN')")
Interceptor Angular pour ajouter le token aux requêtes HTTP
📦 Modèles Principaux
User (AppUser)
id, username, email, password, enabled, profile
Profile
id, name, roles
Role
id, name (ex: ROLE_USER, ROLE_ADMIN)
🧪 Swagger UI (Documentation API)
Accédez à l'interface Swagger à cette adresse après démarrage du backend :

1
http://localhost:8080/swagger-ui/index.html
📁 Commandes Git Utilisées
Voici un résumé des commandes utilisées pour structurer ce projet :

bash

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29

# Générer des composants Angular

ng g c admin
ng g c create-profile
ng g c list-profile
ng g c list-users
ng g c create-user
ng g c login

# Générer des services Angular

ng g service services/auth-service
ng g service services/user-service
ng g service services/profile-service
ng g service services/role-service
ng g service services/loading

# Générer des guards

ng g guard guards/authenticatGuard
ng g guard guards/authorization

# Générer un interceptor

ng g interceptor intercepters/httpIntercepter

# Initialiser Git et pousser vers GitHub

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Mtr-rabo/springSecurityJwt.git
git push -u origin main
🧹 Nettoyage & Maintenance
Build Maven
bash

cd secSpringBootStatefull
mvn clean package
Build Angular
bash

cd user-management
ng build --prod
📬 Contribuer
Si vous souhaitez contribuer à ce projet, veuillez fork, créer une branche et soumettre une pull request.
