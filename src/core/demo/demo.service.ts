import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { BaseUrl, GenericResponse, WINDOW } from "../generic";

@Injectable({
  providedIn: "root",
})
export class DemoService {
  private readonly client = inject(HttpClient);
  private readonly window = inject(WINDOW);
  private readonly baseUrl = `${inject(BaseUrl)}/reset`;

  resetDemo(): Observable<boolean> {
    return this.client.post<GenericResponse>(this.baseUrl, {}).pipe(
      map(({ success }) => success),
      tap((success) => {
        if (success) {
          this.window.location.reload();
        }
      })
    );
  }
}
