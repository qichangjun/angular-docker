


import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { MissionManageService } from '../mission-manage.service';

@Component({
    selector: 'mission-list-grid-operation',
    template: `
    <span class="grid--name--column">    
        <span (click)="updateMissionState('0')" *ngIf="params.data.finishSts == 1" class="fa fa-check-circle-o"></span>  
        <span (click)="updateMissionState('1')" *ngIf="params.data.finishSts != 1" class="fa fa-circle-o"></span>
    </span>

    `
})
export class missionListOperationComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    async updateMissionState(finishSts){
        this.params.context.componentParent.updateMissionState(this.params.data,finishSts)                    
    }

    refresh(): boolean {
        return false;
    }

}
