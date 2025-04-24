import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'xh-mat-input-view',
  imports: [
    MatFormField,
    MatInputModule
  ],
  templateUrl: './mat-input-view.component.html',
  styleUrl: './mat-input-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatInputViewComponent {
  value = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  appearance = input<'fill' | 'outline'>('fill');
  required = input<boolean>(false);
}
