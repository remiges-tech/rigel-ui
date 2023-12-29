import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import { SchemaService } from 'src/services/schema.service';


@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent  {
  form: FormGroup;
  appList!: string[];

  _schemaService = inject(SchemaService)
  constructor(private fb: FormBuilder, private _commonService: CommonService){
    this.form = this.fb.group({
      app: [null, Validators.required],
      module: [null, Validators.required],
    })
  }

  ngOnInit(){
  this.getAppNames();
  }


  getAppNames(){
    this._schemaService.getSchemaList().subscribe((res: any)=>{
    console.log(res);
    })
  }
}
