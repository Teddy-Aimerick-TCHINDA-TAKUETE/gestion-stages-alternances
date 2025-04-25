-- Table utilisateur : Étudiant
INSERT INTO gestionstagesalternances.utilisateur (id, nom, email, mot_de_passe, role) VALUES
( 1, 'Alice Dupont', 'alice.dupont@mail.com', 'azerty1', 'ETUDIANT'),
( 2, 'Mohamed Traoré', 'mohamed.traore@mail.com', 'azerty2', 'ETUDIANT'),
( 3, 'Julie Martin', 'julie.martin@mail.com', 'azerty3', 'ETUDIANT'),
( 4, 'Tariq El Amrani', 'tariq.elamrani@mail.com', 'azerty4', 'ETUDIANT'),
( 5, 'Fatou Ndiaye', 'fatou.ndiaye@mail.com', 'azerty5', 'ETUDIANT');

-- Table utilisateur : gestionstagesalternances.entreprise
INSERT INTO gestionstagesalternances.utilisateur (id, nom, email, mot_de_passe, role) VALUES
( 6, 'Capgemini', 'contact@capgemini.com', 'mdp6', 'ENTREPRISE'),
( 7, 'SNCF', 'contact@sncf.fr', 'mdp7', 'ENTREPRISE'),
( 8, 'EDF', 'contact@edf.fr', 'mdp8', 'ENTREPRISE'),
( 9, 'AXA', 'contact@axa.com', 'mdp9', 'ENTREPRISE'),
( 10, 'Airbus', 'contact@airbus.com', 'mdp10', 'ENTREPRISE');

-- Table utilisateur : Admin
INSERT INTO gestionstagesalternances.utilisateur (id, nom, email, mot_de_passe, role) VALUES
( 11, 'Claire Bernard', 'claire.bernard@admin.com', 'admin11', 'ADMIN'),
( 12, 'Jean Muller', 'jean.muller@admin.com', 'admin12', 'ADMIN'),
( 13, 'Karim Boutaïb', 'karim.boutaib@admin.com', 'admin13', 'ADMIN'),
( 14, 'Nina Gomis', 'nina.gomis@admin.com', 'admin14', 'ADMIN'),
( 15, 'Thomas Leclerc', 'thomas.leclerc@admin.com', 'admin15', 'ADMIN');

ALTER TABLE gestionstagesalternances.utilisateur  ALTER COLUMN id RESTART WITH 16;

-- Table entreprise
INSERT INTO gestionstagesalternances.entreprise ( id, nom, email, telephone, adresse, site_web, secteur_activite, user_id) VALUES
( 1, 'Capgemini', 'contact@capgemini.com', '0101010101', 'Paris', 'https://www.capgemini.com', 'Informatique', 6),
( 2, 'SNCF', 'contact@sncf.fr', '0102020202', 'Saint-Denis', 'https://www.sncf.com', 'Transport', 7),
( 3, 'EDF', 'contact@edf.fr', '0103030303', 'Nanterre', 'https://www.edf.fr', 'Énergie', 8),
( 4, 'AXA', 'contact@axa.com', '0104040404', 'La Défense', 'https://www.axa.fr', 'Assurance', 9),
( 5, 'Airbus', 'contact@airbus.com', '0105050505', 'Toulouse', 'https://www.airbus.com', 'Aéronautique', 10);
       
ALTER TABLE gestionstagesalternances.entreprise  ALTER COLUMN id RESTART WITH 6;
       
-- Table etudiant
INSERT INTO gestionstagesalternances.etudiant (id, niveau_etude, specialite, telephone, cv, user_id) VALUES
( 1, 'Licence 3', 'Développement Web', '0601010101', 'alice_cv.pdf', 1),
( 2, 'Master 1', 'Cybersécurité', '0602020202', 'mohamed_traore_cv.pdf', 2),
( 3, 'Licence 2', 'IA & Data Science', '0603030303', 'julie_martin_cv.pdf', 3),
( 4, 'Master 2', 'DevOps et Cloud', '0604040404', 'tariq_elamrani_cv.pdf', 4),
( 5, 'BUT 2', 'Systèmes embarqués', '0605050505', 'fatou_ndiaye_cv.pdf', 5);

ALTER TABLE gestionstagesalternances.etudiant  ALTER COLUMN id RESTART WITH 6;

