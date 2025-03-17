import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from "@angular/core";
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { OffboardingProcess } from "../offboarding-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import moment, { Moment } from "moment";

export interface CertificateForm {
  jobCertificateDate: Moment;
  jobCertificateRecieved: boolean;
}

@Component({
  selector: "app-certificate-form",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: "./certificate-form.component.html",
})
export class CertificateFormComponent {
  readonly process = input<OffboardingProcess>();
  readonly isCompleted = input<boolean>(false);
  readonly maxRecievedDate = moment();
  readonly minRecievedDate = computed(() => moment(this.process()?.startDate!));

  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    jobCertificateDate: this.fb.control<Moment>(moment(), {
      validators: Validators.required,
    }),
    jobCertificateRecieved: this.fb.control<boolean>(false, {
      validators: Validators.required,
    }),
  });

  private readonly isRecieved = toSignal(
    this.form.controls.jobCertificateRecieved.valueChanges,
  );

  readonly valueChange = output<CertificateForm>();

  constructor() {
    effect(() => {
      const process = this.process();
      if (process) {
        this.form.setValue({
          jobCertificateDate: moment(process.jobCertificateDate),
          jobCertificateRecieved: !!process.jobCertificateRecieved,
        });
      }
    });

    effect(() => {
      if (this.isCompleted()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    effect(() => {
      if (
        this.isRecieved() &&
        this.form.controls.jobCertificateRecieved.enabled
      ) {
        this.form.controls.jobCertificateDate.enable();
      } else {
        this.form.controls.jobCertificateDate.disable();
      }
    });
  }

  onSubmit(formData: Partial<CertificateForm>): void {
    this.valueChange.emit(formData as CertificateForm);
  }
}
