ROLLBACK;
BEGIN;
SET search_path = TP3;
DROP SCHEMA IF EXISTS TP3 CASCADE;
CREATE SCHEMA TP3;
SET datestyle TO European;

CREATE TABLE TP3.Clinique (
    NoClinique VARCHAR NOT NULL,
    AdrRue VARCHAR NOT NULL,
    AdrVille VARCHAR NOT NULL,
    AdrProvince VARCHAR NOT NULL,
    AdrCodePostal VARCHAR NOT NULL,
    NumTel BIGINT NOT NULL,
    NumFax BIGINT NOT NULL,
    NoGestionnaire BIGINT NOT NULL,
    PRIMARY KEY (NoClinique)
);
CREATE DOMAIN TP3.sexType AS CHAR CHECK (VALUE IN ('M', 'F'));
CREATE TABLE TP3.Personnel(
    NID INT NOT NULL,
    Nom VARCHAR NOT NULL,
    Prenom VARCHAR NOT NULL,
    AdrVille VARCHAR NOT NULL,
    AdrProvince VARCHAR NOT NULL,
    AdrCodePostal VARCHAR NOT NULL,
    NumTel VARCHAR NOT NULL,
    DateNaissance DATE NOT NULL,
    Sexe sexType DEFAULT 'M' NOT NULL,
    NAS VARCHAR UNIQUE NOT NULL,
    Fonction VARCHAR NOT NULL,
    Salaire VARCHAR NOT NULL,
    NoClinique VARCHAR NOT NULL,
    PRIMARY KEY (NID)
);
ALTER TABLE TP3.Clinique
ADD CONSTRAINT table1_fk FOREIGN KEY (NoGestionnaire) REFERENCES Personnel(NID);
ALTER TABLE TP3.Personnel
ADD CONSTRAINT table2_fk FOREIGN KEY (NoClinique) REFERENCES Clinique(NoClinique);
SET CONSTRAINTS ALL DEFERRED;
CREATE TABLE TP3.ProprietaireAnimal (
    NoProprietaire INT NOT NULL,
    NoClinique VARCHAR NOT NULL,
    Nom VARCHAR NOT NULL,
    Prénom VARCHAR NOT NULL,
    AdrVille VARCHAR NOT NULL,
    AdrProvince VARCHAR NOT NULL,
    AdrCodePostal VARCHAR NOT NULL,
    NumTel BIGINT NOT NULL,
    UNIQUE (NoProprietaire, NoClinique),
    FOREIGN KEY (NoClinique) REFERENCES Clinique(NoClinique),
    PRIMARY KEY (NoProprietaire, NoClinique)
);
CREATE TABLE TP3.Animal (
    NoAnimal INT,
    NoClinique VARCHAR,
    Nom VARCHAR,
    Type VARCHAR,
    Espece VARCHAR,
    Taille VARCHAR,
    Poids VARCHAR,
    Description VARCHAR,
    DateNaissance VARCHAR,
    Etat VARCHAR,
    NoProprietaire INT,
    FOREIGN KEY (NoClinique) REFERENCES Clinique(NoClinique),
    FOREIGN KEY (NoProprietaire, NoClinique) REFERENCES ProprietaireAnimal(NoProprietaire, NoClinique),
    UNIQUE (NoAnimal, NoClinique),
    PRIMARY KEY (NoAnimal, NoClinique)
);
-- TODO poids, taille en nombre plutot que char

CREATE TABLE TP3.Examen (
    NoExamen INT,
    Date DATE,
    Heure TIME,
    Description TEXT,
    NID INT,
    NoAnimal INT,
    NoClinique VARCHAR,
    PRIMARY KEY (NoExamen),
    FOREIGN KEY (NID) REFERENCES Personnel(NID),
    FOREIGN KEY (NoAnimal, NoClinique) REFERENCES Animal(NoAnimal, NoClinique)
);
CREATE TABLE TP3.PlanDeTraitement(
    NoPlanTraitement INT,
    NoExamen INT,
    NoTraitement VARCHAR,
    NoFacture INT,
    QuantitéTraitement INT,
    DateDebut DATE,
    DateFin DATE,
    PRIMARY KEY (NoPlanTraitement),
    FOREIGN KEY (NoExamen) REFERENCES Examen(NoExamen),
    FOREIGN KEY (NoTraitement) REFERENCES Traitement(NoTraitement),
    FOREIGN KEY (NoFacture) REFERENCES Facture(NoFacture)
);
