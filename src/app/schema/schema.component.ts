import { Component, inject } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { SchemaService } from 'src/services/schema.service';
import { CONSTANTS } from 'src/services/constants.service';
import { Field, SchemaDetails, SchemaList } from 'src/models/common-interfaces';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent {
  fileName: string = 'SchemaComponent';
  private _schemaService = inject(SchemaService);
  private _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  schemasList?: SchemaList[];
  appList?: string[];
  moduleList?: string[];
  configList?: string[];
  selectedData: any = {
    appName: null,
    ModuleName: null,
    version: null,
    configName: null,
  }
  isShowConfigValues: boolean = false;
  schemaDetails?: SchemaDetails

  ngOnInit() {
    this.getSchemaList();
  }


  getSchemaList() {
    try {
      this._schemaService.getSchemaList().subscribe((res: any) => {
        if (res?.status == CONSTANTS.SUCCESS) {
          this.schemasList = res?.response?.schemas;
          this.appList = this._commonService.getAppNamesFromList(res?.response?.schemas);
        }
      })
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaList',
        err: error
      })
    }
  }

  getModuleList() {
    this.resetValues();
    if (this.schemasList && this.selectedData.appName) {
      this.selectedData.moduleName = null
      this.moduleList = this._commonService.getModuleNamesForSelectedApp(this.schemasList, this.selectedData.appName)
    }
  }

  getSchemaDetails() {
    if (!this.schemasList || !this.selectedData.appName || !this.selectedData.moduleName) {
      this.isShowConfigValues = false;
      this.selectedData.version = null;
      this.selectedData.configName = null;
      this.configList = undefined;
      this.schemaDetails = undefined;
      return;
    }
    this.selectedData.version = this._commonService.getVersionForSelectedSchemaData(this.schemasList, this.selectedData.appName, this.selectedData.moduleName)
    try {
      this.getConfigList();
      let data = {
        params: new HttpParams().append('app', this.selectedData.appName).append('module', this.selectedData.moduleName).append('version', this.selectedData.version)
      }
      this._schemaService.getSchemaDetail(data).subscribe((res: any) => {
        if (res.status == CONSTANTS.SUCCESS) {
          this.setDetails(res?.response);
        } else {
          this.setDetails(res?.response);
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      })
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaDetails',
        err: error
      })
    }
  }

  getConfigList() {
    let data = {
      params: new HttpParams().append('appName', this.selectedData.appName).append('moduleName', this.selectedData.moduleName).append('versionNumber', this.selectedData.version)
    }
    this._schemaService.getConfigList(data).subscribe((res: any) => {
      if (res.status == CONSTANTS.SUCCESS) {
        if (res?.response?.configurations) {
          this.configList = [...res?.response?.configurations.map((config: any) => config.configName)]
        } else {
          //toast here
        }
      }
    })
  }

  getConfigDetail() {
    if (!this.selectedData.appName || !this.selectedData.moduleName || !this.selectedData.version || !this.selectedData.configName) {
      this.isShowConfigValues = false;
      this.getSchemaDetails();
      return;
    }
    try {
      let data = {
        params: new HttpParams().append('appName', this.selectedData.appName).append('moduleName', this.selectedData.moduleName).append('versionNumber', this.selectedData.version).append('configName', this.selectedData.configName)
      }
      this._schemaService.getConfigDetail(data).subscribe((res: any) => {
        if (res.status == CONSTANTS.SUCCESS) {
          this.isShowConfigValues = true;
          if (res?.response) {
            this.updateValues(res?.response?.values, res?.response?.configName)
          }
        } else {
          this.isShowConfigValues = false;
          this._toastr.error(res?.message, CONSTANTS.ERROR);
        }
      })
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaDetails',
        err: error
      })
    }
  }

  setDetails(response: SchemaDetails) {
    this.schemaDetails = response
  }

  updateValues(values: Field[], configName: string) {
    if (this.schemaDetails && values) {
      this.schemaDetails.configName = configName;
      this.schemaDetails.values = this.schemaDetails?.values.map((schemaValues: Field) => {
        const matchingObj = values.find((configValues: Field) => configValues.name === schemaValues.name);

        return matchingObj ? { ...schemaValues, value: matchingObj.value } : schemaValues;
      });
    }
  }

  resetValues() {
    this.moduleList = undefined;
    this.selectedData.version = null
    this.configList = undefined;
    this.schemaDetails = undefined;
  }

}
