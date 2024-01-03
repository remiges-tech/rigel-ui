import { Component, inject } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { SchemaService } from 'src/services/schema.service';
import { CONSTANTS } from 'src/services/constants.service';
import { ConfigDetails, Field, SchemaDetails, SchemaList } from 'src/models/common-interfaces';
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
  schemaDetails?: ConfigDetails

  ngOnInit() {
    this.getSchemaList();
  }

  // get the list of schemas
  // from that schema list filter out the app's list
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

  // from this schema list filter's out the module's for selected schema
  getModuleList() {
    this.clearCache();
    if (this.schemasList && this.selectedData.appName) {
      this.selectedData.moduleName = null
      this.moduleList = this._commonService.getModuleNamesForSelectedApp(this.schemasList, this.selectedData.appName)
    }
  }

  // get the schema details for the selected schema(appName and ModuleName)
  getSchemaDetails() {
    this.isShowConfigValues = false;
    this.selectedData.version = null;
    this.selectedData.configName = null;
    this.configList = undefined;
    this.schemaDetails = undefined;
    if (!this.schemasList || !this.selectedData.appName || !this.selectedData.moduleName) {
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
          this.restructureAndUpdateSchemaDetails(res?.response);
        } else {
          this.restructureAndUpdateSchemaDetails(res?.response);
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

  // Gets the lists of config for selected schema(appName and ModuleName)
  getConfigList() {
    let data = {
      params: new HttpParams().append('appName', this.selectedData.appName).append('moduleName', this.selectedData.moduleName).append('versionNumber', this.selectedData.version)
    }
    this._schemaService.getConfigList(data).subscribe((res: any) => {
      if (res.status == CONSTANTS.SUCCESS) {
        if (res?.response?.configurations) {
          this.configList = [...res?.response?.configurations.map((config: any) => config.configName)]
        }
      }
    })
  }

  // get's the details and values of selected configName
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
            this.setValuesOfSelectedConfigName(res?.response?.values, res?.response?.configName)
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

  // get's data in type of schemaDetails
  // restructure it in type of configDetails
  // schemaDetails 'fields' replaced by configDetails 'values'
  restructureAndUpdateSchemaDetails(response: SchemaDetails) {
    const modifiedData: ConfigDetails = { ...response, values: response.fields };
    this.schemaDetails = modifiedData;
  }

  // update the schemaDetails values and config name
  // find the field name and set its value received from configDetails
  setValuesOfSelectedConfigName(values: Field[], configName: string) {
    if (this.schemaDetails && values) {
      this.schemaDetails.configName = configName;
      this.schemaDetails.values = this.schemaDetails?.values.map((schemaValues: Field) => {
        const resultingValues = values.find((configValues: Field) => configValues.name === schemaValues.name);

        return resultingValues ? { ...schemaValues, value: resultingValues.value } : schemaValues;
      });
    }
  }

  // reset the selected values on clear of moduleName
  clearCache() {
    this.moduleList = undefined;
    this.selectedData.version = null
    this.configList = undefined;
    this.schemaDetails = undefined;
  }

}
