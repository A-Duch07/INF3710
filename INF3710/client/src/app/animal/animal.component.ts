import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"],
})
export class AnimalComponent implements OnInit {
  public clinicPKs: string[] = [];
  public ownerNBs: string[] = [];
  public animals: Animal[] = [
    {
      animalnb : "1",
      clinicnb : "2",
      ownernb : "3",
      name : "rex",
      type : "chien",
      species : "berger allemand",
      size : "160 cm",
      weight : "180 lbs",
      description : "description",
      dateofbirth : "7 aout",
      dateinscription : "8 aout",
      state : "mort",
    }
  ];

  public duplicateError: boolean = false;
  public invalidClinicPK: boolean = false;

  public selectedClinic: string = "-1";

  public selectedOwner: string = "-1";

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.communicationService.getClinicPKs().subscribe((clinicPKs: string[]) => {
      this.clinicPKs = clinicPKs;
      this.selectedClinic = this.clinicPKs[0];
      this.getOwners();
    });
  }

  public updateSelectedClinic(clinicID: any): void {
    this.selectedClinic = this.clinicPKs[clinicID];
    this.getOwners();
    this.refresh();
  }

  public updateSelectedOwner(ownerID: any): void {
    this.selectedOwner = this.ownerNBs[ownerID];
    this.refresh();
  }

  public getOwners(): void {
    this.communicationService
      .getOwners(this.selectedClinic)
      .subscribe((ownerNBs: string[]) => {
        this.ownerNBs = ownerNBs;
        this.selectedOwner = this.ownerNBs[0];
      });
  }

  private refresh(): void {
    this.getAnimals();
  }

  public getAnimals(): void {
    this.communicationService
      .getAnimals(this.selectedClinic, this.selectedOwner)
      .subscribe((animals: Animal[]) => {
        this.animals = animals;
      });
  }

  public updateRoom(i: number) {
    // this.communicationService
    //   .updateRoom(this.rooms[i])
    //   .subscribe((res: any) => {
    //     this.refresh();
    //   });
  }

  public changeRoomType(event: any, i: number) {
    // const editField = event.target.textContent;
    // this.rooms[i].type = editField;
  }

  public changeRoomPrice(event: any, i: number) {
    // const editField = event.target.textContent;
    // this.rooms[i].price = editField;
  }

  public deleteRoom(hotelNb: string, roomNb: string) {
    // this.communicationService
    //   .deleteRoom(hotelNb, roomNb)
    //   .subscribe((res: any) => {
    //     this.refresh();
    //   });
  }

  public insertRoom(): void {
    // const room: Room = {
    //   hotelnb: this.selectedHotel,
    //   roomnb: this.newRoomNb.nativeElement.innerText,
    //   type: this.newRoomType.nativeElement.innerText,
    //   price: this.newRoomPrice.nativeElement.innerText,
    // };

    // this.communicationService.insertRoom(room).subscribe((res: number) => {
    //   this.refresh();
    // });
  }
}
