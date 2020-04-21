import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FileListGridOptions } from '../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MissionManageService } from './mission-manage.service';
import { addMissionComponent } from './dialog/addMission/addMission.dialog';
import Swal from 'sweetalert2';
import { EventService } from '../core/services/event.service';
@Component({
  selector: 'app-mission-manage',
  templateUrl: './mission-manage.component.html',
  styleUrls: ['./mission-manage.component.scss']
})
export class MissionManageComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  parameter : any = {
    currentPage : 1,
    pageSize : '50',
    totalElement : 0,
    status : '',
    taskTitle : ''
  }
  loading : boolean = false;
  selectedRows : any[] = [];
  checkedRowId : string = ''
  gridOptions: GridOptions = new FileListGridOptions(this)
  constructor(
    private _EventService : EventService,
    private _MissionManageService : MissionManageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog : MatDialog,
    
  ) { 
    // this.gridOptions.onRowClicked = ()=>{}
    this.gridOptions.onRowDoubleClicked = (event)=>{
      if (event.rowPinned == "bottom" || event.rowPinned == "top") {
          return
      }
      this.enterFolder(event.data, event.node)
    }
  }

  ngOnInit() {
    this.gridOptions.onRowClicked = (event)=> {
      this.enterFolder(event.data, event.node)
    }
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe((params: any) => {  
      this.parameter = Object.assign(this.parameter,params)              
      this.getList()
    })
    
  }

  openedChange(e){
    if (this.gridOptions.api){
      this.gridOptions.api.sizeColumnsToFit()
    }
  }

  changeStatus(){
    this.router.navigate([],{queryParams:this.parameter})
  }

  async getList(){
    if (this.gridOptions.api) this.gridOptions.api.showLoadingOverlay()
    try{      
      let list = await this._MissionManageService.getList(this.parameter)
      this.gridOptions.api.deselectAll()      
      let ids = list.data.map(c=>c.id)
      let res = await this._MissionManageService.getMissionOfUnitSubmitCount(ids)      
      list.data.forEach((c,index)=>{
        c.count = res[index]
      })
      this.gridOptions.api.setRowData(list.data)   
      this.parameter.totalElement = list.page.totalCount 
      this.gridOptions.api.setColumnDefs(this._MissionManageService.getListColumn());
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      if (list.data.length == 0) this.gridOptions.api.showNoRowsOverlay()
    }catch(err){
      console.error(err)
    }
  }

  onSelectionChanged() {
    this.selectedRows = this.gridOptions.api.getSelectedRows()
    if (this.selectedRows.length != 1) {
      this.sidenav.close()
      this.checkedRowId = undefined      
    }
  }

  closeSideBarAndUpdate(needUpdate){
    this.sidenav.close()    
    if(needUpdate){
      this._EventService.toggleEvent({type:'mission'})
      this.getList()
    }
  }

  enterFolder(info, node?) {
    this.gridOptions.api.deselectAll()
    node.setSelected(true);
    this.checkedRowId = info.id    
    this.sidenav.open()
  }

  addMission(){
    const dialogRef = this.dialog.open(addMissionComponent, {
      width: '',
      disableClose : true   
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    });
  }

  async deleteMission(){
    let res = await Swal({
      title: '确定删除所选任务吗?',
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try {
        this.loading = true
        let ids : string[] = this.selectedRows.map(c=>c.id)
        await this._MissionManageService.deleteMission(ids)        
        this.getList()
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }

  async updateMissionState(data,finishSts){
    let idList = [data.id]
    await this._MissionManageService.updateMissionState(idList,finishSts) 
    data.finishSts = data.finishSts == 1 ? 0 : 1
  }
}
