import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OutputRef,
} from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { debounceTime } from "rxjs";
import { outputFromObservable } from "@angular/core/rxjs-interop";
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { OFFBOARDING_STATUS_TO_LABEL } from "../offboarding-status";
import { OffboardingStatus } from "../offboarding-service";

const FORM_CHANGE_DEBOUNCE = 200;

export type OffboardingFilter =
  OffboardingProcessSearchFilterComponent["filterChange"] extends OutputRef<
    infer T
  >
    ? T
    : never;

@Component({
  selector: "app-offboarding-process-search-filter",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  templateUrl: "./offboarding-process-search-filter.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingProcessSearchFilterComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  readonly filterForm = this.fb.group({
    searchText: this.fb.control(""),
    status: this.fb.control<OffboardingStatus[]>(
      [
        OffboardingStatus.NotStarted,
        OffboardingStatus.InProgress,
        OffboardingStatus.Complete,
      ],
      { validators: Validators.required },
    ),
  });
  readonly offboardingStatuses = Array.from(
    OFFBOARDING_STATUS_TO_LABEL,
    ([status, label]) => ({ status, label }),
  );

  private readonly searchChange$ = this.filterForm.valueChanges.pipe(
    debounceTime(FORM_CHANGE_DEBOUNCE),
  );

  readonly filterChange = outputFromObservable(this.searchChange$);
}
