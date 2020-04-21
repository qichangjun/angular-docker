
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'self-evaluation-info-reamrks-grid',
    template: `
    <div class="grid--name--column textarea--column">      
         <textarea (click)="$event.stopPropagation()" class="form-control"
         placeholder="{{params.data.sts == 1 ? '点此编辑' : ''}}"
          [disabled]="params.data.sts != 1" [(ngModel)]="params.data.evalEventQuest.remarksAudit"  rows="3"></textarea>
    </div>
    `
})
export class symbolInfoAuditRemarksComponent implements ICellRendererAngularComp {
    public params: any;
    uploader
    constructor(

    ){

    }
    agInit(params: any): void {
        this.params = params;
     
    }

    refresh(): boolean {
        return false;
    }

}
