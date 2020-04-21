import { SelfEvaluationUpdateService } from './../self-evaluation-update-service';
import { AuthenticationService } from './../../../core/services/auth.service';
import { ApiUrl } from './../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../core/services/config.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'self-evaluation-audit-quest-grid',
    template: `
    <div class="grid--name--column checkbox" *ngIf="params.data.questCategory == 'M'">    
        <mat-checkbox
        [disabled]="true"
        (click)="$event.stopPropagation()"
       
        *ngFor="let evalEventQuest of params.data.evalEventQuestList"
        [checked]="isChecked(evalEventQuest.id)"
            class="example-margin">{{evalEventQuest.itemName}}</mat-checkbox>
    </div>

    <div class="grid--name--column" *ngIf="params.data.questCategory == 'S'"> 
        <mat-radio-group 
        [disabled]="true"
            [(ngModel)]="params.data.evalEventQuest.itemIdsAudit"
        >
            <mat-radio-button class="single--radio--btn" 
            (click)="$event.stopPropagation()"
            [value]="evalEventQuest.id"
          
            *ngFor="let evalEventQuest of params.data.evalEventQuestList"
            >
            {{evalEventQuest.itemName}}</mat-radio-button>
                       
        </mat-radio-group>
    </div>

    `
})
export class selfEvaluationAuditQuestComponent implements ICellRendererAngularComp {
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
   

    public isChecked(id){
        let itemIdsAudit = this.params.data.evalEventQuest.itemIdsAudit || ''
        if (itemIdsAudit.indexOf(id) >= 0){
            return true 
        }
        return false 
    }

    public delet() {
        this.params.context.componentParent.delete(this.params.data)
    }

    refresh(): boolean {
        return false;
    }

}
