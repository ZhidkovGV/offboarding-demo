import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../layout/header/header.component";

@Component({
  selector: "app-offboarding-layout",
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header>
      <span header-text>Demo</span>
    </app-header>
    <main class="flex-column flex-auto p-4 overflow-x-hidden">
      <router-outlet />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingLayoutComponent {}
