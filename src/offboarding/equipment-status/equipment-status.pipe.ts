import { Pipe, PipeTransform } from "@angular/core";
import { EquipmentStatus } from "../offboarding-service";

const EQUIPMENT_STATUS_TO_LABEL = new Map<EquipmentStatus, string>([
  [EquipmentStatus.InUse, "In Posession"],
  [EquipmentStatus.Returned, "Returned"],
  [EquipmentStatus.Lost, "Lost"],
]);

@Pipe({
  name: "equipmentStatus",
})
export class EquipmentStatusPipe implements PipeTransform {
  transform(status: EquipmentStatus): string {
    return EQUIPMENT_STATUS_TO_LABEL.get(status) ?? "Unknown";
  }
}
