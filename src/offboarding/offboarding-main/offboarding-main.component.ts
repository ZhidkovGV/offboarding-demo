import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { NavOption } from "../../core/generic";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-offboarding-main",
  imports: [MatTabsModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `<nav mat-tab-nav-bar [tabPanel]="tabPanel" class="w-100 p-4">
      @for (option of navOptions; track option.link) {
        <a
          mat-tab-link
          [routerLink]="option.link"
          routerLinkActive
          #rla="routerLinkActive"
          [active]="rla.isActive"
        >
          {{ option.display }}
        </a>
      }
    </nav>
    <mat-tab-nav-panel #tabPanel>
      <router-outlet />
    </mat-tab-nav-panel>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingMainComponent {
  readonly navOptions: NavOption[] = [
    { link: "processes", display: "Employees" },
    { link: "equipment", display: "Equipment" },
  ];
}
