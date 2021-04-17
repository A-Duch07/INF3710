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

    router.get(
      "/",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService.getAllFromTable('Traitement').then((item) => {
          res.json(item!.rows)
        })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    // ======= ClINIC ROUTES =======
    router.get(
      "/clinics/clinicNb",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getClinicPKs()
          .then((result: pg.QueryResult) => {
            const clinicNb: string[] = result.rows.map((row)=>{return row.noclinique});
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
          const clinicNb = req.params.clinicNb;
          this.databaseService
            .getAnimalsByClinic(clinicNb)
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
        }
      )

      router.get(
        "/animals/namesearch/:text",
        (req: Request, res: Response, _: NextFunction) => {
          const text = req.params.text;
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
        }
      )


      router.get(
        "/animals/:clinicNb/:ownerNb",
        (req: Request, res: Response, _: NextFunction) => {
          const clinicNb = req.params.clinicNb;
          const ownerNb = req.params.ownerNb;
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
        }
      )


      // router.post(
      //   "/animals/insert",
      //   (req: Request, res: Response, _: NextFunction) => {
      //     const hotel: Hotel = {
      //       hotelnb: req.body.hotelnb,
      //       name: req.body.name,
      //       city: req.body.city,
      //     };

      //     this.databaseService
      //       .insertAnimal(hotel)
      //       .then((result: pg.QueryResult) => {
      //         res.json(result.rowCount);
      //       })
      //       .catch((e: Error) => {
      //         console.error(e.stack);
      //         res.json(-1);
      //       });
      //   }
      // );


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
              const ownerNb: string[] = result.rows.map((row)=>{return row.noproprietaire});
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
