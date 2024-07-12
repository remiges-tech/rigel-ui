import { Component, inject } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { SchemaService } from 'src/services/schema.service';
import { CONSTANTS } from 'src/services/constants.service';
import {
  ConfigDetails,
  ConfigList,
  Field,
  SchemaDetails,
  SchemaList,
} from 'src/interfaces/common-interfaces';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  ConfigDetailResp,
  ConfigListResp,
  SchemaDetailResp,
  SchemaListResp,
} from 'src/interfaces/response-interfaces';
import {
  configListmodel,
  schemaDetailsModel,
  schemaListModel,
} from 'src/models/data.model';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss'],
})
export class SchemaComponent {
  fileName: string = 'SchemaComponent';
  private _schemaService = inject(SchemaService);
  public _commonService = inject(CommonService);
  private _toastr = inject(ToastrService);
  schemasList?: SchemaList[];
  appList?: string[];
  moduleList?: string[];
  configList?: string[];
  selectedData: any = {
    app: null,
    module: null,
    ver: null,
    config: null,
  };
  configValues: any = {};
  schemaDetails?: ConfigDetails;

  ngOnInit() {
    this.getSchemaList();
  }

  // get the list of schemas
  // from that schema list filter out the app's list
  getSchemaList() {
    try {
      this._commonService.showLoader();
      this._schemaService.getSchemaList().subscribe(
        (res: SchemaListResp) => {
          this._commonService.hideLoader();
          if (res.status == CONSTANTS.SUCCESS) {
            let valid = this._commonService.checkValidJsonSchema(
              res,
              schemaListModel
            );

            if (valid) {
              this.schemasList = res.data;
              this.appList = this._commonService.getAppNamesFromList(res.data);
            }
          }
        },
        (err: any) => {
          this._toastr.error(err, CONSTANTS.ERROR);
        }
      );
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaList',
        err: error,
      });
    }
  }

  // from this schema list filter's out the module's for selected schema
  getModuleList() {
    this.clearCache();
    if (this.schemasList && this.selectedData.app) {
      this.selectedData.module = null;
      this.moduleList = this._commonService.getModuleNamesForSelectedApp(
        this.schemasList,
        this.selectedData.app
      );
    }
  }

  handleAppChange() {
    if (!this.selectedData.app) {
      this.clearAllFields();
    } else {
      this.getModuleList();
    }
  }

  // Clear all fields when app is deselected
  clearAllFields() {
    this.selectedData = {
      app: null,
      module: null,
      ver: null,
      config: null,
    };
    this.moduleList = undefined;
    this.configList = undefined;
    this.schemaDetails = undefined;
  }

  // get the schema details for the selected schema(app and module)
  getSchemaDetails() {
    this.selectedData.ver = null;
    this.selectedData.config = null;
    this.configList = undefined;
    this.schemaDetails = undefined;
    if (
      !this.schemasList ||
      !this.selectedData.app ||
      !this.selectedData.module
    ) {
      return;
    }
    this.selectedData.ver = this._commonService.getVersionForSelectedSchemaData(
      this.schemasList,
      this.selectedData.app,
      this.selectedData.module
    );
    try {
      this.getConfigList();
      let data = {
        params: new HttpParams()
          .append('app', this.selectedData.app)
          .append('module', this.selectedData.module)
          .append('ver', this.selectedData.ver),
      };
      this._commonService.showLoader();
      this._schemaService.getSchemaDetail(data).subscribe(
        (res: SchemaDetailResp) => {
          this._commonService.hideLoader();
          if (res.status == CONSTANTS.SUCCESS) {
            let valid = this._commonService.checkValidJsonSchema(
              res.data,
              schemaDetailsModel
            );
            if (valid) {
              this.restructureAndUpdateSchemaDetails(res.data);
            }
          } else {
            this.restructureAndUpdateSchemaDetails(res.data);
            this._toastr.error(res.message, CONSTANTS.ERROR);
          }
        },
        (err: any) => {
          this._toastr.error(err, CONSTANTS.ERROR);
        }
      );
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaDetails',
        err: error,
      });
    }
  }

  // Gets the lists of config for selected schema(app and module)
  getConfigList() {
    try {
      let data = {
        params: new HttpParams()
          .append('app', this.selectedData.app)
          .append('module', this.selectedData.module)
          .append('ver', this.selectedData.ver),
      };
      this._commonService.showLoader();
      this._schemaService.getConfigList(data).subscribe(
        (res: ConfigListResp) => {
          this._commonService.hideLoader();
          if (res.status == CONSTANTS.SUCCESS) {
            let valid = this._commonService.checkValidJsonSchema(
              res.data,
              configListmodel
            );
            if (valid) {
              if (res.data.configurations) {
                this.configList = [
                  ...res.data.configurations.map(
                    (config: ConfigList) => config.config
                  ),
                ];
              }
            }
          }
        },
        (err: any) => {
          this._toastr.error(err, CONSTANTS.ERROR);
        }
      );
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getConfigList',
        err: error,
      });
    }
  }

  // get's the details and values of selected config
  getConfigDetail() {
    if (
      !this.selectedData.app ||
      !this.selectedData.module ||
      !this.selectedData.ver ||
      !this.selectedData.config
    ) {
      this.getSchemaDetails();
      return;
    }
    try {
      let data = {
        params: new HttpParams()
          .append('app', this.selectedData.app)
          .append('module', this.selectedData.module)
          .append('ver', this.selectedData.ver)
          .append('config', this.selectedData.config),
      };
      this._commonService.showLoader();
      this._schemaService.getConfigDetail(data).subscribe(
        (res: ConfigDetailResp) => {
          this._commonService.hideLoader();
          if (res.status == CONSTANTS.SUCCESS) {
            // this.isShowConfigValues = true;
            if (res.data.values && res.data.config) {
              // console.log(res.data.values);
              this.configValues = this.getCurrentValues(res.data.values);
              this.setValuesOfSelectedConfigName(
                res.data.values,
                res.data.config
              );
            }
          } else {
            this._toastr.error(res.message, CONSTANTS.ERROR);
          }
        },
        (err: any) => {
          this._toastr.error(err, CONSTANTS.ERROR);
        }
      );
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaDetails',
        err: error,
      });
    }
  }

  // get's data in type of schemaDetails
  // restructure it in type of configDetails
  // schemaDetails 'fields' replaced by configDetails 'values'
  restructureAndUpdateSchemaDetails(response: SchemaDetails) {
    const modifiedData: ConfigDetails = {
      ...response,
      values: response.fields,
    };
    this.schemaDetails = modifiedData;
  }

  // update the schemaDetails values and config name
  // find the field name and set its value received from configDetails
  setValuesOfSelectedConfigName(values: Field[], config: string) {
    if (this.schemaDetails && values) {
      this.schemaDetails.config = config;
      this.schemaDetails.values = this.schemaDetails?.values.map(
        (schemaValues: Field) => {
          const resultingValues = values.find(
            (configValues: Field) => configValues.name === schemaValues.name
          );

          return resultingValues
            ? { ...schemaValues, value: resultingValues.value }
            : schemaValues;
        }
      );
    }
  }

  getCurrentValues(values: Field[]) {
    let structuredValues: any = {};
    values.forEach((value: Field) => {
      structuredValues[value.name] = value.value;
    });

    return structuredValues;
  }

  // reset the selected values on clear of moduleName
  clearCache() {
    this.moduleList = undefined;
    this.selectedData.ver = null;
    this.configList = undefined;
    this.schemaDetails = undefined;
  }
}
