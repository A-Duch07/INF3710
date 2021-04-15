

INSERT INTO Clinique
VALUES (
        'C01',
        '120 Rues des Pommes',
        'Montréal',
        'Québec',
        'H3Z U1L',
        45012342123,
        4503214321,
        1
    );
INSERT INTO Clinique
VALUES (
        'C02',
        '3340 Rues des Vétos',
        'Longueuil',
        'Québec',
        'T2Z P1X',
        45084953672,
        4502589457,
        2
    );
INSERT INTO Clinique
VALUES (
        'C03',
        '1000 Rues des Pizza Hawaiennes',
        'Montréal',
        'Québec',
        'H3Z U1L',
        45057895943,
        4503248293,
        3
    );

    
INSERT INTO Personnel
VALUES (
        1,
        'Sebastien',
        'Poule',
        'Montreal',
        'Quebec',
        'H2U 1P9',
        4502345234,
        '12/12/1990',
        'M',
        12934339,
        'Gestionnaire',
        45,
        'C01'
    );
INSERT INTO Personnel
VALUES (
        2,
        'Alice',
        'Jannez',
        'Montreal',
        'Quebec',
        'T2U 3T2',
        4502377234,
        '19/10/1991',
        'F',
        34523452,
        'Gestionnaire',
        55,
        'C02'
    );
INSERT INTO Personnel
VALUES (
        3,
        'Hyppolite',
        'Inarz',
        'Montreal',
        'Quebec',
        'R9A 9P9',
        4502345234,
        '12/12/1976',
        'M',
        12934329,
        'Gestionnaire',
        59,
        'C03'
    );
INSERT INTO Personnel
VALUES (
        4,
        'Kevin',
        'Inarz',
        'Montreal',
        'Quebec',
        'R9A 9P9',
        4502345234,
        '12/08/1986',
        'M',
        23152345,
        'Veterinaire',
        33,
        'C01'
    );
INSERT INTO Personnel
VALUES (
        5,
        'Isabelle',
        'Pouillard',
        'Montreal',
        'Quebec',
        'R9A 9P9',
        4502345234,
        '12/08/1986',
        'F',
        22352345,
        'Veterinaire',
        33,
        'C02'
    );
INSERT INTO Personnel
VALUES (
        6,
        'Illyan',
        'Sam-Ali',
        'Montreal',
        'Quebec',
        'R9A 9P9',
        4502345234,
        '12/08/1986',
        'M',
        21312345,
        'Veterinaire',
        33,
        'C03'
    );

    
INSERT INTO TP3.ProprietaireAnimal
VALUES (
        11,
        'C01',
        'Jerome',
        'Seb',
        'Montreal',
        'Quebec',
        'H2U 1P9',
        4502345234
    );
INSERT INTO TP3.ProprietaireAnimal
VALUES (
        33,
        'C03',
        'Jerome',
        'Seb',
        'Montreal',
        'Quebec',
        'H2U 1P9',
        4502345234
    );
INSERT INTO TP3.ProprietaireAnimal
VALUES (
        28,
        'C02',
        'Jerome',
        'Seb',
        'Montreal',
        'Quebec',
        'H2U 1P9',
        4502345234
    );
INSERT INTO TP3.ProprietaireAnimal
VALUES (
        12,
        'C02',
        'Alicia',
        'Sorbina',
        'Montreal',
        'Quebec',
        'H2U 1P9',
        4501112222
    );

    INSERT INTO TP3.Animal
VALUES (
        1,
        'C01',
        'Felix',
        'Chat',
        'Persan',
        '25',
        '4,2',
        'Fourrure grise',
        '11/11/2012',
        'Vivant',
        11
    );
INSERT INTO TP3.Animal
VALUES (
        7,
        'C03',
        'Felix',
        'Chat',
        'Persan',
        '25',
        '4,2',
        'Fourrure grise',
        '11/11/2012',
        'Vivant',
        33
    );
INSERT INTO TP3.Animal
VALUES (
        1,
        'C02',
        'Arroba',
        'Chien',
        'Labrador',
        '54',
        '30',
        NULL,
        '06/02/2014',
        'Vivant',
        28
    );
INSERT INTO TP3.Animal
VALUES (
        2,
        'C03',
        'Doba',
        'Chien',
        'Labrador',
        '44',
        '32',
        NULL,
        '06/02/2015',
        'Vivant',
        33
    );

    
INSERT INTO TP3.Examen
VALUES (
        1,
        '20/04/2021',
        '12:34',
        'Analyse complète',
        1,
        1,
        'C01'
    );
INSERT INTO TP3.Examen
VALUES (
        2,
        '20/03/2021',
        '14:44',
        'Analyse complète',
        3,
        2,
        'C03'
    );
CREATE TABLE TP3.Traitement (
    NoTraitement VARCHAR,
    Description TEXT,
    Cout FLOAT,
    PRIMARY KEY (NoTraitement)
);
INSERT INTO TP3.Traitement
VALUES (
        'T110',
        'Traitement à la Pénicilline',
        50.00
    );
INSERT INTO TP3.Traitement
VALUES (
        'T112',
        'Vaccination contre la grippe',
        70.00
    );
INSERT INTO TP3.Traitement
VALUES ('E001', 'Examen', 50.00);
CREATE TABLE TP3.Facture (
    NoFacture INT,
    Date DATE,
    TotalPaye INT,
    Paye VARCHAR,
    NoProprietaire INT,
    NoVeterinaire INT,
    NoClinique VARCHAR,
    PRIMARY KEY (NoFacture),
    FOREIGN KEY (NoClinique, NoProprietaire) REFERENCES ProprietaireAnimal(NoClinique, NoProprietaire),
    FOREIGN KEY (NoVeterinaire) REFERENCES Personnel(NID)
);

INSERT INTO TP3.PlanDeTraitement
VALUES (
        1,
        1,
        'E001',
        NULL,
        2,
        NULL,
        NULL
    );
INSERT INTO TP3.PlanDeTraitement
VALUES (
        2,
        1,
        'T110',
        NULL,
        1,
        '20/04/2020',
        '20/04/2021'
    );