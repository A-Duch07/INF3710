import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/animal";
import { Receipt } from "../../../common/tables/receipt";
import { Treatment } from "../../../common/tables/treatment";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public insertAnimal(animal: Animal): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/animals/insert", animal)
      .pipe(catchError(this.handleError<number>("insertAnimal")));
  }

  public updateAnimal(animal: Animal): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/animals/update", animal)
      .pipe(catchError(this.handleError<number>("updateAnimal")));
  }

  public deleteAnimal(clinicNb: string, animalNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + `/animals/delete/${clinicNb}/${animalNb}`, {})
      .pipe(catchError(this.handleError<number>("deleteAnimal")));
  }

  public getAnimalsByOwnerAndClinic(clinicNb: string, ownerNb: string): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(this.BASE_URL + `/guests/${clinicNb}/${ownerNb}`)
      .pipe(catchError(this.handleError<Animal[]>("getAnimalsByOwnerAndClinic")));
  }

  public getAnimalsByClinic(clinicNb: string): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(this.BASE_URL + `/guests/${clinicNb}`)
      .pipe(catchError(this.handleError<Animal[]>("getAnimalsByClinic")));
  }

  public getClinicPKs(): Observable<string[]> {
    return this.http
      .get<string[]>(this.BASE_URL + "/clinics/clinicNb")
      .pipe(catchError(this.handleError<string[]>("getClinicPKs")));
  }

  public getOwnerPKs(clinicNb: string): Observable<string[]> {
    return this.http
      .get<string[]>(this.BASE_URL + `/owners/ownerNb/${clinicNb}`)
      .pipe(catchError(this.handleError<string[]>("getOwners")));
  }

  public getTreatments(clinicNb: string, animalNb: string): Observable<Treatment[]> {
    return this.http
      .get<Treatment[]>(this.BASE_URL + `/treatments/${clinicNb}/${animalNb}`)
      .pipe(catchError(this.handleError<Treatment[]>("getTreatments")));
  }

  public getReceipts(clinicNb: string, animalNb: string): Observable<Receipt[]> {
    return this.http
      .get<Receipt[]>(this.BASE_URL + `/receipts/${clinicNb}/${animalNb}`)
      .pipe(catchError(this.handleError<Receipt[]>("getReceipts")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
