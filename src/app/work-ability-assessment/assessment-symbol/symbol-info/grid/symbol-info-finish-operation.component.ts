
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { style } from '@angular/animations';
@Component({
    selector: 'self-evaluation-info-finish-operation-grid',
    template: `
    <div class="grid--name--column option--btn--box" > 
        

         <button mat-flat-button color="primary"  class="danger--btn two--btn"  
         
          type="button" (click)="finishReSelfEvaluation()">重新评定</button>


          <button mat-flat-button color="primary"  class="two--btn accent--btn"
         
          type="button" [disabled]="!params.data.evalEventQuest.remarksUnit" (click)="checkSelfEvaluationInfo()">查看自评说明</button>


          <button mat-flat-button color="primary"  class="accent--btn"
         
          type="button" [disabled]="!params.data.evalEventQuest.remarksAudit" (click)="checkAuditInfo()">查看评定说明</button>
    </div>

    `,    
})
export class symbolInfoFinishOperationComponent implements ICellRendererAngularComp {
    public params: any;
    uploader
    constructor(

    ){

    }
    agInit(params: any): void {
        this.params = params;        
    }

    public finishReSelfEvaluation(){   
        console.log(this.params.data)      
        this.params.context.componentParent.finishReSelfEvaluation(this.params.data,this.params)
    }

    public checkSelfEvaluationInfo() {
        this.params.context.componentParent.checkSelfEvaluationInfo(this.params)
    }

    public checkAuditInfo(){
        this.params.context.componentParent.checkAuditInfo(this.params)
    }

    refresh(): boolean {
        return false;
    }

}
