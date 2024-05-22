import { Injectable, inject } from "@angular/core";
import { SchemaList } from "src/interfaces/common-interfaces";
import { Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import AJV from 'ajv';
import { ToastrService } from "ngx-toastr";
const ajv = new AJV({allErrors: true});

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    private production: boolean = environment.production;
    subject = new Subject<any>();
    private _toastr = inject(ToastrService);

    log(value: any, type?: string) {
        if (!this.production) {
            if (type === 'error')
                console.error(value);
            else if (type === 'warn')
                console.warn(value);
            else
                console.log(value);
        }
    }

    getAppNamesFromList(list: SchemaList[]): any[] {
        return [...new Set(list.map((item: SchemaList) => item.app))];
    }

    getModuleNamesForSelectedApp(list: SchemaList[], app: string): any[] {
        const data = list.filter((item: SchemaList) => item.app.toUpperCase() == app.toUpperCase()) ?? null
        return [...data.map((item: SchemaList) => item.module)];
    }

    getVersionForSelectedSchemaData(list: SchemaList[], app: string, module: string) {
        const data = list.filter((item: SchemaList) => item.app.toUpperCase() == app.toUpperCase() && item.module.toUpperCase() == module.toUpperCase()) ?? null;
        return [...data.map((item: SchemaList) => item.ver)];
    }

    // JSON schema validation code to compare and match API response with model.
    checkValidJsonSchema(data: any, model: any): boolean {
        let errorStr:string[]=[];

        if (data == null || data.length == 0 || data == undefined) {
            this._toastr.error('Data is empty.','ERROR');
            return false;
        }
    
        for (let key in model) {
            if (model[key].isRequired) {
                if (!data.hasOwnProperty(key)) {
                    errorStr.push(`Data must have required property '${key}'.`);
                }
                else if (model[key].type === 'object') {
                    return this.checkValidJsonSchema(data[key], model[key].nestedData);
                }else if (model[key].type === 'array') {
                    if (!Array.isArray(data[key])) {
                        errorStr.push(`Required field '${key}' is not an array`);
                    }else{
                        let valid = true;
                        data[key].forEach((subData: any) => {
                            if (!this.checkValidJsonSchema(subData, model[key].nestedData)){
                                valid = false;
                            }
                        });
                        return valid;
                    }
                }else {
                    if (typeof data[key] !== model[key].type) {
                        errorStr.push(`Data property '${key}' must be '${model[key].type}' but got '${typeof data[key]}'`);
                    }else if (model[key].type !== 'array' && !data[key]) {
                        errorStr.push(`Data property '${key}' has empty data`);
                    }
                }
            }
        }

        // Display error msg on the screen.
        if(errorStr.length > 0) {
            errorStr.forEach((msg:string) => {
                this._toastr.error(msg,'ERROR');
            })
            return false;
        }

        return true;
    }

    // AJV method to check and compare API data with schema.
    checkValidJson(data:any,schema:any){
        const validate = ajv.compile(schema)
        let valid = validate(data);
        if(!valid){
            let errMsg = ajv.errorsText(validate.errors).split(',')
            errMsg.forEach((err:string) => {
                this._toastr.error(err,'ERROR')
            })
        }
    }
    
}