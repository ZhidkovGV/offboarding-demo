import { Component, effect, inject, input, output } from "@angular/core";
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { OffboardingProcess, OffboardingStatus } from "../offboarding-service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { OFFBOARDING_STATUS_LABELS } from "../offboarding-status";
import moment, { Moment } from "moment";

export interface OffboardingGeneralForm {
  startDate: Moment;
  targetDate: Moment;
  status: OffboardingStatus;
}

@Component({
  selector: "app-offboarding-general-form",
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: "./offboarding-general-form.component.html",
})
export class OffboardingGeneralFormComponent {
  readonly process = input<OffboardingProcess>();
  readonly isReadyToComplete = input<boolean>(false);
  readonly isCompleted = input<boolean>(false);

  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    startDate: this.fb.control<Moment>(moment(), {
      validators: Validators.required,
    }),
    targetDate: this.fb.control<Moment>(moment(), {
      validators: Validators.required,
    }),
    status: this.fb.control<OffboardingStatus>(OffboardingStatus.Unknown, {
      validators: [Validators.required],
    }),
  });

  readonly statusOptions = OFFBOARDING_STATUS_LABELS;

  readonly valueChange = output<OffboardingGeneralForm>();

  constructor() {
    effect(() => {
      const process = this.process();
      if (process) {
        this.form.setValue({
          startDate: moment(process.startDate),
          targetDate: moment(process.targetDate),
          status: process.status,
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
  }

  onSubmit(form: Partial<OffboardingGeneralForm>): void {
    this.valueChange.emit(form as OffboardingGeneralForm);
  }

  onReactivate(form: Partial<OffboardingGeneralForm>): void {
    this.valueChange.emit({
      ...form,
      status: OffboardingStatus.InProgress,
    } as OffboardingGeneralForm);
  }
}
