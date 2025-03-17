import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentGridComponent } from './equipment-grid.component';

describe('EquipmentGridComponent', () => {
  let component: EquipmentGridComponent;
  let fixture: ComponentFixture<EquipmentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
