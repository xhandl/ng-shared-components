import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInputViewComponent} from '../mat-input-view/mat-input-view.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatDivider} from '@angular/material/divider';

interface FormValue {
  value: string;
  label: string;
  placeholder: string;
  appearance: 'fill' | 'outline';
  required: boolean;
}

@Component({
  selector: 'xh-mat-input-view-examples',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatInputViewComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    MatDivider
  ],
  templateUrl: './mat-input-view-examples.component.html',
  styleUrl: './mat-input-view-examples.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatInputViewExamplesComponent {
  form = new FormGroup({
    value: new FormControl('', {
      nonNullable: true
    }),
    label: new FormControl('', {
      nonNullable: true
    }),
    placeholder: new FormControl('', {
      nonNullable: true
    }),
    appearance: new FormControl<'fill' | 'outline'>('fill', {
      nonNullable: true
    }),
    required: new FormControl(false, {
      nonNullable: true
    })
  });

  formValue = signal<FormValue>({
    value: 'Jane Doe',
    label: 'Name',
    placeholder: 'Enter your name',
    appearance: 'fill',
    required: true
  });

  constructor() {
    this.form.patchValue(this.formValue());

    this.form.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.formValue.update(formValue => ({...formValue, ...value}));
      });
  }
}
