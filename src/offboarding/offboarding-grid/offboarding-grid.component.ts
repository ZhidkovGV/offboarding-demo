import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  viewChild,
} from "@angular/core";
import {
  OffboardingProcess,
  OffboardingProcessService,
} from "../offboarding-service";
import { toSignal } from "@angular/core/rxjs-interop";

import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { getReactiveTableSource } from "../../grid/get-reactive-table-source";
import { OffboardingStatusPipe } from "../offboarding-status";
import { EquipmentCellComponent } from "../equipment-cell";

const COLUMN_IDS = [
  "name",
  "email",
  "department",
  "equipment",
  "status",
] as const;

type OffboardingGridColumnId = (typeof COLUMN_IDS)[number];

const sortingDataAccessor = (
  data: OffboardingProcess,
  column: OffboardingGridColumnId,
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
  private readonly paginator = viewChild(MatPaginator);
  private readonly sort = viewChild(MatSort);

  readonly displayedColumns = COLUMN_IDS;

  readonly source = getReactiveTableSource({
    paginator: this.paginator,
    sort: this.sort,
    dataSource: this.processes,
    sortAcessor: sortingDataAccessor,
  });
}
