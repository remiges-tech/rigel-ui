import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CONSTANTS } from 'src/services/constants.service';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss']
})
export class HistoryModalComponent {
  constants = CONSTANTS;

  constructor(
    public dialogRef: MatDialogRef<HistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fieldHistory: any[], fieldName: string }) { }


  onClose(): void {
    this.dialogRef.close();
  }
}
