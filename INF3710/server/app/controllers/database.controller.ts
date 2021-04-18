import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

// import { Treatment } from "../../../common/tables/treatment";
import { Animal } from "../../../common/tables/animal";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
// import { ParsedUrlQuery } from "querystring";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) { }

  public get router(): Router {
    const router: Router = Router();

    // ======= ClINIC ROUTES =======
    router.get(
      "/clinics/clinicNb",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getClinicPKs()
          .then((result: pg.QueryResult) => {
            const clinicNb: string[] = result.rows.map((row: any) => row.noclinique);
            res.json(clinicNb);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    // ======= ANIMALS ROUTES =======
    router.get(
        "/animals/:clinicNb/",
        (req: Request, res: Response, _: NextFunction) => {
          const clinicNb: string = req.params.clinicNb;
          this.databaseService.getAnimalsByClinic(clinicNb)
            .then((result: pg.QueryResult) => {
              const animals: Animal[] = result.rows.map((animal: any) => ({
                animalnb : animal.noanimal,
                clinicnb : animal.noclinique,
                ownernb : animal.noproprietaire,
                name : animal.nom,
                type : animal.type,
                species : animal.espece,
                size : animal.taille,
                weight : animal.poids,
                description : animal.description,
                dateofbirth : animal.datenaissance,
                dateinscription : animal.dateinscription,
                state : animal.etat,
              }));
              res.json(animals);
            })

            .catch((e: Error) => {
              console.error(e.stack);
            });
        }
      );

    router.get(
        "/animals/namesearch/:text",
        (req: Request, res: Response, _: NextFunction) => {
          const text: string = req.params.text;
          this.databaseService
            .getAnimalsByText(text)
            .then((result: pg.QueryResult) => {
              const animals: Animal[] = result.rows.map((animal: any) => ({
                animalnb : animal.noanimal,
                clinicnb : animal.noclinique,
                ownernb : animal.noproprietaire,
                name : animal.nom,
                type : animal.type,
                species : animal.espece,
                size : animal.taille,
                weight : animal.poids,
                description : animal.description,
                dateofbirth : animal.datenaissance,
                dateinscription : animal.dateinscription,
                state : animal.etat,
              }));
              res.json(animals);
            })

            .catch((e: Error) => {
              console.error(e.stack);
            });
        }
      );

    router.get(
        "/animals/:clinicNb/:ownerNb",
        (req: Request, res: Response, _: NextFunction) => {
          const clinicNb: string = req.params.clinicNb;
          const ownerNb: string = req.params.ownerNb;
          // tslint:disable-next-line: no-floating-promises
          this.databaseService
            .getAnimalsByOwnerAndClinic(clinicNb, ownerNb)
            .then((result: pg.QueryResult) => {
              const animals: Animal[] = result.rows.map((animal: any) => ({
                animalnb : animal.noanimal,
                clinicnb : animal.noclinique,
                ownernb : animal.noproprietaire,
                name : animal.nom,
                type : animal.type,
                species : animal.espece,
                size : animal.taille,
                weight : animal.poids,
                description : animal.description,
                dateofbirth : animal.datenaissance,
                dateinscription : animal.dateinscription,
                state : animal.etat,
              }));
              res.json(animals);
            })

            .catch((e: Error) => {
              console.error(e.stack);
            });
        }
      );

    router.post(
        "/animals/insert",
        (req: Request, res: Response, _: NextFunction) => {
          const animal: Animal = {
            animalnb: req.body.animalnb,
            clinicnb: req.body.clinicnb,
            ownernb: req.body.ownernb,
            name: req.body.name,
            type: req.body.type,
            species: req.body.species,
            size: req.body.size,
            weight: req.body.weight,
            description: req.body.description,
            dateofbirth: req.body.dateofbirth,
            dateinscription: req.body.dateinscription,
            state: req.body.state,
          };

          this.databaseService
            .insertAnimal(animal)
            .then((result: pg.QueryResult) => {
              res.json(result.rowCount);
            })
            .catch((e: Error) => {
              console.error(e.stack);
              res.json(-1);
            });
        }
      );


    //   router.post(
    //     "/animals/delete/:clinicNb/:animalNb",
    //     (req: Request, res: Response, _: NextFunction) => {
    //       const clinicNb: string = req.params.clinicNb;
    //       const animalNb: string = req.params.animalNb;
    //       this.databaseService
    //         .deleteHotel(clinicNb, animalNb)
    //         .then((result: pg.QueryResult) => {
    //           res.json(result.rowCount);
    //         })
    //         .catch((e: Error) => {
    //           console.error(e.stack);
    //         });
    //     }
    //   );


    //   router.put(
    //     "/animals/update",
    //     (req: Request, res: Response, _: NextFunction) => {
    //       const hotel: Hotel = {
    //         hotelnb: req.body.hotelnb,
    //         name: req.body.name ? req.body.name : "",
    //         city: req.body.city ? req.body.city : "",
    //       };

    //       this.databaseService
    //         .updateHotel(hotel)
    //         .then((result: pg.QueryResult) => {
    //           res.json(result.rowCount);
    //         })
    //         .catch((e: Error) => {
    //           console.error(e.stack);
    //         });
    //     }
    //   );


      // ======= OWNERS ROUTES =======
    router.get(
        "/owners/ownerNb/:clinicNb",
        (req: Request, res: Response, _: NextFunction) => {
          const clinicNb = req.params.clinicNb;
          this.databaseService
            .getOwnerPKsFromClinic(clinicNb)
            .then((result: pg.QueryResult) => {
              const ownerNb: string[] = result.rows.map((row) =>row.noproprietaire);
              res.json(ownerNb);
            })

            .catch((e: Error) => {
              console.error(e.stack);
            });
        }
      );


    //   // ======= TREATMENT ROUTES =======
    //   router.get(
    //     "/owners/ownerNb/:clinicNb",
    //     (req: Request, res: Response, _: NextFunction) => {
    //       const clinicNb = req.params.clinicNb;
    //       this.databaseService
    //         .getHotelNamesByNos()
    //         .then((result: pg.QueryResult) => {
    //           const hotelsNbsNames = result.rows;
    //           res.json(hotelsNbsNames);
    //         })

    //         .catch((e: Error) => {
    //           console.error(e.stack);
    //         });
    //     }
    //   );

    //   // ======= RECEIPT ROUTES =======
    //   router.get(
    //     "/owners/ownerNb/:clinicNb",
    //     (req: Request, res: Response, _: NextFunction) => {
    //       const clinicNb = req.params.clinicNb;
    //       this.databaseService
    //         .getHotelNamesByNos()
    //         .then((result: pg.QueryResult) => {
    //           const hotelsNbsNames = result.rows;
    //           res.json(hotelsNbsNames);
    //         })

    //         .catch((e: Error) => {
    //           console.error(e.stack);
    //         });
    //     }
    //   );

    //   // ======= GENERAL ROUTES =======
    //   router.get(
    //     "/tables/:tableName",
    //     (req: Request, res: Response, next: NextFunction) => {
    //       this.databaseService
    //         .getAllFromTable(req.params.tableName)
    //         .then((result: pg.QueryResult) => {
    //           res.json(result.rows);
    //         })
    //         .catch((e: Error) => {
    //           console.error(e.stack);
    //         });
    //     }
    //   );

    return router;
  }
}
