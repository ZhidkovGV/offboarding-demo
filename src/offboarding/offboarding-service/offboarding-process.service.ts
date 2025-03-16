import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Employee, OffboardingProcess } from "./offboarding.types";
import { BaseUrl } from "../../core/generic";

@Injectable({
  providedIn: "root",
})
export class OffboardingProcessService {
  private readonly client = inject(HttpClient);
  private readonly offboardProcessUrl = `${inject(BaseUrl)}/users/offboard`;

  getAll(): Observable<OffboardingProcess[]> {
    return this.client.get<OffboardingProcess[]>(this.offboardProcessUrl);
  }

  get(id: string): Observable<OffboardingProcess> {
    return this.client.get<OffboardingProcess>(
      `${this.offboardProcessUrl}/${id}`,
    );
  }

  patch(id: string, {}): Observable<boolean> {
    return of(true);
  }

  complete(id: string): Observable<boolean> {
    return of(true);
  }
}
