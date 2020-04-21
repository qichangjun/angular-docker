import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import * as _moment from 'moment';
import { MissionManageService } from '../../../../../mission-manage/mission-manage.service';

@Component({
    selector: 'check-mission-post-audit-info-dialog',
    templateUrl: './checkMissionAuditInfo.component.html',
    styleUrls: ['./checkMissionAuditInfo.component.scss'],
})
export class checkMissionAuditInfoComponent {
    loading: boolean = false;
    info : any = {}
    constructor(
        private _MissionManageService : MissionManageService,
        public dialogRef: MatDialogRef<checkMissionAuditInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data 
    ) {
        this.getMissionAuditInfo()
    }

    async getMissionAuditInfo(){
        this.info = await this._MissionManageService.getMissionAuditInfo(this.data.id)
    }
  
}
