import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { DemoService } from "../../core/demo/demo.service";

@Component({
  selector: "app-header",
  imports: [MatButtonModule],
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly demoService = inject(DemoService);

  resetDemo(): void {
    this.demoService.resetDemo().subscribe();
  }
}
