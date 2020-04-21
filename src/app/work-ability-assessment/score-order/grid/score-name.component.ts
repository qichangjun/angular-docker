
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { ThemePalette } from '@angular/material'
@Component({
    selector: 'score-name-grid',
    template: `
    <div class="grid--name--column progress-bar---box" > 
        <a routerLink="/workspace/workAbilityAssessment/ScoreOrderDetailUnits" [queryParams]="{unitId:params.data.unitInfo.id}"> {{params.data.unitInfo.name}}</a>               
    </div>

    `
})
export class scoreNameComponent implements ICellRendererAngularComp {
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
