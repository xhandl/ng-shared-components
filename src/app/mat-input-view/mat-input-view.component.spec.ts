import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputViewComponent } from './mat-input-view.component';

describe('MatInputViewComponent', () => {
  let component: MatInputViewComponent;
  let fixture: ComponentFixture<MatInputViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatInputViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
