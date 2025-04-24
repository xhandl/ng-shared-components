import {Component} from '@angular/core';
import {
  AdvancedMatSelectExamplesComponent
} from './advanced-mat-select-examples/advanced-mat-select-examples.component';
import {MatInputViewExamplesComponent} from './mat-input-view-examples/mat-input-view-examples.component';

@Component({
  selector: 'xh-root',
  imports: [
    AdvancedMatSelectExamplesComponent,
    MatInputViewExamplesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
