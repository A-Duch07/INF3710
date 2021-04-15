import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AnimalComponent } from "./animal/animal.component";
import { AppComponent } from "./app.component";
import { ReceiptComponent } from "./receipt/receipt.component";
import { TreatmentComponent } from "./treatment/treatment.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "facture", component: ReceiptComponent },
  { path: "animal", component: AnimalComponent },
  { path: "traitement", component: TreatmentComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }