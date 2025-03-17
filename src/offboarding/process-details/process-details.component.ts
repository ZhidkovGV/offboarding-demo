import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import {
  OffboardingProcessService,
  OffboardingStatus,
} from "../offboarding-service";
import { ActivatedRoute, Router } from "@angular/router";
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
import {
  EquipmentForm,
  OffboardingEquipmentFormComponent,
} from "../offboarding-equipment-form/offboarding-equipment-form.component";
import {
  ExitInterviewForm,
  ExitInterviewFormComponent,
} from "../exit-interview-form";
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
  private readonly router = inject(Router);

  readonly processDetails = toSignal(
    this.offboardingService.get$(this.id).pipe(auditTime(FIRST_RENDER_DELAY)),
  );

  readonly isReadyToComplete = computed(() => {
    const process = this.processDetails();
    if (process) {
      const {
        employee: { equipment },
        jobCertificateRecieved,
        exitInterviewNote,
      } = process;

      return !!(
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
        startDate: startDate?.utc().valueOf(),
        targetDate: targetDate?.utc().valueOf(),
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
        jobCertificateDate: jobCertificateDate?.utc().valueOf(),
        jobCertificateRecieved,
        id: this.id,
      })
      .subscribe();
  }

  onExitFormChange({
    exitInterviewDate,
    exitInterviewNote,
  }: ExitInterviewForm): void {
    this.offboardingService
      .patch({
        exitInterviewDate: exitInterviewDate?.utc().valueOf(),
        exitInterviewNote,
        id: this.id,
      })
      .subscribe();
  }

  onEquipmentFormChange({ equipment, reciever }: EquipmentForm): void {
    this.offboardingService
      .patch({
        equipment,
        reciever,
        id: this.id,
      })
      .subscribe();
  }

  onOffboard(): void {
    this.offboardingService
      .patch({
        status: OffboardingStatus.Complete,
        id: this.id,
      })
      .subscribe(() => {
        this.router.navigate([".."]);
      });
  }
}
