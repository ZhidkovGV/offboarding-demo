import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OffboardingLayoutComponent } from "./offboarding-layout.component";

describe(OffboardingLayoutComponent.name, () => {
  let component: OffboardingLayoutComponent;
  let fixture: ComponentFixture<OffboardingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
