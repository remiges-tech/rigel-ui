import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent {
  configForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,){}

  ngOnInit(){
    this.configForm = this.formBuilder.group({
      schemaName: [
        '', 
      [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z.]+(?: [a-zA-Z]+)*$/),
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
    ],
    configName: [
      '', 
    [
      Validators.required, 
      Validators.pattern(/^[a-zA-Z.]+(?: [a-zA-Z]+)*$/),
      Validators.minLength(3),
      Validators.maxLength(20),
    ],
  ],
      description: ['', Validators.required],
      values: this.formBuilder.array([]),
    })
  }

  addField() {
    const fieldGroup = this.formBuilder.group({
      fname: ['', Validators.required], 
      type: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.values.push(fieldGroup);
  }

  removeField(index: number) {
    this.values.removeAt(index);
  }

  // Getter for FormArray
  get values() {
    return this.configForm.get('values') as FormArray;
  }
}
