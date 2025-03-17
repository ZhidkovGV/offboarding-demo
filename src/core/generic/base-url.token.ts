import { InjectionToken } from "@angular/core";
import { BASE_URL } from "../../../environment/envirnoment";

/**
 * Provides base url adress via DI
 */
export const BaseUrl = new InjectionToken("BASE_URL", {
  providedIn: "root",
  factory: () => BASE_URL,
});
