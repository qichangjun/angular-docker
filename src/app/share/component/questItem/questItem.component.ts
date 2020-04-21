import { SymbolLevelSettingData } from './../../../work-ability-assessment/assessment-symbol/symbol-setting/symbol-level-setting/symbol-level-setting.component';
import { SymbolLevelService } from './../../../work-ability-assessment/assessment-symbol/symbol-setting/symbol-level-setting/symbol-level-setting.service';
import { Component, forwardRef, Input,ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { AuthenticationService } from '../../../core/services/auth.service';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';
export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => questItemComponent),
    multi: true
};
@Component({
    selector: 'quest-item',
    templateUrl: './questItem.component.html',
    styleUrls: ['./questItem.component.scss'],
    providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class questItemComponent implements ControlValueAccessor {
    loading: boolean = false;
    symbolLevelLists : SymbolLevelSettingData[] = []
    @Input() _valueInfo: QuestItem[] = [];

    constructor(
        private _SymbolLevelService : SymbolLevelService,
        private _ResponseHandleService : ResponseHandleService,
        private _AuthenticationService : AuthenticationService,
    ) {
        this.getSymbolLevelLists()
    }

    async getSymbolLevelLists(){
        let res = await this._SymbolLevelService.getList({currentPage:1,pageSize:'9999'})
        this.symbolLevelLists = res.data 
    }

    get valueInfo() {
        return this._valueInfo;
    }

    set valueInfo(value: any) {
        this._valueInfo = value;
        this.propagateChange(this._valueInfo);
        this.onTouched();
    }

    propagateChange = (_: any) => { };
    onTouched = () => {};

    writeValue(value: any) {        
        if (value !== undefined) {
            this.valueInfo = value            
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
     }

    // ---------------------------

    changeOpinionClass(e,info){
        let row : any = this.symbolLevelLists.find(c=>c.id == e.value)
        if(row){
            info.score = row.score
        }
        
    }

    addValueInfo(){
        let levelid = this.symbolLevelLists[0] ? this.symbolLevelLists[0].id : ''
        this.valueInfo.push({
            itemName : '',
            score : 0,
            levelid : levelid
        })
        this.propagateChange(this._valueInfo);
        this.onTouched();
    }

    removeValueInfo(i){
        this.valueInfo.splice(i,1)
        this.propagateChange(this._valueInfo);
        this.onTouched();
    }
}

export interface QuestItem {
    itemName : string;
    score : number;
    levelid : string;
}