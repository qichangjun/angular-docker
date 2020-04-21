


import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { MissionManageService } from '../mission-manage.service';

@Component({
    selector: 'mission-name-grid-operation',
    template: `
    <span class="grid--name--column">    
       {{params.value}}  
       <span *ngIf="params.data.count!=0" class="prompt--count">
       {{params.data.count}}</span>
      
    </span>

    `
})
export class missionNameOperationComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(): boolean {
        return false;
    }

}
