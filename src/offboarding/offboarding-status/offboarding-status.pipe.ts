import { Pipe, PipeTransform } from "@angular/core";
import { OffboardingStatus } from "../offboarding-service";

export const OFFBOARDING_STATUS_TO_LABEL = new Map<OffboardingStatus, string>([
  [OffboardingStatus.NotStarted, "Not Started"],
  [OffboardingStatus.InProgress, "In Progress"],
  [OffboardingStatus.Complete, "Offboarded"],
]);

export const OFFBOARDING_STATUS_LABELS = Array.from(
  OFFBOARDING_STATUS_TO_LABEL,
  ([status, label]) => ({ status, label }),
);
@Pipe({
  name: "offboardingStatus",
})
export class OffboardingStatusPipe implements PipeTransform {
  transform(status: OffboardingStatus): string {
    return OFFBOARDING_STATUS_TO_LABEL.get(status) ?? "Unknown";
  }
}
