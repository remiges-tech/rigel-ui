import { Injectable } from "@angular/core";
import { SchemaList } from "src/models/common-interfaces";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    private production: boolean = false;

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

    getAppNamesFromList(list:SchemaList[]):any[]{
        return [...new Set(list.map((item:SchemaList) => item.app))];
    }

    getModuleNamesForSelectedApp(list:SchemaList[],appName:string):any[]{
        const data = list.filter((item:SchemaList) => item.app.toUpperCase() == appName.toUpperCase()) ?? null
        return [...data.map((item:SchemaList) => item.module)];
    }

    getVersionForSelectedSchemaData(list:SchemaList[],appName:string, moduleName:string){
        const data = list.filter((item:SchemaList) => item.app.toUpperCase() == appName.toUpperCase() && item.module.toUpperCase() == moduleName.toUpperCase()) ?? null;
        return [...data.map((item:SchemaList) => item.version)];
    }
}