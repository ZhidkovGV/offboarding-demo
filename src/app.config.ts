import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideMomentDateAdapter({
      parse: {
        dateInput: "DD-MM-YYYY", // Input format
      },
      display: {
        dateInput: "DD-MM-YYYY", // Display format
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
      },
    }),
  ],
};
