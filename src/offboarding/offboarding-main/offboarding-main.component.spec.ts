import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingMainComponent } from './offboarding-main.component';

describe('OffboardingMainComponent', () => {
  let component: OffboardingMainComponent;
  let fixture: ComponentFixture<OffboardingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
