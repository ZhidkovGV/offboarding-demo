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
  TablePredicate,
} from "../../grid/table-source-helpers";
import { OffboardingStatusPipe } from "../offboarding-status";
import { EquipmentCellComponent } from "../equipment-cell";
import { OffboardingFilter } from "../offboarding-process-search-filter";
import { pipe } from "ramda";

const sortingDataAccessor = (
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

    default: {
      return "";
    }
  }
};

const filterPredicate: TablePredicate<OffboardingProcess> = (data, filter) => {
  const [statuses, searchText] = filter.toLowerCase().split("|");

  const isSearchTextMatched = searchText
    .toLowerCase()
    .split(" ")
    .every((token) => JSON.stringify(data).toLowerCase().includes(token));

  const isStatusMatched = statuses
    .toLowerCase()
    .split(" ")
    .some((token) => JSON.stringify(data).toLowerCase().includes(token));

  return isSearchTextMatched && isStatusMatched;
};

@Component({
  selector: "app-offboarding-grid",
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OffboardingStatusPipe,
    EquipmentCellComponent,
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
      const statuses = filter.status?.join(" ") ?? "";

      return `${statuses}|${filter.searchText ?? ""}`;
    }
    return "";
  });

  readonly displayedColumns = [
    "name",
    "email",
    "department",
    "equipment",
    "status",
  ];

  readonly source = pipe(
    createReactiveDataSource<OffboardingProcess>,
    applyPaginator(this.paginator),
    applyFilter(this.stringifiedFilter, filterPredicate),
    applySorting(this.sort, sortingDataAccessor),
  )(this.processes);
}
