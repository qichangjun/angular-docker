


import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
@Component({
    selector: 'symbol-item-grid-operation',
    template: `
    <span class="grid--name--column">    
        <span class="option--box" (click)="edit()" title="编辑">
            <i class="ti-pencil-alt" aria-hidden="true"></i>
        </span>
        <span class="option--box" *ngIf="params.data.type == 'kind'" (click)="deletKind()" title="删除">
            <i class="ti-trash" aria-hidden="true"></i>
        </span>
        <span class="option--box" *ngIf="params.data.type == 'item'" (click)="deleteSymbolItem()" title="删除">
            <i class="ti-trash" aria-hidden="true"></i>
        </span>
    </span>

    `
})
export class symbolItemOperationComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public deletKind() {
        this.params.context.componentParent.deleteKind(this.params.data)
    }

    public deleteSymbolItem() {
        this.params.context.componentParent.deleteSymbolItem(this.params.data)
    }

    public edit() {
        this.params.context.componentParent.edit(this.params.data)
    }

    refresh(): boolean {
        return false;
    }

}
