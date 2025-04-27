-- Table utilisateur : Étudiant
INSERT INTO gestionstagesalternances.utilisateur (id, email, password, role) VALUES
( 1, 'alice.dupont@mail.com', 'azerty1', 'ETUDIANT'),
( 2, 'mohamed.traore@mail.com', 'azerty2', 'ETUDIANT'),
( 3, 'julie.martin@mail.com', 'azerty3', 'ETUDIANT'),
( 4, 'tariq.elamrani@mail.com', 'azerty4', 'ETUDIANT'),
( 5, 'fatou.ndiaye@mail.com', 'azerty5', 'ETUDIANT');

-- Table utilisateur : Entreprise
INSERT INTO gestionstagesalternances.utilisateur (id, email, password, role) VALUES
( 6, 'contact@capgemini.com', 'mdp6', 'ENTREPRISE'),
( 7, 'contact@sncf.fr', 'mdp7', 'ENTREPRISE'),
( 8, 'contact@edf.fr', 'mdp8', 'ENTREPRISE'),
( 9, 'contact@axa.com', 'mdp9', 'ENTREPRISE'),
( 10, 'contact@airbus.com', 'mdp10', 'ENTREPRISE');

-- Table utilisateur : Admin
INSERT INTO gestionstagesalternances.utilisateur (id, email, password, role) VALUES
( 11, 'claire.bernard@admin.com', 'admin11', 'ADMIN'),
( 12, 'jean.muller@admin.com', 'admin12', 'ADMIN'),
( 13, 'karim.boutaib@admin.com', 'admin13', 'ADMIN'),
( 14, 'nina.gomis@admin.com', 'admin14', 'ADMIN'),
( 15, 'thomas.leclerc@admin.com', 'admin15', 'ADMIN');

ALTER TABLE gestionstagesalternances.utilisateur  ALTER COLUMN id RESTART WITH 16;

-- Table admin
INSERT INTO gestionstagesalternances.admin (id, prenom, nom, telephone, adresse, user_id) VALUES
( 1, 'Claire', 'Bernard', '0611111111', '12 Rue de la République, 75001 Paris', 11),
( 2, 'Jean', 'Muller', '0612121212', '18 Avenue des Champs-Élysées, 75008 Paris', 12),
( 3, 'Karim', 'Boutaïb', '0613131313', '7 Boulevard Haussmann, 75009 Paris', 13),
( 4, 'Nina', 'Gomis', '0614141414', '3 Rue Sainte-Catherine, 69002 Lyon', 14),
( 5, 'Thomas', 'Leclerc', '0615151515', '21 Rue Nationale, 59800 Lille', 15);

ALTER TABLE gestionstagesalternances.admin  ALTER COLUMN id RESTART WITH 6;

-- Table entreprise
INSERT INTO gestionstagesalternances.entreprise ( id, nom, telephone, adresse, site_web, secteur_activite, user_id) VALUES
( 1, 'Capgemini', '0101010101', '147 Rue de Ternes, 75017 Paris', 'https://www.capgemini.com', 'Informatique', 6),
( 2, 'SNCF', '0102020202', '2 Place aux Étoiles, 93200 Saint-Denis', 'https://www.sncf.com', 'Transport', 7),
( 3, 'EDF', '0103030303', '22-30 Avenue de Wagram, 75008 Paris', 'https://www.edf.fr', 'Énergie', 8),
( 4, 'AXA', '0104040404', '25 Avenue Matignon, 75008 Paris (La Défense)', 'https://www.axa.fr', 'Assurance', 9),
( 5, 'Airbus', '0105050505', '1 Rond-Point Maurice Bellonte, 31700 Blagnac (Toulouse)', 'https://www.airbus.com', 'Aéronautique', 10);
       
ALTER TABLE gestionstagesalternances.entreprise  ALTER COLUMN id RESTART WITH 6;
       
-- Table etudiant
INSERT INTO gestionstagesalternances.etudiant (id, prenom, nom, telephone, adresse, niveau_etude, specialite, cv, user_id) VALUES
( 1, 'Alice', 'Dupont', '0601010101', '45 Rue Victor Hugo, 34000 Montpellier', 'Licence 3', 'Développement Web', 'alice_cv.pdf', 1),
( 2, 'Mohamed', 'Traoré', '0602020202', '10 Avenue du Général Leclerc, 37000 Tours', 'Master 1', 'Cybersécurité', 'mohamed_traore_cv.pdf', 2),
( 3, 'Julie', 'Martin', '0603030303', '8 Rue de la Liberté, 21000 Dijon', 'Licence 2', 'IA & Data Science', 'julie_martin_cv.pdf', 3),
( 4, 'Tariq', 'El Amrani', '0604040404', '15 Rue des Rosiers, 75004 Paris', 'Master 2', 'DevOps et Cloud', 'tariq_elamrani_cv.pdf', 4),
( 5, 'Fatou', 'Ndiaye', '0605050505', '20 Avenue Jean Jaurès, 69007 Lyon', 'BUT 2', 'Systèmes embarqués', 'fatou_ndiaye_cv.pdf', 5);

