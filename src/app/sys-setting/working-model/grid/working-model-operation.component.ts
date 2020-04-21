


import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
@Component({
    selector: 'working-model-grid-operation',
    template: `
    <span class="grid--name--column">    
        <span class="option--box" (click)="edit()" title="编辑">
            <i class="ti-pencil-alt" aria-hidden="true"></i>
        </span>

    </span>

    `
})
export class workingModelOperationComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public edit() {
        this.params.context.componentParent.edit(this.params.data)
    }

    refresh(): boolean {
        return false;
    }

}
