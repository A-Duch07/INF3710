import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";

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
      .post<number>(this.BASE_URL + "/hotels/insert", animal)
      .pipe(catchError(this.handleError<number>("insertAnimal")));
  }

  public updateAnimal(animal: Animal): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/hotels/update", animal)
      .pipe(catchError(this.handleError<number>("updateAnimal")));
  }

  public deleteAnimal(clinicNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/hotels/delete/" + clinicNb, {})
      .pipe(catchError(this.handleError<number>("deleteAnimal")));
  }

  public getClinicPKs(): Observable<string[]> {
    return this.http
      .get<string[]>(this.BASE_URL + "/hotels/hotelNb")
      .pipe(catchError(this.handleError<string[]>("getClinicPKs")));
  }

  public getOwners(clinicNb: string): Observable<string[]> {
    return this.http
      .get<string[]>(this.BASE_URL + `/rooms?hotelNb=${clinicNb}`)
      .pipe(catchError(this.handleError<string[]>("getOwners")));
  }

  public getAnimals(clinicNb: string, ownerNb: string): Observable<Animal[]> {
    return this.http
      .get<Animal[]>(this.BASE_URL + `/guests/${clinicNb}/${ownerNb}`)
      .pipe(catchError(this.handleError<Animal[]>("getAnimals")));
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
