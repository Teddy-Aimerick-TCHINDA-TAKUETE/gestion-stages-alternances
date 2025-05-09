# Étape 1 : build Angular (dans une image Node.js)

# Image avec Node.js (léger)
FROM node:23-alpine3.20 AS builder

# Dossier de travail
WORKDIR /app

# Copie tout le projet Angular dans le conteneur
COPY . .

# Installe les dépendances
RUN npm install

# Compile le frontend en mode production (génère le dossier /dist)
RUN npm run build -- --configuration=production

# Étape 2 : Nginx pour servir les fichiers compilés

# Image Nginx légère
FROM nginx:stable-alpine

# Copie les fichiers Angular générés vers le dossier public de Nginx
COPY --from=builder /app/dist/frontend-angular/browser /usr/share/nginx/html

# (Optionnel) Ajoute ton fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port HTTP
EXPOSE 80

# Démarre Nginx en mode frontal
CMD ["nginx", "-g", "daemon off;"]