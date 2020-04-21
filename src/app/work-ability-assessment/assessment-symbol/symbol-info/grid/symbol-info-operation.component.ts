
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { style } from '@angular/animations';
@Component({
    selector: 'self-evaluation-info-operation-grid',
    template: `
    <div class="grid--name--column" > 
        <button mat-flat-button color="primary" class="two--btn accent--btn"
        *ngIf="params.data.sts == 1"
         type="button"  (click)="agreeSelfEvaluation()">同意自评</button>

         <button mat-flat-button color="primary"  class="danger--btn"
         *ngIf="params.data.sts == 1"
          type="button" (click)="disagreeSelfEvaluation()">重新评定</button>
    </div>

    `,    
})
export class symbolInfoOperationComponent implements ICellRendererAngularComp {
    public params: any;
    uploader
    constructor(

    ){

    }
    agInit(params: any): void {
        this.params = params;        
    }

    public agreeSelfEvaluation(){         
        this.params.context.componentParent.agreeSelfEvaluation(this.params.data,this.params)
    }

    public disagreeSelfEvaluation() {
        this.params.context.componentParent.disagreeSelfEvaluation(this.params.data,this.params)
    }

    refresh(): boolean {
        return false;
    }

}
