import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FileListGridOptions } from '../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MissionManageService } from '../mission-manage.service';
import { addMissionComponent } from '../dialog/addMission/addMission.dialog';

import Swal from 'sweetalert2';
import { EventService } from '../../core/services/event.service';
@Component({
  selector: 'app-mission-post',
  templateUrl: './mission-post.component.html',
  styleUrls: ['./mission-post.component.scss']
})
export class MissionPostComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  parameter: any = {
    currentPage: 1,
    pageSize: '50',    
    status: '',
    taskTitle: ''
  }
  loading: boolean = false;
  selectedRows: any[] = [];
  checkedRowId: string = ''
  taskStreamId: string = ''
  taskStreamSts : string = ''
  taskStreamReceiveSts : string = ''
  gridOptions: GridOptions = new FileListGridOptions(this)
  constructor(
    private _EventService : EventService,
    private _MissionManageService: MissionManageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,

  ) {
    // this.gridOptions.onRowClicked = ()=>{}
  }

  ngOnInit() {
    this.gridOptions.onRowClicked = (event) => {
      this.enterFolder(event.data, event.node)    
    }
    this.gridOptions.onRowDoubleClicked = (event)=>{
      if (event.rowPinned == "bottom" || event.rowPinned == "top") {
          return
      }
      this.enterFolder(event.data, event.node)
    }
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.parameter = Object.assign(this.parameter, params)
      this.getList()
    })
    
  }

  openedChange(e){
    if (this.gridOptions.api){
      this.gridOptions.api.sizeColumnsToFit()
    }
  }

  changeStatus() {
    this.router.navigate([], { queryParams: this.parameter })
  }

  async getList() {
    if (this.gridOptions.api) this.gridOptions.api.showLoadingOverlay()
    try {
      let list = await this._MissionManageService.getPostMissionList(this.parameter)
      this.gridOptions.api.deselectAll()
      this.gridOptions.api.setRowData(list.data)
      this.parameter.totalElement = list.page.totalCount
      this.gridOptions.api.setColumnDefs(this._MissionManageService.getPostListColumn());
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      if (list.data.length == 0) this.gridOptions.api.showNoRowsOverlay()
    } catch (err) {
      console.error(err)
    }
  }


  onSelectionChanged() {
    this.selectedRows = this.gridOptions.api.getSelectedRows()
    if (this.selectedRows.length != 1) {
      this.sidenav.close()
      this.checkedRowId = undefined
      this.taskStreamId = undefined
      this.taskStreamReceiveSts = undefined
      this.taskStreamSts = undefined
    }
  }

  closeSideBarAndUpdate(needUpdate) {
    this.sidenav.close()
    if (needUpdate) {
      this._EventService.toggleEvent({type:'mission'}) 
      this.getList()
    }
  }

  enterFolder(info, node?) {
    this.gridOptions.api.deselectAll()
    node.setSelected(true);
    this.checkedRowId = info.taskPO.id
    this.taskStreamId = info.taskPublishPO.id        
    this.taskStreamSts = info.taskPublishPO.status
    this.taskStreamReceiveSts = info.taskPublishPO.receiveSts
    this.sidenav.open()
  }

}
