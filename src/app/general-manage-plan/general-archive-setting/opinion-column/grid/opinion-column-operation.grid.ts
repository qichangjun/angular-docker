


import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
@Component({
    selector: 'opinion-column-grid-operation',
    template: `
    <span class="grid--name--column">    
        <span class="option--box" (click)="edit()" title="编辑">
            <i class="ti-pencil-alt" aria-hidden="true"></i>
        </span>
        <span class="option--box" (click)="delet()" title="删除">
            <i class="ti-trash" aria-hidden="true"></i>
        </span>

    </span>

    `
})
export class opinionColumnOperationComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public delet() {
        this.params.context.componentParent.delete(this.params.data)
    }

    public edit() {
        this.params.context.componentParent.edit(this.params.data)
    }

    refresh(): boolean {
        return false;
    }

}
