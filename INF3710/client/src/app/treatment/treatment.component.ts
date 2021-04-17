import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/animal";
import { Treatment } from "../../../../common/tables/treatment";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./treatment.component.html",
  styleUrls: ["./treatment.component.css"],
})

export class TreatmentComponent implements OnInit {
  public clinicPKs: string[] = [];
  public animals: Animal[] = [];
  public treatments: Treatment[] = [];
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

  public getTreatments(): void {
    this.communicationService
      .getTreatments(this.selectedClinic, this.selectedAnimal)
      .subscribe((treatments: Treatment[]) => {
        this.treatments = treatments;
      });
  }

  private refresh(): void {
    this.getTreatments();
  }
}