-- Table stage/alternance
INSERT INTO gestionstagesalternances.stage ( id, titre, description, lieu, duree, date_debut, date_fin, etudiant_id, entreprise_id, type) VALUES
( 1, 'Développeur Full Stack Junior', 'Participation au développement d’une application web (front-end et back-end) pour une startup innovante.', 'Paris', '6 mois', '2025-06-01', '2025-12-01', 1, NULL, 'STAGE'),
( 2, 'Data Analyst Junior', 'Analyse de données clients et reporting au sein d’un service marketing. Utilisation de SQL et Python.', 'Lyon', '3 mois', '2025-07-01', '2025-10-01', 2, NULL, 'STAGE'),
( 3, 'Consultant Cybersécurité Alternant', 'Réalisation d’audits de sécurité et mise en œuvre de solutions de protection des SI.', 'Marseille', '24 mois', '2025-09-01', '2027-09-01', 3, NULL, 'ALTERNANCE'),
( 4, 'Ingénieur DevOps Alternant', 'Mise en place de pipelines CI/CD avec GitLab, gestion de conteneurs Docker et Kubernetes.', 'Toulouse', '12 mois', '2025-09-01', '2026-09-01', 4, NULL, 'ALTERNANCE'),
( 5, 'Assistant Chef de Projet IT', 'Suivi de projets digitaux, participation aux réunions clients, rédaction de compte-rendus.', 'Nantes', '4 mois', '2025-05-01', '2025-09-01', 5, NULL, 'STAGE'),
( 6, 'Développeur Mobile (Flutter)', 'Conception et développement d’une application mobile multiplateforme avec Flutter et Dart.', 'Paris', '5 mois', '2025-06-01', '2025-11-01', 1, NULL, 'STAGE'),
( 7, 'Alternance Analyste SI', 'Participation à la gestion du système d’information de l’entreprise. Support utilisateurs et documentation technique.', 'Lille', '18 mois', '2025-10-01', '2027-04-01', 2, NULL, 'ALTERNANCE'),
( 8, 'UI/UX Designer Junior', 'Réalisation de maquettes et prototypes pour des interfaces utilisateur web et mobile.', 'Rennes', '3 mois', '2025-07-15', '2025-10-15', 3, NULL, 'STAGE'),
( 9, 'Alternance Développeur Java Spring Boot', 'Développement de services REST avec Spring Boot dans un environnement agile (Scrum).', 'Grenoble', '24 mois', '2025-09-01', '2027-09-01', 4, NULL, 'ALTERNANCE'),
( 10,'Ingénieur Cloud DevOps (Stage)', 'Mise en place d’infrastructures cloud AWS (Terraform, EC2, S3, etc.) et automatisation.', 'Strasbourg', '6 mois', '2025-06-15', '2025-12-15', 5, NULL, 'STAGE');
   
ALTER TABLE gestionstagesalternances.stage  ALTER COLUMN id RESTART WITH 11;

-- Table candidature   
INSERT INTO gestionstagesalternances.candidature ( id, date_candidature, message, statut, etudiant_id, stage_id) VALUES
( 1, CURRENT_DATE - INTERVAL '10 days', 'Je suis très motivé(e) par ce stage, il correspond parfaitement à mon projet professionnel.', 'EN_ATTENTE', 1, 1),
( 2, CURRENT_DATE - INTERVAL '7 days', 'J’aimerais beaucoup rejoindre votre entreprise pour développer mes compétences en IA.', 'EN_ATTENTE', 2, 2),
( 3, CURRENT_DATE - INTERVAL '5 days', 'Je vous remercie pour cette opportunité, je suis disponible immédiatement.', 'ACCEPTEE', 3, 3),
( 4, CURRENT_DATE - INTERVAL '12 days', 'Passionné(e) par le développement web, ce stage est une belle occasion pour moi.', 'REFUSEE', 4, 4),
( 5, CURRENT_DATE - INTERVAL '3 days', 'Je suis curieux(se) d’en apprendre plus sur votre domaine et de participer à vos projets.', 'EN_ATTENTE', 5, 5),
( 6, CURRENT_DATE - INTERVAL '8 days', 'Votre entreprise représente une référence dans son domaine. J’aimerais beaucoup y contribuer.', 'ACCEPTEE', 1, 6),
( 7, CURRENT_DATE - INTERVAL '6 days', 'J’ai été recommandé par un de vos anciens stagiaires et je souhaite vivre cette expérience aussi.', 'EN_ATTENTE', 2, 7),
( 8, CURRENT_DATE - INTERVAL '4 days', 'Ce poste est en parfaite adéquation avec ma formation en cybersécurité.', 'REFUSEE', 3, 8),
( 9, CURRENT_DATE - INTERVAL '9 days', 'Je suis dynamique et sérieux(se), je pense pouvoir m’intégrer rapidement à vos équipes.', 'EN_ATTENTE', 4, 9),
( 10,CURRENT_DATE - INTERVAL '2 days', 'Je suis prêt(e) à m’impliquer à 100 % dans ce stage pour acquérir un maximum de compétences.', 'ACCEPTEE', 5, 10);
    
ALTER TABLE gestionstagesalternances.candidature  ALTER COLUMN id RESTART WITH 11;