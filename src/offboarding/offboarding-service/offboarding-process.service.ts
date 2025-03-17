import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  exhaustMap,
  iif,
  map,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import {
  OffboardingProcess,
  PatchOffboardingProcess,
} from "./offboarding.types";
import { BaseUrl, GenericResponse } from "../../core/generic";
import { NotificationService } from "../../core/notification";

@Injectable({
  providedIn: "root",
})
export class OffboardingProcessService {
  private readonly client = inject(HttpClient);
  private readonly notificationService = inject(NotificationService);
  private readonly offboardProcessUrl = `${inject(BaseUrl)}/users/offboard`;

  private processes$ = new BehaviorSubject<OffboardingProcess[] | null>(null);
  private update$ = new Subject<void>();

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

  get$(processId: string): Observable<OffboardingProcess> {
    return merge(
      this.get(processId),
      this.update$.pipe(switchMap(() => this.get(processId))),
    );
  }

  patch(patch: PatchOffboardingProcess): Observable<boolean> {
    return this.client
      .patch<GenericResponse>(this.offboardProcessUrl, patch)
      .pipe(
        map(({ success }) => success),
        tap((success) =>
          this.notificationService.notify(
            success ? "Saved Succesfully" : "Failed To Save",
          ),
        ),
        tap(() => {
          // invalidate cache
          this.processes$.next(null);
        }),
      );
  }

  private initProcesses(): Observable<OffboardingProcess[]> {
    return this.client.get<OffboardingProcess[]>(this.offboardProcessUrl).pipe(
      tap((processes) => {
        this.processes$.next(processes);
      }),
    );
  }
}
