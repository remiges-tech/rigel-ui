import { Component, Input, inject } from '@angular/core';
import { Field, SchemaDetails } from 'src/models/common-interfaces';
import { SchemaService } from 'src/services/schema.service';

@Component({
  selector: 'app-fieldslist',
  templateUrl: './fieldslist.component.html',
  styleUrls: ['./fieldslist.component.scss']
})
export class FieldslistComponent {
  fileName:string = 'FieldslistComponent';
  private _schemaService = inject(SchemaService)
  @Input({required:true}) isShowValues: boolean = false;
  @Input({required: true}) schemaData!: SchemaDetails;

  updateConfig(data: Field, index: number) {
    this.schemaData.values[index] = data;
    const modifiedObject = {
      ...this.schemaData,
      values: this.schemaData.values.map(({ name, value }) => ({ name, value })),
    };

    try{
      this._schemaService.updateConfigDetails(modifiedObject).subscribe((res:any) => {
        console.log(res)
      })
    }catch(err){
      this._schemaService._commonService.log({
        fileName: this.fileName,
        functionName: 'updateConfig',
        err
      })
    }
  }
}
