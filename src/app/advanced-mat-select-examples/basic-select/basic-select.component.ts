import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {AdvancedMatSelectComponent} from '../../advanced-mat-select/advanced-mat-select.component';
import {MatButton} from '@angular/material/button';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '../../pipes/json.pipe';

const DEFAULT_OPTIONS = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5'
];

@Component({
  selector: 'xh-basic-select',
  imports: [
    AdvancedMatSelectComponent,
    JsonPipe,
    MatButton,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './basic-select.component.html',
  styleUrl: './basic-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSelectComponent {
  options = signal(DEFAULT_OPTIONS);

  selectedOption = new FormControl<string>('Option 3');

  addOption() {
    this.options.update(options => ([
      ...options,
      `Option ${options.length + 1}`
    ]));
  }

  reset() {
    this.options.set(DEFAULT_OPTIONS);
    this.selectedOption.setValue(null);
  }
}
