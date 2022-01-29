import {Component,Inject} from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'snack-bar-component',
    templateUrl: 'snack-bar.html',
    styles: [
      `
      .snack-bar {
        color: hotpink;
      }
    `,
    ],
  })
  export class SnackBarComponent {
    constructor(
        public sbRef: MatSnackBarRef<SnackBarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
      ) {}
      ngOnInit() {}
  }
  