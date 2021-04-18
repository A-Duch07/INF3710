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
  public examensPKs: string[] = [];
  public animals: Animal[] = [];
  public receipts: Receipt[] = [];

  // public duplicateError: boolean = false;
  // public invalidHotelPK: boolean = false;

  public selectedExam: string = "-1";

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.communicationService.getExamensPKs().subscribe((clinicPKs: string[]) => {
      this.examensPKs = clinicPKs;
      this.selectedExam = this.examensPKs[0];
    });
    this.refresh()
  }

  public updateSelectedExam(num:number){
    this.selectedExam = this.examensPKs[num];
  }

  public getReceipts(): void {
    this.communicationService
      .getReceipts()
      .subscribe((receipts: Receipt[]) => {
        this.receipts = receipts;
      });
  }

  public generateReceipt(){

    this.communicationService
    .generateReceipts(this.selectedExam)
    .subscribe((receipts: Receipt[]) => {
      this.communicationService
      .getReceipts()
      .subscribe((receipts: Receipt[]) => {
        this.receipts = receipts;
      });
    });

  }

  private refresh(): void {
    this.getReceipts();
  }
}
