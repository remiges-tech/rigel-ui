import { Injectable } from "@angular/core";
import { SchemaList } from "src/interfaces/common-interfaces";
import { Subject, throwError, throwIfEmpty } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    private production: boolean = environment.production;
    subject = new Subject<any>();

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

    // 
    compareWithInterfaceModel(data: any, model: any): string | null {
        if (data == null) {
            return `Data is empty`;
        }
    
        for (let key in model) {
            if (model[key].isRequired) {
                if (!data.hasOwnProperty(key)) {
                    return `Required field '${key}' not there in response`;
                }

                if (model[key].type === 'object') {
                    const nestedResponse = this.compareWithInterfaceModel(data[key], model[key].nestedData);
                    if (nestedResponse) {
                        return nestedResponse;
                    }
                } else if (model[key].type === 'array') {
                    if (!Array.isArray(data[key])) {
                        return `Required field '${key}' is not an array`;
                    }

                    let errorMsg: string[] = [];
                    data[key].forEach((subData: any) => {
                        const resp = this.compareWithInterfaceModel(subData, model[key].nestedData);
                        if (resp) {
                            errorMsg.push(resp);
                        }
                    });

                    if (errorMsg.length > 0) {
                        return errorMsg.join('||join||');
                    }
                } else {
                    if (typeof data[key] !== model[key].type) {
                        return `Required field '${key}' type mismatched: expected '${model[key].type}' but got '${typeof data[key]}'`;
                    }

                    if (model[key].type !== 'array' && !data[key]) {
                        return `Required field '${key}' has empty data`;
                    }
                }
            }
        }
        return null;
    }
    
}