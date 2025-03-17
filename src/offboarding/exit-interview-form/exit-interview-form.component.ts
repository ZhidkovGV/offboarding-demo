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
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import moment, { Moment } from "moment";
import { OffboardingProcess } from "../offboarding-service";

export interface ExitInterviewForm {
  exitInterviewDate: Moment;
  exitInterviewNote: string;
}

@Component({
  selector: "app-exit-interview-form",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: "./exit-interview-form.component.html",
})
export class ExitInterviewFormComponent {
  readonly process = input<OffboardingProcess>();
  readonly isCompleted = input<boolean>(false);
  readonly maxRecievedDate = moment();
  readonly minRecievedDate = computed(() => moment(this.process()?.startDate!));

  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    exitInterviewDate: this.fb.control<Moment>(moment(), {
      validators: Validators.required,
    }),
    exitInterviewNote: this.fb.control<string>("", {
      validators: [Validators.required, Validators.maxLength(220)],
    }),
  });

  readonly valueChange = output<ExitInterviewForm>();

  constructor() {
    effect(() => {
      const process = this.process();
      if (process) {
        this.form.setValue({
          exitInterviewDate: moment(process.exitInterviewDate),
          exitInterviewNote: process.exitInterviewNote ?? "",
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

  onSubmit(formValue: Partial<ExitInterviewForm>): void {
    this.valueChange.emit(formValue as ExitInterviewForm);
  }
}