ALTER TABLE gestionstagesalternances.etudiant  ALTER COLUMN id RESTART WITH 6;

-- Table stage/alternance
INSERT INTO gestionstagesalternances.stage ( id, titre, description, lieu, duree, entreprise_id, etudiant_id, type) VALUES
( 1, 'Développeur Full Stack Junior', 'Participation au développement d’une application web (front-end et back-end) pour une startup innovante.', 'Paris', '6 mois', 1, NULL, 'STAGE'),
( 2, 'Data Analyst Junior', 'Analyse de données clients et reporting au sein d’un service marketing. Utilisation de SQL et Python.', 'Lyon', '3 mois', 2, NULL, 'STAGE'),
( 3, 'Consultant Cybersécurité Alternant', 'Réalisation d’audits de sécurité et mise en œuvre de solutions de protection des SI.', 'Marseille', '24 mois', 3, NULL, 'ALTERNANCE'),
( 4, 'Ingénieur DevOps Alternant', 'Mise en place de pipelines CI/CD avec GitLab, gestion de conteneurs Docker et Kubernetes.', 'Toulouse', '12 mois', 4, NULL, 'ALTERNANCE'),
( 5, 'Assistant Chef de Projet IT', 'Suivi de projets digitaux, participation aux réunions clients, rédaction de compte-rendus.', 'Nantes', '4 mois', 5, NULL, 'STAGE'),
( 6, 'Développeur Mobile (Flutter)', 'Conception et développement d’une application mobile multiplateforme avec Flutter et Dart.', 'Paris', '5 mois', 1, NULL, 'STAGE'),
( 7, 'Alternance Analyste SI', 'Participation à la gestion du système d’information de l’entreprise. Support utilisateurs et documentation technique.', 'Lille', '18 mois', 2, NULL, 'ALTERNANCE'),
( 8, 'UI/UX Designer Junior', 'Réalisation de maquettes et prototypes pour des interfaces utilisateur web et mobile.', 'Rennes', '3 mois', 3, NULL, 'STAGE'),
( 9, 'Alternance Développeur Java Spring Boot', 'Développement de services REST avec Spring Boot dans un environnement agile (Scrum).', 'Grenoble', '24 mois', 4, NULL, 'ALTERNANCE'),
( 10,'Ingénieur Cloud DevOps (Stage)', 'Mise en place d’infrastructures cloud AWS (Terraform, EC2, S3, etc.) et automatisation.', 'Strasbourg', '6 mois', 5, NULL, 'STAGE');
   
ALTER TABLE gestionstagesalternances.stage  ALTER COLUMN id RESTART WITH 11;

-- Table candidature   
INSERT INTO gestionstagesalternances.candidature ( id, date_candidature, date_disponibilite, message, statut, etudiant_id, stage_id) VALUES
( 1, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '10 days' + INTERVAL '2 months', 'Je suis très motivé(e) par ce stage, il correspond parfaitement à mon projet professionnel.', 'EN_ATTENTE', 1, 1),
( 2, CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '7 days' + INTERVAL '3 months', 'J’aimerais beaucoup rejoindre votre entreprise pour développer mes compétences en IA.', 'EN_ATTENTE', 2, 2),
( 3, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '5 days' + INTERVAL '2 months', 'Je vous remercie pour cette opportunité, je suis disponible immédiatement.', 'ACCEPTEE', 3, 3),
( 4, CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE + INTERVAL '12 days' + INTERVAL '3 months', 'Passionné(e) par le développement web, ce stage est une belle occasion pour moi.', 'REFUSEE', 4, 4),
( 5, CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE + INTERVAL '3 days' + INTERVAL '2 months', 'Je suis curieux(se) d’en apprendre plus sur votre domaine et de participer à vos projets.', 'EN_ATTENTE', 5, 5),
( 6, CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE + INTERVAL '8 days' + INTERVAL '3 months', 'Votre entreprise représente une référence dans son domaine. J’aimerais beaucoup y contribuer.', 'ACCEPTEE', 1, 6),
( 7, CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE + INTERVAL '6 days' + INTERVAL '2 months', 'J’ai été recommandé par un de vos anciens stagiaires et je souhaite vivre cette expérience aussi.', 'EN_ATTENTE', 2, 7),
( 8, CURRENT_DATE - INTERVAL '4 days', CURRENT_DATE + INTERVAL '4 days' + INTERVAL '3 months', 'Ce poste est en parfaite adéquation avec ma formation en cybersécurité.', 'REFUSEE', 3, 8),
( 9, CURRENT_DATE - INTERVAL '9 days', CURRENT_DATE + INTERVAL '9 days' + INTERVAL '2 months', 'Je suis dynamique et sérieux(se), je pense pouvoir m’intégrer rapidement à vos équipes.', 'EN_ATTENTE', 4, 9),
( 10,CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE + INTERVAL '2 days' + INTERVAL '3 months', 'Je suis prêt(e) à m’impliquer à 100 % dans ce stage pour acquérir un maximum de compétences.', 'ACCEPTEE', 5, 10);
    
ALTER TABLE gestionstagesalternances.candidature  ALTER COLUMN id RESTART WITH 11;