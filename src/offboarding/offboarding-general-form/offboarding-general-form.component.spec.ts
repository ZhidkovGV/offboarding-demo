import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingGeneralFormComponent } from './offboarding-general-form.component';

describe('OffboardingGeneralFormComponent', () => {
  let component: OffboardingGeneralFormComponent;
  let fixture: ComponentFixture<OffboardingGeneralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingGeneralFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingGeneralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
