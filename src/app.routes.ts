import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: "Offboarding",
    path: "offboarding",
    loadChildren: () =>
      import("./offboarding/offboarding.routes").then(
        (m) => m.OFFBOARDING_ROUTES
      ),
  },
  {
    pathMatch: "full",
    path: "",
    redirectTo: "offboarding",
  },
  {
    path: "**",
    loadComponent: () =>
      import("./not-found/not-found.component").then(
        (m) => m.NotFoundComponent
      ),
    title: "404",
  },
];
