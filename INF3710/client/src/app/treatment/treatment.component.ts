import { Component, ElementRef, ViewChild } from "@angular/core";
// import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.css"],
})

export class TreatmentComponent {
  public hotelPKs: string[] = [];
  public rooms: string[] = [];
  public duplicateError: boolean = false;
  public invalidHotelPK: boolean = false;
  public selectedHotel: string = "-1";

  @ViewChild("newRoomNb") public newRoomNb: ElementRef;
  @ViewChild("newRoomType") public newRoomType: ElementRef;
  @ViewChild("newRoomPrice") public newRoomPrice: ElementRef;

  public constructor(/*private communicationService: CommunicationService*/) {}

  // public ngOnInit(): void {
  //   this.communicationService.getClinicPKs().subscribe((clinicPKs: string[]) => {
  //     this.hotelPKs = clinicPKs;
  //     this.selectedHotel = this.hotelPKs[0];
  //     this.getRooms();
  //   });
  // }

  // public updateSelectedHotel(hotelID: any) {
  //   this.selectedHotel = this.hotelPKs[hotelID];
  //   this.getRooms();
  //   this.refresh();
  // }

  // public getRooms(): void {
  //   this.communicationService
  //     .getOwners(this.selectedHotel)
  //     .subscribe((rooms: string[]) => {
  //       this.rooms = rooms;
  //     });
  // }

  // private refresh() {
  //   this.getRooms();
  //   this.newRoomNb.nativeElement.innerText = "";
  //   this.newRoomType.nativeElement.innerText = "";
  //   this.newRoomPrice.nativeElement.innerText = "";
  // }

  // public changeRoomType(event: any, i: number) {
  //   // const editField = event.target.textContent;
  //   // this.rooms[i].type = editField;
  // }

  // public changeRoomPrice(event: any, i: number) {
  //   // const editField = event.target.textContent;
  //   // this.rooms[i].price = editField;
  // }

  // public deleteRoom(hotelNb: string, roomNb: string) {
  //   this.communicationService
  //     .deleteRoom(hotelNb, roomNb)
  //     .subscribe((res: any) => {
  //       this.refresh();
  //     });
  // }

  // public insertRoom(): void {
  //   const room: Room = {
  //     hotelnb: this.selectedHotel,
  //     roomnb: this.newRoomNb.nativeElement.innerText,
  //     type: this.newRoomType.nativeElement.innerText,
  //     price: this.newRoomPrice.nativeElement.innerText,
  //   };

  //   this.communicationService.insertRoom(room).subscribe((res: number) => {
  //     this.refresh();
  //   });
  // }

  // public updateRoom(i: number) {
  //   // this.communicationService
  //   //   .updateRoom(this.rooms[i])
  //   //   .subscribe((res: any) => {
  //   //     this.refresh();
  //   //   });
  // }
}
