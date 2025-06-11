🔐 Spring Security JWT Fullstack Project
Projet full-stack utilisant Spring Boot (backend) avec JWT et Spring Security , et Angular (frontend).

📁 Structure du Projet

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

cd secSpringBootStatefull
mvn spring-boot:run
Le backend sera accessible sur : http://localhost:8080

2. Frontend : Angular
   Prérequis :
   Node.js (v16+ recommandé)
   Angular CLI
   bash

cd user-management
npm install
ng serve
L’application Angular sera disponible sur : http://localhost:4200

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

http://localhost:8080/swagger-ui/index.html

les composes

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

cd secSpringBootStatefull
mvn clean package
Build Angular
bash

cd user-management
ng build --prod
📬 Contribuer
Si vous souhaitez contribuer à ce projet, veuillez fork, créer une branche et soumettre une pull request.
