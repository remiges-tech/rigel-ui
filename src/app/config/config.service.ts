import { Injectable } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import * as Enums from '../../services/constants.service'
import { HttpService } from 'src/services/http.service';
import { ConfigListInterface } from './config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  fileName:string = 'ConfigService';
  constructor(private _commonService:CommonService, private _httpService:HttpService) { }

  getConfigListForSchema(obj: any): any {
    try {
      let dataObj = {
        method: 'get',
        api_url: Enums.CONSTANTS.CONFIG_API,
        local_json_file: '',
        param_data: obj,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getConfigListForSchema',
        msg: resp
      });
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'getConfigListForSchema',
        msg: error
      });
    }
  }

  updateConfigData(obj: ConfigListInterface): any {
    try {
      let dataObj = {
        method: 'put',
        api_url: Enums.CONSTANTS.CONFIG_API + '/' + obj.id,
        local_json_file: '',
        param_data: obj,
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'updateConfigData',
        msg: resp
      });
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'updateConfigData',
        msg: error
      });
    }
  }

  deleteConfigData(id: any): any {
    try {
      let dataObj = {
        method: 'delete',
        api_url: Enums.CONSTANTS.CONFIG_API + '/' + id,
        local_json_file: '',
        mapcol: false,
      };
      let resp = this._httpService.fetchData(dataObj);
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'deleteConfigData',
        msg: resp
      });
      return resp;
    } catch (error) {
      this._commonService.log({
        fileName: this.fileName,
        functionName: 'deleteConfigData',
        msg: error
      });
    }
  }
}
