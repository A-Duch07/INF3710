import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Treatment } from "../../../common/tables/treatment";
import { Animal } from "../../../common/tables/animal";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { ParsedUrlQuery } from "querystring";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= ClINIC ROUTES =======
    router.get(
      "/clinics/clinicNb",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows.map((hotel: HotelPK) => ({
              hotelnb: hotel.hotelnb,
              name: hotel.name,
            }));
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

     // ======= ANIMALS ROUTES =======
    router.get(
      "/animals/:clinicNb",
      (req: Request, res: Response, _: NextFunction) => {
        const clinicNb = req.params.clinicNb;
        this.databaseService
          .getAnimalsByClinic(clinicNb)
          .then((result: pg.QueryResult) => {
            const animals: Animal[] = result.rows.map((animal: Animal) => ({
              animalnb : animal.animalnb,
              clinicnb : animal.clinicnb,
              ownernb : animal.ownernb,
              name : animal.name,
              type : animal.type,
              species : animal.species,
              size : animal.size,
              weight : animal.weight,
              description : animal.description,
              dateofbirth : animal.dateofbirth,
              dateinscription : animal.dateinscription,
              state : animal.state,
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
            const animals: Animal[] = result.rows.map((animal: Animal) => ({
              animalnb : animal.animalnb,
              clinicnb : animal.clinicnb,
              ownernb : animal.ownernb,
              name : animal.name,
              type : animal.type,
              species : animal.species,
              size : animal.size,
              weight : animal.weight,
              description : animal.description,
              dateofbirth : animal.dateofbirth,
              dateinscription : animal.dateinscription,
              state : animal.state,
            }));
            res.json(animals);
          })
      }
    )


    router.post(
      "/animals/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const hotel: Hotel = {
          hotelnb: req.body.hotelnb,
          name: req.body.name,
          city: req.body.city,
        };

        this.databaseService
          .createHotel(hotel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.post(
      "/animals/delete/:clinicNb/:animalNb",
      (req: Request, res: Response, _: NextFunction) => {
        const clinicNb: string = req.params.clinicNb;
        const animalNb: string = req.params.animalNb;
        this.databaseService
          .deleteHotel(clinicNb, animalNb)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    router.put(
      "/animals/update",
      (req: Request, res: Response, _: NextFunction) => {
        const hotel: Hotel = {
          hotelnb: req.body.hotelnb,
          name: req.body.name ? req.body.name : "",
          city: req.body.city ? req.body.city : "",
        };

        this.databaseService
          .updateHotel(hotel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    // ======= OWNERS ROUTES =======
    router.get(
      "/owners/ownerNb/:clinicNb",
      (req: Request, res: Response, _: NextFunction) => {
        const clinicNb = req.params.clinicNb;
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows;
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    // ======= TREATMENT ROUTES =======
    router.get(
      "/owners/ownerNb/:clinicNb",
      (req: Request, res: Response, _: NextFunction) => {
        const clinicNb = req.params.clinicNb;
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows;
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    // ======= RECEIPT ROUTES =======
    router.get(
      "/owners/ownerNb/:clinicNb",
      (req: Request, res: Response, _: NextFunction) => {
        const clinicNb = req.params.clinicNb;
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows;
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
