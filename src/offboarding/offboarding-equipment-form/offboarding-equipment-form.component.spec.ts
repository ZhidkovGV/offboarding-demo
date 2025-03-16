import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingEquipmentFormComponent } from './offboarding-equipment-form.component';

describe('OffboardingEquipmentFormComponent', () => {
  let component: OffboardingEquipmentFormComponent;
  let fixture: ComponentFixture<OffboardingEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingEquipmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
