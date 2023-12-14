import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "./common.service";

@Injectable({
    providedIn: 'root',
})

export class HttpService {
    private baseUrl = 'http://localhost:3000/'
    constructor(private _httpClient: HttpClient, private _commonService: CommonService) { }

    fetchData(dataObj: any): Observable<any> {
        let url = dataObj.api_url;
        let data = dataObj.param_data;
        switch (true) {
            case dataObj.method == 'post':
                this._commonService.log(data);
                return this._httpClient.post<any>(this.baseUrl + url, data);
            case dataObj.method == 'get':
                return this._httpClient.get<any>(this.baseUrl + url, data);
            default:
                return this._httpClient.post<any>(url, data);
        }
    }

}