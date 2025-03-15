import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { DemoService } from "../../core/demo/demo.service";

@Component({
  selector: "app-header",
  imports: [MatButtonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  demoService = inject(DemoService);

  resetDemo(): void {
    this.demoService.resetDemo().subscribe();
  }
}
