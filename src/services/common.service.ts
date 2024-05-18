import { Injectable } from "@angular/core";
import { SchemaList } from "src/models/common-interfaces";
import { Subject } from 'rxjs';
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

    getAppNamesFromList(list:SchemaList[]):any[]{
        return [...new Set(list.map((item:SchemaList) => item.app))];
    }

    getModuleNamesForSelectedApp(list:SchemaList[],app:string):any[]{
        const data = list.filter((item:SchemaList) => item.app.toUpperCase() == app.toUpperCase()) ?? null
        return [...data.map((item:SchemaList) => item.module)];
    }

    getVersionForSelectedSchemaData(list:SchemaList[],app:string, module:string){
        const data = list.filter((item:SchemaList) => item.app.toUpperCase() == app.toUpperCase() && item.module.toUpperCase() == module.toUpperCase()) ?? null;
        return [...data.map((item:SchemaList) => item.ver)];
    }
}