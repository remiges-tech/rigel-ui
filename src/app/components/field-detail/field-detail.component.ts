import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Field } from 'src/models/common-interfaces';
import { checkValueType } from 'src/utils/customValidator';

@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.scss']
})
export class FieldDetailComponent {
  private _toastr = inject(ToastrService)
  isEdit: boolean = false;
  @Input({ required: true }) isShowValue: boolean = false;
  @Input({ required: true }) fieldDetail!: Field;
  @Output() UpdateValues = new EventEmitter<Field>();
  value!: string;

  updateChanges(data: Field) {
    this.isEdit = false;
    let verification = checkValueType(data.type, this.value!, data.constraints);
    if (verification?.status === 'INVALID') {
      this._toastr.warning(verification.msg);
      return;
    };
    data.value = this.value;
    this.UpdateValues.emit(data)
  }
}
