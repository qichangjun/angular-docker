import { SelfEvaluationUpdateService } from './../self-evaluation-update-service';
import { AuthenticationService } from './../../../core/services/auth.service';
import { ApiUrl } from './../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../core/services/config.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'self-evaluation-info-operation-grid',
    template: `
    <div class="grid--name--column" > 
        <button mat-flat-button color="primary" 
        *ngIf="params.data.sts == 0 || params.data.sts == 3"
         type="button" (click)="updateEvaluation()">保存修改</button>
    </div>

    `
})
export class selfEvaluationInfoOperationComponent implements ICellRendererAngularComp {
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

    public async updateEvaluation(){         
        try{
            await this._SelfEvaluationUpdateService.updateEvalEventQuest(this.params.data.evalEventQuest)
        }catch(err){
            this.params.context.componentParent.getList()
        }
    }

  

    public delet() {
        this.params.context.componentParent.delete(this.params.data)
    }

    refresh(): boolean {
        return false;
    }

}
