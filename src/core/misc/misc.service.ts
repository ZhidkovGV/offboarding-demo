import { inject, Injectable } from "@angular/core";
import { BaseUrl } from "../generic";
import { HttpClient } from "@angular/common/http";
import { Observable, shareReplay } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class MiscService {
  private readonly baseUrl = inject(BaseUrl);
  private readonly clinet = inject(HttpClient);
  private readonly contries$ = this.clinet
    .get<string[]>(`${this.baseUrl}/countries`)
    .pipe(takeUntilDestroyed(), shareReplay({ refCount: true, bufferSize: 1 }));

  private readonly cities$ = this.clinet
    .get<string[]>(`${this.baseUrl}/cities`)
    .pipe(takeUntilDestroyed(), shareReplay({ refCount: true, bufferSize: 1 }));

  constructor() {
    // inner subscriber to keep observables alive
    this.contries$.subscribe();
    this.cities$.subscribe();
  }

  getCountries(): Observable<string[]> {
    return this.contries$;
  }

  getCities(): Observable<string[]> {
    return this.cities$;
  }
}
