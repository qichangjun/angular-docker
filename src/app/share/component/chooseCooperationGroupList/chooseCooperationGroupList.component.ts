import { Component, forwardRef, Input,ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { NzFormatEmitEvent,NzTreeNodeOptions ,NzTreeNode} from 'ng-zorro-antd';
import { chooseCooperationGroupListService } from './chooseCooperationGroupList.service';
import { CooperationGroupListService } from '../cooperationGroupList/cooperationGroupList.service';

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => chooseCooperationGroupListComponent),
    multi: true
};
@Component({
    selector: 'choose-copperation-group-list',
    templateUrl: './chooseCooperationGroupList.component.html',
    styleUrls: ['./chooseCooperationGroupList.component.scss'],
    providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class chooseCooperationGroupListComponent implements ControlValueAccessor {
    loading: boolean = false;    
    selectItemList: Array<any> = [        
    ];
    @Input() _valueInfo: GroupAndUnitAndCooperationList[] = [];
    @Input() disableEdit : boolean = false 
    constructor(
        private _CooperationGroupListService : CooperationGroupListService,
        private _chooseCooperationGroupListService : chooseCooperationGroupListService
    ) {
        this.getAllItem()
    }

    async getAllItem(){
        let info = await this._CooperationGroupListService.getCooperationGroupSelfEvaluationInfo()            
        let cooperationGroup = info.map(c=>{
            c.cooperationGroup.unitList = c.unitList
            return c.cooperationGroup
        })
        let children = cooperationGroup.map(coop=>{
            let key = {id:coop.id,name:coop.name,type:"group"}
            return {
                key : JSON.stringify(key),
                isLeaf:false,
                title : coop.name,   
                children : coop.unitList.map(unit=>{
                    let key = {id:unit.id,name:unit.name,type:"unitList"}
                    return {
                        key : JSON.stringify(key),
                        isLeaf : true,
                        title : unit.name
                    }
                })
            }
        })
        this.selectItemList = children        
    }

    get valueInfo() {
        return this._valueInfo;
    }

    set valueInfo(value: any) {
        this._valueInfo = value;
        this.propagateChange(this._valueInfo);
    }

    propagateChange = (_: any) => { };



    writeValue(value: any) {
        if (value !== undefined) {
            this._valueInfo = value;
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) { }

    // ---------------------------


    changeSelect(e){
        this.valueInfo = e
        let value = this.valueInfo.map(c=>JSON.parse(c))
        value.forEach(c=>{
            if (c.type == 'group'){
                let childrenKey = this.selectItemList.find(selectItem=>selectItem.key == JSON.stringify(c)).children.map(child=>child.key)
                childrenKey.forEach(child=>{
                    if (this.valueInfo.indexOf(child) == -1){
                        this.valueInfo.push(child)
                    }
                })                
            }
        })
    }

}

interface GroupAndUnitAndCooperationList {
    ownerList : any[];
    unitList : any[];
    publishScopeCodeList : string[];
}