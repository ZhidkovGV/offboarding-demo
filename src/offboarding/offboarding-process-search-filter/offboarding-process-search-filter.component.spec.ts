import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingProcessSearchFilterComponent } from './offboarding-process-search-filter.component';

describe('OffboardingProcessSearchFilterComponent', () => {
  let component: OffboardingProcessSearchFilterComponent;
  let fixture: ComponentFixture<OffboardingProcessSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingProcessSearchFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingProcessSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
