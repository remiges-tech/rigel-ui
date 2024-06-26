import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import * as Enums from './constants.service';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  fileName:string='SchemaService'
  _httpService = inject(HttpService);
  _commonService = inject(CommonService);
  constructor() { }

  getSchemaList(): any {
    try {
      let dataObj = {
        method: 'get',
        api_url: environment.apiUrl + Enums.CONSTANTS.SCHEMA_LIST_API,
        local_json_file: '',
        param_data: {},
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaList',
        msg: error
      });
    }
  }

  getSchemaDetail(obj:any): any {
    try {
      let dataObj = {
        method: 'get',
        api_url: environment.apiUrl +Enums.CONSTANTS.SCHEMA_GET_API,
        local_json_file: '',
        param_data: obj,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaDetail',
        msg: error
      });
    }
  }

  getConfigList(obj:any): any {
    try {
      let dataObj = {
        method: 'get',
        api_url: environment.apiUrl +Enums.CONSTANTS.CONFIG_LIST_API,
        local_json_file: '',
        param_data: obj,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getConfigList',
        msg: error
      });
    }
  }

  getConfigDetail(obj:any): any {
    try {
      let dataObj = {
        method: 'get',
        api_url: environment.apiUrl + Enums.CONSTANTS.CONFIG_GET_API,
        local_json_file: '',
        param_data: obj,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getConfigDetail',
        msg: error
      });
    }
  }

  updateConfigDetails(obj:any): any {
    try {
      let dataObj = {
        method: 'post',
        api_url: environment.apiUrl +Enums.CONSTANTS.CONFIG_SET_API,
        local_json_file: '',
        param_data: obj,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'updateConfigDetails',
        msg: error
      });
    }
  }
}
