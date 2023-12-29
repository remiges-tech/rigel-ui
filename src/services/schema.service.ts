import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import * as Enums from './constants.service';
import { CommonService } from './common.service';

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
        api_url: Enums.CONSTANTS.SCHEMA_LIST_API,
        local_json_file: '',
        param_data: {},
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaList',
        msg: resp
      });
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getSchemaList',
        msg: error
      });
    }
  }
}
