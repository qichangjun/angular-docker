import { SelfEvaluationUpdateService } from './../self-evaluation-update-service';
import { AuthenticationService } from './../../../core/services/auth.service';
import { ApiUrl } from './../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../core/services/config.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'self-evaluation-back-reamrks-grid',
    template: `
    <div class="grid--name--column textarea--column">      
         <textarea (click)="$event.stopPropagation()" class="form-control" 
         [disabled]="true" [(ngModel)]="params.data.evalEventQuest.remarksAudit"  rows="3"></textarea>
    </div>
    `
})
export class selfEvaluationBackRemarksComponent implements ICellRendererAngularComp {
    public params: any;
    uploader
    constructor(
        private _SelfEvaluationUpdateService : SelfEvaluationUpdateService,
        private _AuthenticationService : AuthenticationService,
        private _ConfigService : ConfigService
    ){

    }
    agInit(params: any): void {
        this.params = params;             
    }

    refresh(): boolean {
        return false;
    }

}
