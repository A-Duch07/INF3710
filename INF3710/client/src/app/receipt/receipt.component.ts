import { Component } from "@angular/core";
import { Animal } from "../../../../common/tables/animal";
import { Receipt } from "../../../../common/tables/receipt";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-hotel",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.css"],
})
export class ReceiptComponent {
  public clinicPKs: string[] = [];
  public animals: Animal[] = [];
  public receipts: Receipt[] = [];

  // public duplicateError: boolean = false;
  // public invalidHotelPK: boolean = false;

  public selectedClinic: string = "-1";
  public selectedAnimal: string = "-1";

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.communicationService.getClinicPKs().subscribe((clinicPKs: string[]) => {
      this.clinicPKs = clinicPKs;
      this.selectedClinic = this.clinicPKs[0];
      this.getAnimals();
    });
  }

  public updateSelectedClinic(clinicID: any): void {
    this.selectedClinic = this.clinicPKs[clinicID];
    this.getAnimals();
    this.refresh();
  }

  public updateSelectedAnimal(animalID: any): void {
    this.selectedAnimal = this.animals[animalID].animalnb;
    this.refresh();
  }

  public getAnimals(): void {
    this.communicationService
      .getAnimalsByClinic(this.selectedClinic)
      .subscribe((animals: Animal[]) => {
        this.animals = animals;
        this.selectedAnimal = animals[0].animalnb;
      });
  }

  public getReceipts(): void {
    this.communicationService
      .getReceipts(this.selectedClinic, this.selectedAnimal)
      .subscribe((receipts: Receipt[]) => {
        this.receipts = receipts;
      });
  }

  private refresh(): void {
    this.getReceipts();
  }
}
