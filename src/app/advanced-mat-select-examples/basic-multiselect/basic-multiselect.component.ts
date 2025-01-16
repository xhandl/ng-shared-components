import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AdvancedMatSelectComponent} from '../../advanced-mat-select/advanced-mat-select.component';
import {MatButton} from '@angular/material/button';
import {JsonPipe} from '../../pipes/json.pipe';

const DEFAULT_OPTIONS = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5'
];

@Component({
  selector: 'xh-basic-multiselect',
  imports: [
    JsonPipe,
    AdvancedMatSelectComponent,
    ReactiveFormsModule,
    MatButton,
    JsonPipe
  ],
  templateUrl: './basic-multiselect.component.html',
  styleUrl: './basic-multiselect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicMultiselectComponent {
  options = signal(DEFAULT_OPTIONS);

  selectedOptions = new FormControl<string[]>(['Option 3']);

  addOption() {
    this.options.update(options => ([
      ...options,
      `Option ${options.length + 1}`
    ]));
  }

  reset() {
    this.options.set(DEFAULT_OPTIONS);
    this.selectedOptions.setValue([]);
  }
}
