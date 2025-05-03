# Étape 1 : build avec Maven (dans une première image temporaire)

# Utilise une image avec Maven + Java 17
FROM maven:3.9.9-eclipse-temurin-17 AS builder

# Définit le dossier de travail dans le conteneur
WORKDIR /build

# Copie tout le projet backend dans ce dossier
COPY . .

# Compile l’application et génère le fichier JAR sans exécuter les tests
RUN mvn clean package -DskipTests

# Étape 2 : image finale plus légère (sans Maven)

# Image Java légère uniquement pour exécuter l'application
FROM openjdk:17-jdk-slim

# Crée un dossier de travail dans le conteneur
WORKDIR /app

# Copie le JAR compilé depuis l'étape précédente
COPY --from=builder /build/target/*.jar app.jar

# Expose le port 8080 pour l’accès à ton API
EXPOSE 8080

# Démarre le backend avec java -jar
ENTRYPOINT ["java", "-jar", "app.jar"]