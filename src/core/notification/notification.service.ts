import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";

const DEFAULT_NOTIFICATION_DURATION = 1000;

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  notify(text: string, duration?: number) {
    return this.snackBar.open(text, "Dissmiss", {
      horizontalPosition: "end",
      duration: duration ?? DEFAULT_NOTIFICATION_DURATION,
    });
  }
}
