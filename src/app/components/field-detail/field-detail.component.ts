import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Field } from 'src/models/common-interfaces';
import { checkValueType } from 'src/utils/customValidator';

@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.scss']
})
export class FieldDetailComponent {
  isEdit:boolean = false;
  @Input({required:true}) isShowValue:boolean=false;
  @Input({required: true}) fieldDetail!:Field;
  @Output() UpdateValues = new EventEmitter<Field>();
  value!:string;

  updateChanges(data:Field){
    this.isEdit = false;
    if(checkValueType(data.type, this.value!) === 'INVALID'){
      alert('invalid')
      return;
    };
    data.value = this.value;
    this.UpdateValues.emit(data)
  }
}
