import { Component, Input, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigDetails, Field, SchemaDetails } from 'src/models/common-interfaces';
import { CONSTANTS } from 'src/services/constants.service';
import { SchemaService } from 'src/services/schema.service';

@Component({
  selector: 'app-fieldslist',
  templateUrl: './fieldslist.component.html',
  styleUrls: ['./fieldslist.component.scss']
})
export class FieldslistComponent {
  fileName:string = 'FieldslistComponent';
  private _schemaService = inject(SchemaService)
  private _toastr = inject(ToastrService)
  @Input({required:true}) isShowValues: boolean = false;
  @Input({required: true}) schemaData!: ConfigDetails;

  updateConfig(data: Field, index: number) {
    this.schemaData.values[index] = data;
    const modifiedObject = {
        app: this.schemaData.app,
        module: this.schemaData.module,
        ver: this.schemaData.ver,
        config: this.schemaData.config,
        key: data.name,
        value: data.value
    };

    try{
      this._schemaService.updateConfigDetails(modifiedObject).subscribe((res:any) => {
        this._toastr.success(`"${data.name}" `+res?.message, CONSTANTS.SUCCESS)
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
