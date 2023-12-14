import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'confirmation-dialog',
    template: `
  <mat-dialog-content>
  <div class="modal-header border-0 mb-2">
      <div class="row">
        <div class="col">
          <h1 class="fs-20 fw-bold btn-primary-text">{{ messageTitle }}</h1>
        </div>
      </div>
      <div>
        <button
        mat-dialog-close
          type="button"
          class="align-items-center d-flex justify-content-center rounded-pill p-0 btn-close light-primary-bg btn-primary-text"
        ></button>
      </div>
    </div>
	    <p>{{message}}</p>
  </mat-dialog-content>

  <mat-dialog-actions class="justify-content-end px-4 pb-3">
  <button style = "margin-left: 10px;"
  type="button" (click)="onDeclineClick()"
  tabindex="-1" class="btn btm fs-14 fw-bold py-2 px-5 text-end">
  {{cancelButtonText}}
  </button>
  <button style = "margin-left: 10px;"
  type="button" (click)="onConfirmClick()" 
  tabindex="1" class="btn btn-danger btm fs-14 fw-bold py-2 px-5 text-end">
  {{confirmButtonText}}
  </button>
  </mat-dialog-actions>
  `
})
export class ConfirmationDialog {
    message: string = "Are you sure to delete?"
    messageTitle: string = "Are you sure?"
    confirmButtonText = "Yes"
    cancelButtonText = "No"

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private _dialogRef: MatDialogRef<ConfirmationDialog>) {
        if (data) {
            this.messageTitle = data.messageTitle || this.messageTitle;
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        this._dialogRef.close(true);
    }

    onDeclineClick():void{
      this._dialogRef.close(false);
    }

}