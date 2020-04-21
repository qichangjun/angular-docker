


import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { MissionManageService } from '../mission-manage.service';

@Component({
    selector: 'mission-list-post-grid-operation',
    template: `
    <span class="grid--name--column">    
        <span  *ngIf="params.data.taskPublishPO.status == 1 || params.data.taskPublishPO.status == 2" class="fa fa-check-circle-o"></span>  
        <span  *ngIf="params.data.taskPublishPO.status == 0 || params.data.taskPublishPO.status == 3" class="fa fa-circle-o"></span>
    </span>

    `
})
export class missionListPostOperationComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }  

    refresh(): boolean {
        return false;
    }

}
