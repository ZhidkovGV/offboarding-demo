import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { OffboardingProcessService } from "../offboarding-service";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatSpinner } from "@angular/material/progress-spinner";
import { auditTime } from "rxjs";
import { Location } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import {
  OffboardingGeneralForm,
  OffboardingGeneralFormComponent,
} from "../offboarding-general-form";
import { OffboardingEquipmentFormComponent } from "../offboarding-equipment-form/offboarding-equipment-form.component";
import { ExitInterviewFormComponent } from "../exit-interview-form/exit-interview-form.component";
import { CertificateForm, CertificateFormComponent } from "../certificate-form";
import { WINDOW } from "../../core/generic";

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
  private readonly offboardingService = inject(OffboardingProcessService);
  private readonly id = inject(ActivatedRoute).snapshot.paramMap.get("id")!;

  readonly processDetails = toSignal(
    this.offboardingService.get(this.id).pipe(auditTime(FIRST_RENDER_DELAY)),
  );

  readonly isReadyToComplete = computed(() => {
    const process = this.processDetails();
    if (process) {
      const {
        employee: { equipment },
        jobCertificateRecieved,
        exitInterviewNote,
      } = process;

      return (
        jobCertificateRecieved &&
        exitInterviewNote &&
        equipment.every(
          ({ status }) => status === "RETURNED" || status === "LOST",
        )
      );
    }

    return false;
  });

  private readonly location = inject(Location);
  private readonly window = inject(WINDOW);

  goBack(): void {
    if (this.window.history) {
      this.location.back();
    } else {
      this.location.go("..");
    }
  }

  onGeneralDataChange({
    startDate,
    targetDate,
    status,
  }: OffboardingGeneralForm): void {
    this.offboardingService
      .patch({
        startDate: startDate.getTime(),
        targetDate: targetDate.getTime(),
        status,
        id: this.id,
      })
      .subscribe();
  }

  onCeritificateFormChange({
    jobCertificateDate,
    jobCertificateRecieved,
  }: CertificateForm): void {
    this.offboardingService
      .patch({
        jobCertificateDate: jobCertificateDate.utc().valueOf(),
        jobCertificateRecieved,
        id: this.id,
      })
      .subscribe();
  }
}
