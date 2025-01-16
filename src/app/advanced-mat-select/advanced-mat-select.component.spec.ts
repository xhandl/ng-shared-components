import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvancedMatSelectComponent} from './advanced-mat-select.component';

describe('AdvancedSelectComponent', () => {
  let component: AdvancedMatSelectComponent;
  let fixture: ComponentFixture<AdvancedMatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedMatSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdvancedMatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
