import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  exhaustMap,
  iif,
  map,
  Observable,
  of,
  tap,
} from "rxjs";
import {
  OffboardingProcess,
  PatchOffboardingProcess,
} from "./offboarding.types";
import { BaseUrl, GenericResponse } from "../../core/generic";

@Injectable({
  providedIn: "root",
})
export class OffboardingProcessService {
  private readonly client = inject(HttpClient);
  private readonly offboardProcessUrl = `${inject(BaseUrl)}/users/offboard`;

  getAll(): Observable<OffboardingProcess[]> {
    return this.processes$.pipe(
      exhaustMap((processes) =>
        iif(() => processes !== null, of(processes!), this.initProcesses()),
      ),
    );
  }

  get(processId: string): Observable<OffboardingProcess> {
    return this.processes$.pipe(
      exhaustMap((processes) => {
        const cached = processes?.find(({ id }) => processId === id);
        if (cached) {
          return of(cached);
        }

        return this.client.get<OffboardingProcess>(
          `${this.offboardProcessUrl}/${processId}`,
        );
      }),
    );
  }

  patch(patch: PatchOffboardingProcess): Observable<boolean> {
    return this.client
      .patch<GenericResponse>(this.offboardProcessUrl, patch)
      .pipe(map(({ success }) => success));
  }

  private processes$ = new BehaviorSubject<OffboardingProcess[] | null>(null);

  private initProcesses(): Observable<OffboardingProcess[]> {
    return this.client.get<OffboardingProcess[]>(this.offboardProcessUrl).pipe(
      tap((processes) => {
        this.processes$.next(processes);
      }),
    );
  }
}
