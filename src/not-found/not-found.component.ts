import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { HeaderComponent } from "../layout/header/header.component";
import { Location } from "@angular/common";

@Component({
  selector: "app-not-found",
  imports: [MatButtonModule, HeaderComponent],
  templateUrl: "./not-found.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  private readonly location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
