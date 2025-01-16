# Ng Shared Components

Project with shared components for Angular applications.
Ideal to take, adapt and modify to your project needs.

Components are built with Angular Material and Angular CDK.

<i>This is a work in progress project. More components will be added in the future and existing components will be improved.</i>

Try live [demo](https://ng-shared-components.demo.xhandl.com/).

## Advanced Mat-Select

Angular Material Select with advanced features.

- Easier to use if you don't need custom templates or any extra features.
- Search available by default.
- Select all options with a single click.
- Efficiently handle large data sets.
- Support scalar values and objects.
- Compatible with form controls.

### API

Selector: `xh-advanced-mat-select`

#### Properties:

| Name and Type                                   | Default                                      | Description                                                                          |
|-------------------------------------------------|----------------------------------------------|--------------------------------------------------------------------------------------|
| @Input()<br/>options: T[]                       | -                                            | Array of options to display. Required.                                               |
| @Input()<br/>multi: boolean                     | `false`                                      | Whether multiple options can be selected.                                            |
| @Input()<br/>selectLabel: string                | `''`                                         | Label for the select input.                                                          |
| @Input()<br/>searchPlaceholder: string          | `'Search...'`                                | Placeholder text for the search input.                                               |
| @Input()<br/>optionLabel: (option: T) => string | `(option: T) => option as unknown as string` | Function to get the label for an option.                                             |
| @Input()<br/>optionKey: (item: T) => K          | `(item: T) => item as unknown as K`          | Function to get the key for an option. The key is used to track and compare options. |
| @Input()<br/>searchBy: (option: T) => string    | `(option: T) => option as unknown as string` | Function to get the search string for an option.                                     |
| @Input()<br/>panelWidth: string                 | `'auto'`                                     | Width of the select panel.                                                           |
