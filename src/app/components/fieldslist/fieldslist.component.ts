import { Component, Input, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigDetails, Field } from 'src/interfaces/common-interfaces';
import { ConfigSetResp } from 'src/interfaces/response-interfaces';
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
  @Input({required: true}) searchText: string = '';

  updateConfig(data: Field, index: number) {
    this.schemaData.values[index] = data;
    const modifiedObject = {
      data : {
        app: this.schemaData.app,
        module: this.schemaData.module,
        ver: this.schemaData.ver,
        config: this.schemaData.config,
        key: data.name,
        value: data.value
      }
    };

    try{
      this._schemaService.updateConfigDetails(modifiedObject).subscribe((res:ConfigSetResp
      ) => {
        if(res.status == CONSTANTS.SUCCESS){
          this._toastr.success(`"${data.name}" `+res.data, CONSTANTS.SUCCESS)
        }else{
          this._toastr.success(`"${data.name}" `+res.data, CONSTANTS.ERROR)
        }
      }, (err: any) => {
        this._toastr.error(err, CONSTANTS.ERROR)
      })
    }catch(err){
      this._schemaService._commonService.log({
        fileName: this.fileName,
        functionName: 'updateConfig',
        err
      })
    }
  }

  filterData(){
    let text = this.searchText.toLowerCase();
    return this.schemaData.values.filter((value:Field) => value.name.toLowerCase().includes(text) || value.description.toLowerCase().includes(text) ||value.type.toLowerCase().includes(text))
  }
}
