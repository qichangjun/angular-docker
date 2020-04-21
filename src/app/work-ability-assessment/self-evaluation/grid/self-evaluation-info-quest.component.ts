import { SelfEvaluationUpdateService } from './../self-evaluation-update-service';
import { AuthenticationService } from './../../../core/services/auth.service';
import { ApiUrl } from './../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../core/services/config.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'self-evaluation-info-quest-grid',
    template: `
    <div class="grid--name--column checkbox" *ngIf="params.data.questCategory == 'M'">    
        <mat-checkbox
        [disabled]="params.data.sts != 0 && params.data.sts != 3"
        (click)="$event.stopPropagation()"
        (change)="changeEvaluation($event,evalEventQuest.id)"
        *ngFor="let evalEventQuest of params.data.evalEventQuestList"
        [checked]="isChecked(evalEventQuest.id)"
            class="example-margin">{{evalEventQuest.itemName}}</mat-checkbox>
    </div>

    <div class="grid--name--column radio--group" *ngIf="params.data.questCategory == 'S'"> 
        <mat-radio-group (change)="changeEvaluationSingle($event)"
        [disabled]="params.data.sts != 0 && params.data.sts != 3"
            [(ngModel)]="params.data.evalEventQuest.itemIdsUnit"
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
export class selfEvaluationInfoQuestComponent implements ICellRendererAngularComp {
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



    public async changeEvaluationSingle(e){
        this.params.data.evalEventQuest.itemIdsUnit = e.value
        // try{
        //     await this._SelfEvaluationUpdateService.updateEvalEventQuest(this.params.data.evalEventQuest)
        // }catch(err){
        //     this.params.context.componentParent.getList()
        // }
    }

    public async changeEvaluation(e,id){         
        let itemIdsUnits = this.params.data.evalEventQuest.itemIdsUnit ? this.params.data.evalEventQuest.itemIdsUnit.split(',') : []
        if (e.checked){
            itemIdsUnits.push(id)   
        } else {
            itemIdsUnits.splice(itemIdsUnits.indexOf(id),1)
        }
        this.params.data.evalEventQuest.itemIdsUnit = itemIdsUnits.join(',')  
        // try{
        //     await this._SelfEvaluationUpdateService.updateEvalEventQuest(this.params.data.evalEventQuest)
        // }catch(err){
        //     this.params.context.componentParent.getList()
        // }
    }

    public isChecked(id){
        let itemIdsUnit = this.params.data.evalEventQuest.itemIdsUnit || ''
        if (itemIdsUnit.indexOf(id) >= 0){
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
