import { Injectable } from "@angular/core";

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
}