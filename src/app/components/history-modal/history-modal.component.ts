import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss']
})
export class HistoryModalComponent {

  constructor(
    public dialogRef: MatDialogRef<HistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fieldHistory: any[], fieldName: string }) { }


  onClose(): void {
    this.dialogRef.close();
  }
}
