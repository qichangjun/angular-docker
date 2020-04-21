import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter, ElementRef } from '@angular/core';
import { MissionManageService } from '../../../mission-manage/mission-manage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { checkUnitPostInfoComponent } from './dialog/checkUnitPostInfo/checkUnitPostInfo.dialog';

@Component({
    selector: 'mission-of-unit-status-info',
    templateUrl: './missionOfUnitStatusInfo.component.html',
    styleUrls: ['./missionOfUnitStatusInfo.component.scss'],
})
export class missionOfUnitStatusInfoComponent implements OnInit, OnChanges {
    @Input() id: string;
    @Output() updateMissionStreamFinish: EventEmitter<any> = new EventEmitter();
    statusInfo: any = {
        unPost: { count: 0, data: [] },
        posted: { count: 0, data: [] },
        audited: { count: 0, data: [] },
        rejected: { count: 0, data: [] },
        unread: { count: 0, data: [] },
    }
    constructor(private el: ElementRef,
        private _MissionManageService: MissionManageService,
        private dialog : MatDialog,
    ) { }

    ngOnInit() {

    }

    async getMissionOfUnitStatusInfo() {
        Promise.all([this.getInfo(0), this.getInfo(1), this.getInfo(2), this.getInfo(3),this.getUnReadUnit()]).then((res: any[]) => {
            this.statusInfo.unPost = {
                count: res[0].page.totalCount,
                data : res[0].data
            }
            this.statusInfo.posted = {
                count: res[1].page.totalCount,
                data : res[1].data
            }
            this.statusInfo.audited = {
                count: res[2].page.totalCount,
                data : res[2].data
            }
            this.statusInfo.rejected = {
                count: res[3].page.totalCount,
                data : res[3].data
            }
            this.statusInfo.unread = {
                count: res[4].page.totalCount,
                data : res[4].data
            }
        })
    }

    async getUnReadUnit(){
        return new Promise(async (resolve, reject) => {
            let res = await this._MissionManageService.getUnReadUnit(this.id,'0')
            resolve(res)
        }) 
    }

    async getInfo(status) {
        return new Promise(async (resolve, reject) => {
            let res = await this._MissionManageService.getMissionOfUnitStatusInfo(this.id, status)
            resolve(res)
        })
    }

    checkUnitPostInfo(unit,enableEdit){
        const dialogRef = this.dialog.open(checkUnitPostInfoComponent, {
            width: '',
            disableClose : false,
            data : {unit:unit,enableEdit:enableEdit}
          });
          dialogRef.afterClosed().subscribe(res => {
            if (res){      
                this.getMissionOfUnitStatusInfo()
                // this.updateMissionStreamFinish.emit(true)
            }      
          });
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.id) {
            this.getMissionOfUnitStatusInfo()
        }
    }
}
