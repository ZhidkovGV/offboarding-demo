import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  viewChild,
} from "@angular/core";
import { OffboardingProcess } from "../offboarding-service";

import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {
  applyFilter,
  applyPaginator,
  applySorting,
  createReactiveDataSource,
} from "../../grid/table-source-helpers";
import { OffboardingStatusPipe } from "../offboarding-status";
import { EquipmentCellComponent } from "../equipment-cell";
import { OffboardingFilter } from "../offboarding-process-search-filter";
import { pipe } from "ramda";
import { DatePipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-offboarding-grid",
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OffboardingStatusPipe,
    EquipmentCellComponent,
    DatePipe,
    MatIcon,
    MatTooltip,
    RouterLink
  ],
  templateUrl: "./offboarding-grid.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingGridComponent {
  readonly processes = input<OffboardingProcess[]>([]);
  readonly filter = input<OffboardingFilter>();

  private readonly paginator = viewChild(MatPaginator);
  private readonly sort = viewChild(MatSort);
  private readonly stringifiedFilter = computed(() => {
    const filter = this.filter();
    if (filter) {
      return this.getFilterString(filter);
    }
    return "";
  });

  readonly displayedColumns = [
    "name",
    "department",
    "email",
    "equipment",
    "status",
    "jobCertificate",
    "interviewDate",
  ];

  private getFilterString(filter: OffboardingFilter) {
    const statuses = filter.status?.join(" ") ?? "";

    return `${statuses}|${filter.searchText ?? ""}`;
  }

  private readonly filterPredicate = (
    { employee, status }: OffboardingProcess,
    filter: string,
  ) => {
    const [statuses, searchText] = filter.split("|");

    const searchTokens = searchText.toLowerCase().split(" ");
    const searchIn = [
      employee.name,
      employee.department,
      ...employee.equipment.map((item) => item.name),
    ].map((field) => field.toLowerCase());

    const isSearchTextMatched = searchTokens.every((field) =>
      searchIn.some((token) => token.includes(field)),
    );

    const isStatusMatched = statuses
      .split(" ")
      .some((token) => status.includes(token));

    return isSearchTextMatched && isStatusMatched;
  };

  private readonly sortingDataAccessor = (
    data: OffboardingProcess,
    column: string,
  ): string | number => {
    switch (column) {
      case "department": {
        return data.employee.department;
      }
      case "name": {
        return data.employee.name;
      }
      case "email": {
        return data.employee.email;
      }
      case "status": {
        return data.status;
      }
      case "interviewDate": {
        return data.exitInterviewDate ?? 0;
      }

      default: {
        return "";
      }
    }
  };

  readonly source = pipe(
    createReactiveDataSource<OffboardingProcess>,
    applyPaginator(this.paginator),
    applyFilter(this.stringifiedFilter, this.filterPredicate),
    applySorting(this.sort, this.sortingDataAccessor),
  )(this.processes);
}
