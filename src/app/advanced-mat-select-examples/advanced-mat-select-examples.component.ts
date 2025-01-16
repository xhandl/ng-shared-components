import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {BasicMultiselectComponent} from './basic-multiselect/basic-multiselect.component';
import {BasicSelectComponent} from './basic-select/basic-select.component';
import {ObjectSelectComponent} from './object-select/object-select.component';
import {ObjectMultiselectComponent} from './object-multiselect/object-multiselect.component';

@Component({
  selector: 'xh-advanced-mat-select-examples',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    BasicMultiselectComponent,
    BasicSelectComponent,
    ObjectSelectComponent,
    ObjectMultiselectComponent
  ],
  templateUrl: './advanced-mat-select-examples.component.html',
  styleUrl: './advanced-mat-select-examples.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedMatSelectExamplesComponent {


}
