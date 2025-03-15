import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Equipment } from "../offboarding-service";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EquipmentStatusPipe } from "../equipment-status";

@Component({
  selector: "app-equipment-cell",
  imports: [MatIconModule, MatTooltipModule, EquipmentStatusPipe],
  templateUrl: "./equipment-cell.component.html",
})
export class EquipmentCellComponent {
  readonly equipment = input<Equipment[]>([]);
}
