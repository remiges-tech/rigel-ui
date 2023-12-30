import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import { SchemaService } from 'src/services/schema.service';
import { CONSTANTS } from 'src/services/constants.service';
import { SchemaDetails, SchemaList } from 'src/models/common-interfaces';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent {
  fileName: string = 'SchemaComponent';
  _schemaService = inject(SchemaService)
  form: FormGroup;
  schemasList?:SchemaList[];
  appList?: string[];
  moduleList?: string[];
  configList?:string[];
  selectedData:any = {
    appName: null,
    ModuleName: null,
    version:null
  }
  isShowConfigValues:boolean = false;
  schemaDetails?: SchemaDetails 

  constructor(private fb: FormBuilder, private _commonService: CommonService) {
    this.form = this.fb.group({
      app: [null, Validators.required],
      module: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.getSchemaList();
  }


  getSchemaList() {
    try {
      this._schemaService.getSchemaList().subscribe((res: any) => {
        if(res?.status == CONSTANTS.SUCCESS){
          this.schemasList = res?.response?.schemas;
          this.appList = this._commonService.getAppNamesFromList(res?.response?.schemas);
        }
      })
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaList',
        err:error
      })
    }
  }

  getModuleList(){
    if(this.schemasList && this.selectedData.appName){
      this.moduleList = this._commonService.getModuleNamesForSelectedApp(this.schemasList!,this.selectedData.appName)
    }else{
      this.moduleList = undefined;
      this.selectedData.version = null
      this.configList = undefined;
      this.schemaDetails = undefined;
      
    }
  }

  getSchemaDetails(){
    if(!this.schemasList || !this.selectedData.appName || !this.selectedData.moduleName){
      this.selectedData.version = null
      this.configList = undefined;
      this.schemaDetails = undefined;
      return;
    }
    this.selectedData.version = this._commonService.getVersionForSelectedSchemaData(this.schemasList!, this.selectedData.appName, this.selectedData.moduleName)
    try {
      this.getConfigList();
      let data = {
        params: new HttpParams().append('app',this.selectedData.appName).append('module', this.selectedData.moduleName).append('version',this.selectedData.version)
      }
      this._schemaService.getSchemaDetail(data).subscribe((res:any) => {
        if(res.status == CONSTANTS.SUCCESS){
          this.setDetails(res?.response);
        }
        console.log(res);
      })
    } catch (error) {
      this._commonService.log({
        fileName:this.fileName,
        functionName: 'getSchemaDetails',
        err:error
      })
    }
  }

  getConfigList(){
    let data = {
      params: new HttpParams().append('appName',this.selectedData.appName).append('moduleName', this.selectedData.moduleName).append('versionNumber',this.selectedData.version)
    }
    this._schemaService.getConfigList(data).subscribe((res:any) => {
      if(res.status == CONSTANTS.SUCCESS){
        this.configList = [...res?.response?.configurations.map((config:any) => config.configName)]
      }
    }) 
  }

  getConfigDetail(){
    if( !this.selectedData.appName || !this.selectedData.moduleName || !this.selectedData.version || !this.selectedData.configName){
      this.isShowConfigValues = false;
      return;
    }
    try {
      let data = {
        params: new HttpParams().append('appName',this.selectedData.appName).append('moduleName', this.selectedData.moduleName).append('versionNumber',this.selectedData.version).append('configName',this.selectedData.configName)
      }
      this._schemaService.getConfigDetail(data).subscribe((res:any) => {
        if(res.status == CONSTANTS.SUCCESS){
          this.isShowConfigValues = true;
          this.setDetails(res?.response);
        }
      })
    } catch (error) {
      this._commonService.log({
        fileName:this.fileName,
        functionName: 'getSchemaDetails',
        err:error
      })
    }
  }

  setDetails(response:SchemaDetails){
    this.schemaDetails = response
  }

}
