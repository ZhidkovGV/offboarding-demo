import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import moment from "moment";
import {
  Equipment,
  EquipmentStatus,
  OffboardingProcess,
  OffboardingReciever,
} from "../offboarding-service";
import { MatSelectModule } from "@angular/material/select";
import { EQUIPMENT_STATUS_LABELS } from "../equipment-status";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MiscService } from "../../core/misc/misc.service";
import { toSignal } from "@angular/core/rxjs-interop";

type EquipmentFormGroup = FormGroup<{
  status: FormControl<EquipmentStatus>;
  note: FormControl<string>;
  id: FormControl<string>;
  name: FormControl<string>;
}>;

export interface EquipmentForm {
  reciever: Partial<OffboardingReciever>;
  equipment: Partial<Equipment>[];
}

@Component({
  selector: "app-offboarding-equipment-form",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  templateUrl: "./offboarding-equipment-form.component.html",
})
export class OffboardingEquipmentFormComponent {
  readonly process = input<OffboardingProcess>();
  readonly isCompleted = input<boolean>(false);

  private readonly fb = inject(NonNullableFormBuilder);
  readonly statusOptions = EQUIPMENT_STATUS_LABELS;
  readonly form = this.fb.group({
    reciever: this.fb.group({
      name: this.fb.control("", {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      email: this.fb.control("", {
        validators: [
          Validators.required,
          Validators.maxLength(40),
          Validators.email,
        ],
      }),
      adressLine: this.fb.control("", {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      country: this.fb.control("", {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      city: this.fb.control("", {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      postalCode: this.fb.control("", {
        validators: [Validators.required, Validators.maxLength(10)],
      }),
      phone: this.fb.control("", {
        validators: [
          Validators.required,
          Validators.pattern(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          ),
        ],
      }),
    }),
    equipment: this.fb.array<EquipmentFormGroup>([]),
  });
  private readonly misc = inject(MiscService);
  private readonly countries = toSignal(this.misc.getCountries(), {
    initialValue: [],
  });
  private readonly cities = toSignal(this.misc.getCities(), {
    initialValue: [],
  });
  private readonly countryText = toSignal(
    this.form.controls.reciever.controls.country.valueChanges,
    { initialValue: "" },
  );
  private readonly cityText = toSignal(
    this.form.controls.reciever.controls.city.valueChanges,
    { initialValue: "" },
  );

  readonly filteredCities = computed(() => {
    return this.cities().filter((country) => country.includes(this.cityText()));
  });

  readonly filteredCountries = computed(() => {
    return this.countries().filter((country) =>
      country.includes(this.countryText()),
    );
  });

  constructor() {
    effect(() => {
      const process = this.process();
      if (process) {
        this.form.controls.equipment.clear();
        const { reciever } = process;
        if (reciever) {
          this.form.controls.reciever.setValue(reciever);
        }

        for (const equipment of process.employee.equipment) {
          const control = this.createEquipmentForm(equipment);
          this.form.controls.equipment.push(control);
        }
      }
    });

    effect(() => {
      if (this.isCompleted()) {
        this.form.disable();
      }
    });
  }

  readonly valueChange = output<EquipmentForm>();

  private createEquipmentForm(equipment: Equipment): EquipmentFormGroup {
    return this.fb.group({
      status: this.fb.control<EquipmentStatus>(equipment.status),
      note: this.fb.control(equipment.note ?? "", [Validators.maxLength(40)]),
      id: this.fb.control(equipment.id),
      name: this.fb.control(equipment.name),
    });
  }

  onSubmit(formValue: Partial<EquipmentForm>): void {
    this.valueChange.emit(formValue as EquipmentForm);
  }
}
