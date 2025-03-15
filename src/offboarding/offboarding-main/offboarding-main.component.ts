import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { OffboardingGridComponent } from "../offboarding-grid";
import { OffboardingProcessService } from "../offboarding-service";
import { AsyncPipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
@Component({
  selector: "app-offboarding-main",
  imports: [
    OffboardingGridComponent,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  templateUrl: "./offboarding-main.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingMainComponent {
  readonly processes$ = inject(OffboardingProcessService).getAll();
}
