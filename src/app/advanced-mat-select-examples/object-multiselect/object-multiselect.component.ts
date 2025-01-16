import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {AdvancedMatSelectComponent} from '../../advanced-mat-select/advanced-mat-select.component';
import {JsonPipe} from '../../pipes/json.pipe';
import {MatButton} from '@angular/material/button';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

interface Object {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
}

const DEFAULT_OPTIONS: Object[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john-doe@example.com',
    login: 'jdoe'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane-smith@example.com',
    login: 'jsmith'
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice-brown@example.com',
    login: 'abrown'
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'White',
    email: 'bob-white@example.com',
    login: 'bwhite'
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Black',
    email: 'charlie-black@example.com',
    login: 'cblack'
  }
];

@Component({
  selector: 'xh-object-multiselect',
  imports: [
    AdvancedMatSelectComponent,
    JsonPipe,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './object-multiselect.component.html',
  styleUrl: './object-multiselect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectMultiselectComponent {
  options = signal(DEFAULT_OPTIONS);

  selectedOptions = new FormControl<Object[]>([DEFAULT_OPTIONS[2]]);

  optionLabel = (option: Object) => `${option.firstName} ${option.lastName}`;
  optionKey = (option: Object) => option.id;
  searchBy = (option: Object) => `${option.firstName} ${option.lastName} ${option.email} ${option.login}`;

  addOption() {
    this.options.update(options => ([
      ...options,
      {
        id: options.length + 1,
        firstName: `Option`,
        lastName: `${options.length + 1}`,
        email: `option-${options.length}@example.com`,
        login: `o${options.length + 1}`
      }
    ]));
  }

  reset() {
    this.options.set(DEFAULT_OPTIONS);
    this.selectedOptions.setValue([]);
  }
}
