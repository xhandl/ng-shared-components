import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatSelectModule} from '@angular/material/select';

class OptionWrapper<T, K> {
  item: T;
  label: string;
  key: K;
  searchBy: string;

  constructor(
    item: T,
    labelFn: (item: T) => string,
    keyFn: (item: T) => K,
    searchByFn: (item: T) => string) {
    this.item = item;
    this.label = labelFn(item);
    this.key = keyFn(item);
    this.searchBy = searchByFn(item)?.toLowerCase() ?? '';
  }
}

@Component({
  selector: 'xh-advanced-mat-select',
  imports: [
    MatFormField,
    MatInputModule,
    MatIcon,
    MatCheckbox,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './advanced-mat-select.component.html',
  styleUrl: './advanced-mat-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AdvancedMatSelectComponent
    }
  ]
})
export class AdvancedMatSelectComponent<T, K> implements ControlValueAccessor {
  options = input.required<T[]>();
  multi = input<boolean>(false);
  selectLabel = input<string>('');
  searchPlaceholder = input<string>('Search...');
  optionLabel = input<(option: T) => string>((option: T) => option as unknown as string);
  optionKey = input<(item: T) => K>((item: T) => item as unknown as K);
  searchBy = input<(option: T) => string>((option: T) => option as unknown as string);
  panelWidth = input<string>('auto');

  protected selectFormControl = new FormControl<K | K[]>([]);
  private selectedWrappedOptions = signal<OptionWrapper<T, K>[]>([]);

  protected searchInput = viewChild<ElementRef>('searchInput');
  protected searchFormControl = new FormControl('', {nonNullable: true});
  private search = toSignal(this.searchFormControl.valueChanges);

  private wrappedOptions = computed(() => {
    const options = this.options();
    const labelFn = this.optionLabel();
    const keyFn = this.optionKey();
    const searchByFn = this.searchBy();

    return options.map((item) =>
      new OptionWrapper(item, labelFn, keyFn, searchByFn)
    );
  });

  protected filteredWrappedOptions = computed(() => {
    const allOptions = this.wrappedOptions();
    const selectedOptions = this.selectedWrappedOptions();
    const search = this.search()?.toLowerCase();

    if (!search) {
      return allOptions;
    }

    const filteredOptions = [];
    const selectedKeys = selectedOptions.map((option) => option.key);

    for (const option of allOptions) {
      if (selectedKeys.includes(option.key)) {
        filteredOptions.push(option);
      } else if (option.searchBy.includes(search)) {
        filteredOptions.push(option);
      }
    }

    return filteredOptions;
  });

  protected selectTriggerLabel = computed(() => {
    const selectedOptions = this.selectedWrappedOptions();

    let label = '';
    if (selectedOptions.length > 0) {
      const firstSelectedOption = selectedOptions[0];

      label = firstSelectedOption.label;

      if (selectedOptions.length > 1) {
        label += ` (+${selectedOptions.length - 1})`;
      }
    }

    return label;
  });

  protected isAnySelected = computed(() => {
    return this.selectedWrappedOptions().length > 0;
  });

  protected isAllSelected = computed(() => {
    const selectedOptions = this.selectedWrappedOptions();
    const filteredOptions = this.filteredWrappedOptions();
    return selectedOptions.length === filteredOptions.length;
  });

  private _onChange = (_options: any | any[]) => {
  };
  private _onTouched = () => {
  };

  constructor() {
    effect(() => {
      const multi = this.multi();
      const selectedOptions = [...this.selectedWrappedOptions()];

      if (multi) {
        this.selectFormControl.setValue(selectedOptions.map((option) => option.key));
        this._onChange(selectedOptions.map((option) => option.item));
      } else {
        const selectedOption = selectedOptions.length > 0 ? selectedOptions[0] : null;
        this.selectFormControl.setValue(selectedOption?.key ?? null);
        this._onChange(selectedOption?.item);
      }
    });
  }

  writeValue(value: T | T[]) {
    const labelFn = this.optionLabel();
    const keyFn = this.optionKey();
    const searchByFn = this.searchBy();

    let wrappedOptions: OptionWrapper<T, K>[] = [];
    if (Array.isArray(value)) {
      wrappedOptions = value.map((item) =>
        new OptionWrapper(item, labelFn, keyFn, searchByFn)
      );
    } else if (value) {
      wrappedOptions = [new OptionWrapper(value, labelFn, keyFn, searchByFn)];
    }

    this.selectedWrappedOptions.set(wrappedOptions);
  }

  registerOnChange(onChange: any) {
    this._onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this._onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.selectFormControl.disable();
    } else {
      this.selectFormControl.enable();
    }
  }

  protected focusSearchInput() {
    if (!this.isAnySelected()) {
      setTimeout(() => this.searchInput()?.nativeElement.focus());
    }
  }

  protected clearSearch() {
    this.searchFormControl.setValue('');
  }

  protected preventKeydownPropagation($event: KeyboardEvent) {
    if ($event) {
      if ($event.key === 'Enter') {
        // Keep enter working
        return;
      } else if ($event.key === 'Escape') {
        // Keep esc working
        return;
      } else if ($event.key === 'ArrowUp') {
        // Keep arrow up working to navigate
        return;
      } else if ($event.key === 'ArrowDown') {
        // Keep arrow down working to navigate
        return;
      }
    }

    $event.stopPropagation();
  }

  protected toggleOption(option: OptionWrapper<T, K>) {
    let selectedOptions = [...this.selectedWrappedOptions()];
    const index = selectedOptions.findIndex((selectedOption) => selectedOption.key === option.key);

    if (this.multi()) {
      if (index > -1) {
        selectedOptions.splice(index, 1);
      } else {
        selectedOptions.push(option);
      }
    } else {
      selectedOptions = index > -1 ? [] : [option];
    }

    this.selectedWrappedOptions.set(selectedOptions);
  }

  protected toggleAll() {
    let filteredOptions = [...this.filteredWrappedOptions()];

    if (this.isAllSelected()) {
      filteredOptions = [];
    }

    this.selectedWrappedOptions.set(filteredOptions);
  }
}
