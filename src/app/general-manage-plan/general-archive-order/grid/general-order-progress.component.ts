
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { ThemePalette } from '@angular/material'
@Component({
    selector: 'general-order-progress-grid',
    template: `
    <div class="grid--name--column progress-bar---box" > 
    {{params.value}}
        <mat-progress-bar [color]="color" mode="determinate" value="{{rate}}"></mat-progress-bar>
       
    </div>

    `
})
export class generalOrderProgressComponent implements ICellRendererAngularComp {
    public params: any;
    public rate : any = 0
    public color : any = 'primary'
    constructor(
       
    ){

    }
    agInit(params: any): void {
        this.params = params;
        this.rate = (this.params.value/100)*100
        if (this.params.colDef.field == 'questScoreSum'){
            this.color = 'primary'
        }else if (this.params.colDef.field == 'presScoreSum'){
            this.color = 'warn'
        }else{
            this.color = 'accent'
        }
    }

    refresh(): boolean {
        return false;
    }

}
