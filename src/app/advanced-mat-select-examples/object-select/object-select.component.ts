import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {AdvancedMatSelectComponent} from '../../advanced-mat-select/advanced-mat-select.component';
import {JsonPipe} from '../../pipes/json.pipe';
import {MatButton} from '@angular/material/button';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

interface Object {
  id: number;
  name: string;
  type: 'Basic' | 'Advanced';
}

const DEFAULT_OPTIONS: Object[] = [
  {id: 1, name: 'Option 1', type: 'Basic'},
  {id: 2, name: 'Option 2', type: 'Advanced'},
  {id: 3, name: 'Option 3', type: 'Basic'},
  {id: 4, name: 'Option 4', type: 'Advanced'},
  {id: 5, name: 'Option 5', type: 'Basic'}
];

@Component({
  selector: 'xh-object-select',
  imports: [
    AdvancedMatSelectComponent,
    JsonPipe,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './object-select.component.html',
  styleUrl: './object-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectSelectComponent {
  options = signal(DEFAULT_OPTIONS);

  selectedOption = new FormControl<Object>(DEFAULT_OPTIONS[2]);

  optionLabel = (option: Object) => option.name;
  optionKey = (option: Object) => option.id;
  searchBy = (option: Object) => option.name;

  addOption() {
    this.options.update(options => ([
      ...options,
      {id: options.length + 1, name: `Option ${options.length + 1}`, type: 'Basic'}
    ]));
  }

  reset() {
    this.options.set(DEFAULT_OPTIONS);
    this.selectedOption.setValue(null);
  }
}
