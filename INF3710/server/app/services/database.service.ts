import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Animal } from "../../../common/tables/animal";

@injectable()
export class DatabaseService {
  
  public connectionConfig: pg.ConnectionConfig = {
    connectionString: 'postgresql://postgres:changeme@127.0.0.1:5432/TP3',
    keepAlive: true,
    statement_timeout: 1000,
  };

  public pool: pg.Pool;

  public constructor () {
    this.pool = new pg.Pool(this.connectionConfig);
  }

  // ======= DEBUG =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query(`SELECT * FROM TP3.${tableName};`);
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async getAnimalsByClinic(clinicNb: string):Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query(`SELECT * FROM TP3.Animal WHERE NoClinique='${clinicNb}';`);
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async getAnimalsByOwnerAndClinic(clinicNb: string, ownerNb: string):Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query(`SELECT * FROM TP3.Animal WHERE NoClinique='${clinicNb}' AND NoProprietaire=${ownerNb};`);
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async getAnimalsByText(text: string):Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query(`SELECT * FROM TP3.Animal WHERE Nom LIKE '%${text}%'`);
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async getClinicPKs():Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query('SELECT NoClinique FROM TP3.Clinique;');
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }
  public async getOwnerPKsFromClinic( clinicID:string):Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query(`SELECT NoProprietaire FROM TP3.ProprietaireAnimal WHERE NoClinique='${clinicID}';`);
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async getTreatmentByAnimal(clinicNb: string, animalNb: string):Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const query = `SELECT NoTraitement, DescriptionTraitement, Cout FROM TP3.PlanDeTraitement NATURAL JOIN TP3.Traitement NATURAL JOIN TP3.Examen NATURAL JOIN TP3.Animal WHERE Animal.noanimal=${animalNb} AND Animal.noclinique='${clinicNb}';`
      const res: any = client.query(query);
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async getExamPKs():Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query('SELECT NoExamen FROM TP3.Examen;');
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async getReceipts():Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const res: any = client.query('SELECT * FROM TP3.Facture;');
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async generateReceipt(noExam:string):Promise<pg.QueryResult|undefined> {
    try {
      const client: pg.PoolClient = await this.pool.connect();
      const query = `
      INSERT INTO TP3.Facture(Date,TotalPaye,Paye,NoProprietaire,NoVeterinaire,NoClinique) VALUES
        (NOW(),
        (SELECT SUM(cout) FROM TP3.PlanDeTraitement NATURAL JOIN TP3.Traitement NATURAL JOIN TP3.Examen WHERE NoExamen=${noExam}),
        NULL,
        (SELECT NoProprietaire FROM TP3.Animal WHERE Animal.noanimal=(SELECT NoAnimal FROM TP3.Examen WHERE NoExamen=${noExam}) AND NoClinique = (SELECT NoClinique FROM TP3.Examen WHERE NoExamen=${noExam})) ,
        (SELECT NID FROM TP3.Examen WHERE NoExamen=${noExam}),
        (SELECT NoClinique FROM TP3.Examen WHERE NoExamen=${noExam})
      );
      `
      const res: any = client.query(query);
      client.release();
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
  }

  public async insertAnimal(animal: Animal): Promise<pg.QueryResult> {
    const client: pg.PoolClient = await this.pool.connect();

    if (!animal.animalnb || !animal.clinicnb || !animal.ownernb ) {
      throw new Error("Invalid insert animal values");
    }

    const values: string[] = [
      animal.animalnb,
      animal.clinicnb,
      animal.name,
      animal.type,
      animal.species,
      animal.size,
      animal.weight,
      animal.description,
      animal.dateofbirth,
      animal.dateinscription,
      animal.state,
      animal.ownernb,
    ];
    const queryText: string = `INSERT INTO TP3.Animal VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

    const res: any = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async deleteAnimal(clinicNb: string, animalNb: string): Promise<pg.QueryResult|undefined> {
    try {
      if (clinicNb.length === 0 || animalNb.length === 0) throw new Error("Invalid animal delete query");
      const client = await this.pool.connect();
  
      const query = `DELETE FROM TP3.Animal WHERE NoClinique = '${clinicNb}' AND NoAnimal = '${animalNb}';`;
      const res = await client.query(query);
      console.log(res);
      client.release()
      return res;
    } catch(e) {
      console.error(e);
    }
    return undefined;
    
  }

  public async updateAnimal(animal: Animal): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues = [];
  
    if (animal.name.length > 0) toUpdateValues.push(`nom = '${animal.name}'`);
    if (animal.type.length > 0) toUpdateValues.push(`type = '${animal.type}'`);
    if (animal.species.length > 0) toUpdateValues.push(`espece = '${animal.species}'`);
    if (animal.size.length > 0) toUpdateValues.push(`taille = ${animal.size}`);
    if (animal.weight.length > 0) toUpdateValues.push(`poids = ${animal.weight}`);
    if (animal.description.length > 0) toUpdateValues.push(`descriptionanimal = '${animal.description}'`);
    if (animal.dateofbirth.length > 0) toUpdateValues.push(`datenaissance = '${animal.dateofbirth}'`);
    if (animal.dateinscription.length > 0) toUpdateValues.push(`dateinscription = '${animal.dateinscription}'`);
    if (animal.state.length > 0) toUpdateValues.push(`etat = '${animal.state}'`);
    
    if (!animal.animalnb || !animal.clinicnb || !animal.ownernb || toUpdateValues.length === 0) {
      throw new Error("Invalid animal update query");
    }
     
    const query = `UPDATE TP3.Animal SET ${toUpdateValues.join(", ")} WHERE NoClinique = '${animal.clinicnb}' AND NoAnimal = '${animal.animalnb}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  // // ======= HOTEL =======
  // public async createHotel(hotel: Hotel): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   if (!hotel.hotelnb || !hotel.name || !hotel.city)
  //     throw new Error("Invalid create hotel values");

  //   const values: string[] = [hotel.hotelnb, hotel.name, hotel.city];
  //   const queryText: string = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;

  //   const res = await client.query(queryText, values);
  //   client.release()
  //   return res;
  // }


  // // get hotels that correspond to certain caracteristics
  // public async filterHotels(hotelNb: string, hotelName: string, city: string): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   const searchTerms: string[] = [];
  //   if (hotelNb.length > 0) searchTerms.push(`hotelNb = '${hotelNb}'`);
  //   if (hotelName.length > 0) searchTerms.push(`name = '${hotelName}'`);
  //   if (city.length > 0) searchTerms.push(`city = '${city}'`);

  //   let queryText = "SELECT * FROM HOTELDB.Hotel";
  //   if (searchTerms.length > 0) queryText += " WHERE " + searchTerms.join(" AND ");
  //   queryText += ";";

  //   const res = await client.query(queryText);
  //   client.release()
  //   return res;
  // }


  // // get the hotel names and numbers so so that the user can only select an existing hotel
  // public async getHotelNamesByNos(): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();
  //   const res = await client.query("SELECT hotelNb, name FROM HOTELDB.Hotel;");
  //   client.release()
  //   return res;
  // }


  // modify name or city of a hotel
  


  // public async deleteHotel(clinicNb: string, animalNb: string): Promise<void>/*Promise<pg.QueryResult>*/ {
  //   // TO-DO
    
  // public async filterRooms(
  //   hotelNb: string,
  //   roomNb: string = "",
  //   roomType: string = "",
  //   price: number = -1
  //   ): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   if (!hotelNb || hotelNb.length === 0) throw new Error("Invalid filterRooms request");
    
  //   let searchTerms = [];
  //   searchTerms.push(`hotelNb = '${hotelNb}'`);

  //   if (roomNb.length > 0) searchTerms.push(`hotelNb = '${hotelNb}'`);
  //   if (roomType.length > 0) searchTerms.push(`type = '${roomType}'`);
  //   if (price >= 0) searchTerms.push(`price = ${price}`);

  //   let queryText = `SELECT * FROM HOTELDB.Room WHERE ${searchTerms.join(" AND ")};`;
  //   const res = await client.query(queryText);
  //   client.release()
  //   return res;
  // }


  // public async updateRoom(room: Room): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   let toUpdateValues = [];
  //   if (room.price >= 0) toUpdateValues.push(`price = ${room.price}`);
  //   if (room.type.length > 0)
  //     toUpdateValues.push(`type = '${room.type}'`);

  //   if (!room.hotelnb ||
  //     room.hotelnb.length === 0 ||
  //     !room.roomnb ||
  //     room.roomnb.length === 0 ||
  //     toUpdateValues.length === 0
  //   ) throw new Error("Invalid room update query");

  //   const query = `UPDATE HOTELDB.Room SET ${toUpdateValues.join(
  //   ", "
  //   )} WHERE hotelNb = '${room.hotelnb}' AND roomNb = '${room.roomnb}';`;
  //   const res = await client.query(query);
  //   client.release()
  //   return res;
  // }


 


  // // ======= GUEST =======
  // public async createGuest(guest: Guest): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();
  //   if (
  //     !guest.guestnb ||
  //     !guest.nas ||
  //     !guest.name ||
  //     !guest.gender ||
  //     !guest.city
  //   ) throw new Error("Invalid create room values");

  //   if (!(guest.gender in Gender)) throw new Error("Unknown guest gender passed");

  //   const values: string[] = [
  //     guest.guestnb,
  //     guest.nas,
  //     guest.name,
  //     guest.gender,
  //     guest.city,
  //   ];
  //   const queryText: string = `INSERT INTO HOTELDB.Guest VALUES($1, $2, $3, $4, $5);`;
  //   const res = await client.query(queryText, values);
  //   client.release()
  //   return res;
  // }


  // public async getGuests(hotelNb: string, roomNb: string): Promise<pg.QueryResult> {
  //   if (!hotelNb || hotelNb.length === 0) throw new Error("Invalid guest hotel no");
    
  //   const client = await this.pool.connect();
  //   const queryExtension = roomNb ? ` AND b.roomNb = '${roomNb}'` : "";
  //   const query: string = `SELECT * FROM HOTELDB.Guest g JOIN HOTELDB.Booking b ON b.guestNb = g.guestNb WHERE b.hotelNb = '${hotelNb}'${queryExtension};`;

  //   const res = await client.query(query);
  //   client.release()
  //   return res;
  // }

  // // ======= BOOKING =======
  // public async createBooking(
  //   hotelNb: string,
  //   guestNo: string,
  //   dateFrom: Date,
  //   dateTo: Date,
  //   roomNb: string
  // ): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();
  //   const values: string[] = [
  //     hotelNb,
  //     guestNo,
  //     dateFrom.toString(),
  //     dateTo.toString(),
  //     roomNb,
  //   ];
  //   const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

  //   const res = await client.query(queryText, values);
  //   client.release()
  //   return res;
  // }
}
