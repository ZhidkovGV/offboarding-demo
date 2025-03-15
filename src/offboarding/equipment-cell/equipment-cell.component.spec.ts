import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCellComponent } from './equipment-cell.component';

describe('EquipmentCellComponent', () => {
  let component: EquipmentCellComponent;
  let fixture: ComponentFixture<EquipmentCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
