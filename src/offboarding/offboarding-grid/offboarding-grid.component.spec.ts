import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OffboardingGridComponent } from "./offboarding-grid.component";

describe("OffboardingGridComponent", () => {
  let component: OffboardingGridComponent;
  let fixture: ComponentFixture<OffboardingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
