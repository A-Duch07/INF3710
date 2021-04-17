import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Animal } from "../../../../common/tables/animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"],
})
export class AnimalComponent implements OnInit {
  public clinicPKs: string[] = [];
  public ownerNBs: string[] = [];
  public animals: Animal[] = [];

  @ViewChild("newAnimalName") public newAnimalName: ElementRef;
  @ViewChild("newAnimalType") public newAnimalType: ElementRef;
  @ViewChild("newAnimalSpecies") public newAnimalSpecies: ElementRef;
  @ViewChild("newAnimalHeight") public newAnimalSize: ElementRef;
  @ViewChild("newAnimalWeight") public newAnimalWeight: ElementRef;
  @ViewChild("newAnimalDescription") public newAnimalDescription: ElementRef;
  @ViewChild("newAnimalDateOfBirth") public newAnimalDateOfBirth: ElementRef;
  @ViewChild("newAnimalDateInscription") public newAnimalDateInscription: ElementRef;
  @ViewChild("newAnimalState") public newAnimalState: ElementRef;

  public selectedClinic: string = "-1";
  public selectedOwner: string = "-1";

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.communicationService.getClinicPKs().subscribe((clinicPKs: string[]) => {
      this.clinicPKs = clinicPKs;
      this.selectedClinic = this.clinicPKs[0];
      this.getOwnerPKs();
    });
  }

  public updateSelectedClinic(clinicID: any): void {
    this.selectedClinic = this.clinicPKs[clinicID];
    this.getOwnerPKs(); 
  }

  public updateSelectedOwner(ownerID: any): void {
    this.selectedOwner = this.ownerNBs[ownerID];
    this.refresh();
  }

  public getOwnerPKs(): void {
    this.communicationService
      .getOwnerPKs(this.selectedClinic)
      .subscribe((ownerNBs: string[]) => {
        this.ownerNBs = ownerNBs;
        this.selectedOwner = this.ownerNBs[0];
        this.refresh();
      });
  }

  private refresh(): void {
    this.getAnimals();
    this.newAnimalName.nativeElement.innerText = "";
    this.newAnimalType.nativeElement.innerText = "";
    this.newAnimalSpecies.nativeElement.innerText = "";
    this.newAnimalHeight.nativeElement.innerText = "";
    this.newAnimalWeight.nativeElement.innerText = "";
    this.newAnimalDescription.nativeElement.innerText = "";
    this.newAnimalDateOfBirth.nativeElement.innerText = "";
    this.newAnimalDateInscription.nativeElement.innerText = "";
    this.newAnimalState.nativeElement.innerText = "";
  }

  public getAnimals(): void {
    this.communicationService
      .getAnimalsByOwnerAndClinic(this.selectedClinic, this.selectedOwner)
      .subscribe((animals: Animal[]) => {
        this.animals = animals;
      });
  }

  updateTextboxSearch(event:string):void {
    this.communicationService
      .getAnimalsByName(event)
      .subscribe((animals: Animal[]) => {
        this.animals = animals;
      });
  }

  public updateAnimal(i: number): void {
    // this.communicationService
    //   .updateRoom(this.rooms[i])
    //   .subscribe((res: any) => {
    //     this.refresh();
    //   });
  }

  public changeAnimalName(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].name = editField;
  }

  public changeAnimalType(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].type = editField;
  }

  public changeAnimalSpecies(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].species = editField;
  }

  public changeAnimalSize(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].size = editField;
  }

  public changeAnimalWeight(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].weight = editField;
  }

  public changeAnimalDescription(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].description = editField;
  }

  public changeAnimalDateOfBirth(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].dateofbirth = editField;
  }

  public changeAnimalDateInscription(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].dateinscription = editField;
  }

  public changeAnimalState(event: any, i: number): void {
    const editField: any = event.target.textContent;
    this.animals[i].state = editField;
  }

  public deleteAnimal(hotelNb: string, roomNb: string): void {
    // this.communicationService
    //   .deleteRoom(hotelNb, roomNb)
    //   .subscribe((res: any) => {
    //     this.refresh();
    //   });
  }

  public insertAnimal(): void {
    // const room: Room = {
    //   hotelnb: this.selectedHotel,
    //   roomnb: this.newRoomNb.nativeElement.innerText,
    //   type: this.newRoomType.nativeElement.innerText,
    //   price: this.newRoomPrice.nativeElement.innerText,
    // };
   
    const animal: Animal = {
      animalnb: "test",
      clinicnb: this.selectedClinic,
      ownernb: this.selectedOwner,
      name: this.newAnimalName.nativeElement.innerText,
      type: this.newAnimalType.nativeElement.innerText,
      species: this.newAnimalSpecies.nativeElement.innerText,
      size: this.newAnimalS.nativeElement.innerText,
      weight: this.newAnimalWeight.nativeElement.innerText,
      description: this.newAnimalDescription.nativeElement.innerText,
      dateofbirth: this.newAnimalDateOfBirth.nativeElement.innerText,
      dateinscription: this.newAnimalDateInscription.nativeElement.innerText,
      state: this.newAnimalState.nativeElement.innerText,
    }

    // this.communicationService.insertRoom(room).subscribe((res: number) => {
    //   this.refresh();
    // });
  }
}
