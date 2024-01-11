import { Component, EventEmitter, Input, Output, inject, ElementRef, Renderer2 } from '@angular/core';
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

  constructor(
    private renderer: Renderer2,
    private el: ElementRef) { }

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

  cursorFocus(id: any) {
    setTimeout(()=>{
      const inputElement = this.el.nativeElement.querySelector('#'+id);
      if(inputElement){
        this.renderer.selectRootElement(inputElement).focus();
      }
    },50)
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
        event.preventDefault();
    }
  }
}


