import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Field } from 'src/interfaces/common-interfaces';
import { CONSTANTS } from 'src/services/constants.service';
import { checkValueType } from 'src/utils/customValidator';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss'],
})
export class InputFieldsComponent {
  @Input({ required: true }) fieldDetail!: Field;
  @Output() UpdateValues = new EventEmitter<{
    data: Field;
    isEscClicked: boolean;
  }>();
  @Input({ required: true }) value!: string;
  error: string | null = null;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.key == 'Escape') {
      this.UpdateValues.emit({ data: this.fieldDetail, isEscClicked: true });
    } else if (event.key == 'Enter') {
      this.updateChanges(this.fieldDetail);
    }
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.cursorFocus();
  }

  //Validation and updation of values
  updateChanges(data: Field) {
    let verification = checkValueType(data.type, this.value!, data.constraints);
    if (verification?.status === 'INVALID') {
      this.error = verification.msg;
      this.value = '';
      return;
    }
    this.error = null;
    const UpdatedData = { ...data, value: this.value };
    this.UpdateValues.emit({ data: UpdatedData, isEscClicked: false });
  }

  //cursorFocs function called when clicked on edit icon
  cursorFocus() {
    setTimeout(() => {
      const inputElement = this.el.nativeElement.querySelector(
        `#${this.fieldDetail?.name}-input`
      );
      if (inputElement) {
        this.renderer.selectRootElement(inputElement).focus();
      }
    }, 50);
  }

  //value restricted to 2 digits after decimal point for float datatype
  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    } else if (input.length > CONSTANTS.MAX_INPUT_LENGTH) {
      event.preventDefault();
    }
  }
}
