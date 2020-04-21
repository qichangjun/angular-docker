import { SelfEvaluationUpdateService } from './../self-evaluation-update-service';
import { AuthenticationService } from './../../../core/services/auth.service';
import { ApiUrl } from './../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../core/services/config.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'self-evaluation-info-reamrks-grid',
    template: `
    <div class="grid--name--column textarea--column">      
         <textarea (click)="$event.stopPropagation()" class="form-control" 
         placeholder="{{(params.data.sts == 0 || params.data.sts == 3) ? '点此编辑' : ''}}"
         [disabled]="params.data.sts != 0 && params.data.sts != 3" [(ngModel)]="params.data.evalEventQuest.remarksUnit"  rows="3"></textarea>
    </div>
    `
})
export class selfEvaluationInfoRemarksComponent implements ICellRendererAngularComp {
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
        this.params.data.evalEventQuest.remarksUnit = e.value
        try{
            await this._SelfEvaluationUpdateService.updateEvalEventQuest(this.params.data.evalEventQuest)
        }catch(err){
            this.params.context.componentParent.getList()
        }
    }

  

    refresh(): boolean {
        return false;
    }

}
