import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter, ElementRef } from '@angular/core';
import { MissionManageService } from '../../../mission-manage/mission-manage.service';
import { SelfEvaluationUpdateService } from '../../../work-ability-assessment/self-evaluation/self-evaluation-update-service';
@Component({
    selector: 'mission-stream-update',
    templateUrl: './missionStreamUpdate.component.html',
    styleUrls: ['./missionStreamUpdate.component.scss'],
})
export class missionStreamUpdateComponent implements OnInit, OnChanges {
    accessoryIdList : any[] = []
    submitDec : string = ''
    sts : any = ''
    receiveSts : any = ''
    @Input() id: string = ''
    @Output() updateMissionStreamFinish: EventEmitter<any> = new EventEmitter();
    constructor(private el: ElementRef,
        private _MissionManageService: MissionManageService,
        private _SelfEvaluationUpdateService : SelfEvaluationUpdateService
    ) { }

    ngOnInit() {

    }

    uploadFinish(e){        
        this.accessoryIdList.push({
            filename : e.name,
            id : e.data
        })
    }

    async deleteMissionStreamFile(file){
        await this._MissionManageService.deleteMissionStreamFile(file.id)
        this.getMissionStreamFile()
    }

    async updateMissionStrean(){
        await this._MissionManageService.updateMissionStrean(this.submitDec,this.id)
        this.getMissionStreamDetail()
        // this.updateMissionStreamFinish.emit(true)
    }

    async downloadFile(file){        
        await this._SelfEvaluationUpdateService.downloadFile(file.filepath,file.filename)
    }

    async getMissionStreamFile(){
        this.accessoryIdList = await this._MissionManageService.getMissionStreamFile(this.id)
    }
    
    async getMissionStreamDetail(){
        let res = await this._MissionManageService.getMissionStreamDetail(this.id)
        this.submitDec = res.submitDec
        this.sts = res.status
        this.receiveSts = res.receiveSts
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.id){
            this.getMissionStreamDetail()
            this.getMissionStreamFile()
        }
    }
}
