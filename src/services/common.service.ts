import { EventEmitter, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";
import { ConfirmationDialog } from "src/utils/confirmation.modal";

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    private production: boolean = false;
    localInit!: EventEmitter<any>;
    subject = new Subject<any>();
    constructor(private dialog: MatDialog) {
        this.localInit = new EventEmitter<any>();
    }

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

    openConfirmationModal(obj: any) {
        return this.dialog.open(ConfirmationDialog, {
            width: '35%',
            disableClose: true,
            data: {
                messageTitle: obj?.msgTitle,
                message: obj?.msg,
                buttonText: {
                    ok: obj?.okBtn,
                    cancel: obj?.cancelBtn
                }
            },
            autoFocus: false,
        });
    }

    getChangeEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    setChangeEvent() {
        this.subject.next(0);
    }
}