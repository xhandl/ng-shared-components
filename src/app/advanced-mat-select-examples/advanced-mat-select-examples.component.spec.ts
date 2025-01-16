import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvancedMatSelectExamplesComponent} from './advanced-mat-select-examples.component';

describe('AdvancedSelectExampleComponent', () => {
  let component: AdvancedMatSelectExamplesComponent;
  let fixture: ComponentFixture<AdvancedMatSelectExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedMatSelectExamplesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdvancedMatSelectExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
