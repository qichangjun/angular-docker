import { CooperationGroupListService } from './cooperationGroupList.service';
import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../../core/services/event.service';

@Component({
    selector: 'cooperation-group-list',
    templateUrl: './cooperationGroupList.component.html',
    styleUrls: ['./cooperationGroupList.component.scss'],
})
export class cooperationGroupComponent implements OnInit, OnChanges ,OnDestroy{
    cooperationGroupLists: any[] = []
    eventSub : any 
    @Input() type : 'selfEvaluation' | 'generalArchive' = 'selfEvaluation'
    parameter: {
        unitId?: string
        cooperationGroupId?: string
        showType? : '0' | '1' | '2'
    } = {
        }
    queryParamsSubscription: any
    constructor(
        private _EventService : EventService,
        private route: ActivatedRoute,
        private router: Router,
        private _CooperationGroupListService: CooperationGroupListService
    ) {
        this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
            this.parameter = Object.assign(this.parameter, params)
            if (!this.parameter.showType){
                this.parameter.showType = '0'
            }
        })
        this.eventSub = this._EventService.toggleEvent$.subscribe(update => {
            if(update && (update.type == 'quest' || update.type == 'general')){
                this.getCooperationGroupLists()
            }
          })
    }

    ngOnDestroy(){
        this.eventSub.unsubscribe()
    }

    ngOnInit() {
        this.getCooperationGroupLists()
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    }
    changeShowType(){
        this.router.navigate([], { queryParams: this.parameter })
    }

    async getCooperationGroupLists() {
        if (this.type == 'selfEvaluation'){
            this.cooperationGroupLists = await this._CooperationGroupListService.getCooperationGroupSelfEvaluationInfo()                          
            if ((!this.parameter.unitId) && this.cooperationGroupLists.length > 0 && this.cooperationGroupLists[0].unitList.length > 0) {
                this.parameter.unitId = this.cooperationGroupLists[0].unitList[0].id
                // this.parameter.cooperationGroupId = this.cooperationGroupLists[0].cooperationGroup.id
                this.router.navigate([], { queryParams: this.parameter })
            }
        }else if (this.type == 'generalArchive'){
            this.cooperationGroupLists = await this._CooperationGroupListService.getCooperationGroupGeneralArchiveInfo()               
            if ((!this.parameter.unitId) && this.cooperationGroupLists.length > 0 && this.cooperationGroupLists[0].unitList.length > 0) {
                this.parameter.unitId = this.cooperationGroupLists[0].unitList[0].id
                // this.parameter.cooperationGroupId = this.cooperationGroupLists[0].cooperationGroup.id
                this.router.navigate([], { queryParams: this.parameter })
            }
        }        
    }

    getWatiToAuditNum(coop){
        let num = coop.unitList.filter(c=>c.toAuditInfo).length 
        return num
    }
}
