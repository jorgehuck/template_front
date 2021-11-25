import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SpinnerComponent>,
  ) {}

  ngOnInit(): void {}

  /**
   *
   */
   onClose(): void {
    this.dialogRef.close();
  }

  
}
