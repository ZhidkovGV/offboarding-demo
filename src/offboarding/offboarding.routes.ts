import { Routes } from "@angular/router";
import { OffboardingLayoutComponent } from "./offboarding-layout.component";
import { ProcessDetailsComponent } from "./process-details/process-details.component";
import { OffboardingGridComponent } from "./offboarding-grid/offboarding-grid.component";
import { OffboardingMainComponent } from "./offboarding-main/offboarding-main.component";

export const OFFBOARDING_ROUTES: Routes = [
  {
    path: "",
    component: OffboardingLayoutComponent,
    children: [
      { path: ":id", component: ProcessDetailsComponent },
      { path: "", pathMatch: "full", component: OffboardingMainComponent },
    ],
  },
];
