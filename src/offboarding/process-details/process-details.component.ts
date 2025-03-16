import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { OffboardingProcessService } from "../offboarding-service";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatSpinner } from "@angular/material/progress-spinner";
import { auditTime } from "rxjs";
import { Location } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { OffboardingGeneralFormComponent } from "../offboarding-general-form/offboarding-general-form.component";
import { OffboardingEquipmentFormComponent } from "../offboarding-equipment-form/offboarding-equipment-form.component";
import { ExitInterviewFormComponent } from "../exit-interview-form/exit-interview-form.component";
import { CertificateFormComponent } from "../certificate-form/certificate-form.component";

const FIRST_RENDER_DELAY = 400;
@Component({
  selector: "app-process-details",
  imports: [
    MatSpinner,
    MatButtonModule,
    MatIcon,
    MatExpansionModule,
    OffboardingGeneralFormComponent,
    OffboardingEquipmentFormComponent,
    ExitInterviewFormComponent,
    CertificateFormComponent,
  ],
  templateUrl: "./process-details.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessDetailsComponent {
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get("id")!;
  readonly processDetails = toSignal(
    inject(OffboardingProcessService)
      .get(this.id)
      .pipe(auditTime(FIRST_RENDER_DELAY)),
  );
  private readonly location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
