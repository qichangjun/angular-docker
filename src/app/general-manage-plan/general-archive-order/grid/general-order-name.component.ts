
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { ThemePalette } from '@angular/material'
@Component({
    selector: 'general-order-name-grid',
    template: `
    <div class="grid--name--column progress-bar---box" > 
        <a routerLink="/workspace/generalManagePlan/generalArchiveAudit" [queryParams]="{unitId:params.data.unitInfo.id,cooperationGroupId:'ba91884d-575c-40de-ab4b-ad328703268b'}"> {{params.data.unitInfo.name}}</a>
       
        
    </div>

    `
})
export class generalOrderNameComponent implements ICellRendererAngularComp {
    public params: any;
   
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
