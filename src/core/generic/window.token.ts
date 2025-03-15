import { InjectionToken } from "@angular/core";

/**
 * Provides access to window object via DI
 */
export const WINDOW = new InjectionToken("WINDOW", {
  providedIn: "root",
  factory: () => window,
});
