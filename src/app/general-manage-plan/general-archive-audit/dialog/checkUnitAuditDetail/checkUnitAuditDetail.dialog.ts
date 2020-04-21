import { generalArchiveAuditService } from './../../general-archive-audit.service';

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
@Component({
    selector: 'check-unit-audit-detail-dialog',
    templateUrl: './checkUnitAuditDetail.dialog.html',
    styleUrls: ['./checkUnitAuditDetail.dialog.scss'],
})
export class checkUnitAuditDetailComponent {
    loading: boolean = false;
    detailInfo : any = {}
    constructor(
        private _generalArchiveAuditService : generalArchiveAuditService,
        public dialogRef: MatDialogRef<checkUnitAuditDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data : {unitId : string}
    ) {
      this.getUnitAuditDetail()
    }

    async getUnitAuditDetail(){
        this.detailInfo = await this._generalArchiveAuditService.getUnitAuditDetail(this.data.unitId)
    }

}
