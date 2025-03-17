import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from "@angular/core";
import { auditTime, map, Observable, pipe } from "rxjs";
import { Equipment, OffboardingProcessService } from "../offboarding-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import {
  createReactiveDataSource,
  applyPaginator,
  applySorting,
} from "../../grid/table-source-helpers";
import { MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { EquipmentStatusPipe } from "../equipment-status";

interface EquipmentGridValue extends Equipment {
  ownerName: string;
  processId: string;
}

const FIRST_RENDER_DELAY = 400;
@Component({
  selector: "app-equipment-grid",
  imports: [
    MatTableModule,
    MatPaginatorModule,
    RouterLink,
    EquipmentStatusPipe,
    MatSortModule,
  ],
  templateUrl: "./equipment-grid.component.html",
  styleUrl: "./equipment-grid.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentGridComponent {
  readonly equipment$: Observable<EquipmentGridValue[]> = inject(
    OffboardingProcessService,
  )
    .getAll()
    .pipe(
      map((processes) =>
        processes.flatMap(({ employee, id }) =>
          employee.equipment.map((equipment) => ({
            ...equipment,
            ownerName: employee.name,
            processId: id,
          })),
        ),
      ),
      auditTime(FIRST_RENDER_DELAY), // delay for more smooth UX
    );

  private readonly paginator = viewChild(MatPaginator);
  private readonly sort = viewChild(MatSort);

  readonly displayedColumns = ["name", "status", "ownerName", "note"];

  private readonly sortingDataAccessor = (
    data: EquipmentGridValue,
    column: string,
  ): string | number => {
    switch (column) {
      case "name": {
        return data.name;
      }

      case "status": {
        return data.status;
      }

      case "ownerName": {
        return data.ownerName;
      }

      default: {
        return "";
      }
    }
  };

  readonly source = pipe(
    createReactiveDataSource<EquipmentGridValue>,
    applyPaginator(this.paginator),
    applySorting(this.sort, this.sortingDataAccessor),
  )(toSignal(this.equipment$, { initialValue: [] }));
}
