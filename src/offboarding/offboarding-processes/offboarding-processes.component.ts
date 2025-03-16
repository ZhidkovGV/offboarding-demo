import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { OffboardingGridComponent } from "../offboarding-grid";
import { OffboardingProcessService } from "../offboarding-service";
import { auditTime } from "rxjs";
import {
  OffboardingFilter,
  OffboardingProcessSearchFilterComponent,
} from "../offboarding-process-search-filter/offboarding-process-search-filter.component";

const FIRST_RENDER_DELAY = 400;

@Component({
  selector: "app-offboarding-processes",
  imports: [
    OffboardingGridComponent,
    AsyncPipe,
    MatProgressSpinnerModule,
    OffboardingProcessSearchFilterComponent,
  ],
  templateUrl: "./offboarding-processes.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingProcessesComponent {
  readonly processes$ = inject(OffboardingProcessService)
    .getAll()
    .pipe(auditTime(FIRST_RENDER_DELAY)); // delay for more smooth UX

  readonly offboardingFilter = signal<OffboardingFilter>({});
}
