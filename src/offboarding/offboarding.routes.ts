import { Routes } from "@angular/router";
import { OffboardingLayoutComponent } from "./offboarding-layout.component";
import { ProcessDetailsComponent } from "./process-details/process-details.component";
import { OffboardingMainComponent } from "./offboarding-main/offboarding-main.component";
import { OffboardingProcessesComponent } from "./offboarding-processes";
import { offboardingProcessExistsGuard } from "./offboarding-guards";
import { EquipmentGridComponent } from "./equipment-grid/equipment-grid.component";

export const OFFBOARDING_ROUTES: Routes = [
  {
    path: "",
    component: OffboardingLayoutComponent,
    children: [
      {
        path: "",
        component: OffboardingMainComponent,
        children: [
          {
            path: "processes",
            component: OffboardingProcessesComponent,
          },
          {
            path: "equipment",
            component: EquipmentGridComponent,
          },
          {
            path: "",
            pathMatch: "full",
            redirectTo: "processes",
          },
        ],
      },
      {
        path: "processes/:id",
        component: ProcessDetailsComponent,
        canActivate: [offboardingProcessExistsGuard],
      },
    ],
  },
];
