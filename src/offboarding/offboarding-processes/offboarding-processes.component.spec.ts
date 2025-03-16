import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingProcessesComponent } from './offboarding-processes.component';

describe('OffboardingProcessesComponent', () => {
  let component: OffboardingProcessesComponent;
  let fixture: ComponentFixture<OffboardingProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingProcessesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
