import { GeneralArchiveSettingRowData } from './../general-archive-setting.interface';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FileListGridOptions } from '../../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import { AuditLevelService } from './audit-level.service';
import { createAuditLevelComponent } from './dialog/createAuditLevel/createAuditLevel.dialog';

@Component({
  selector: 'app-audit-level',
  templateUrl: './audit-level.component.html',
  styleUrls: ['./audit-level.component.scss']
})
export class AuditLevelComponent implements OnInit {
  parameter : any = {
    currentPage : 1,
    pageSize : '50',
    totalElement : 0,
  }
  loading : boolean = false;
  selectedRows : GeneralArchiveSettingRowData[] = [];
  gridOptions: GridOptions = new FileListGridOptions(this)
  constructor(
    private dialog : MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _AuditLevelService :AuditLevelService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe((params: any) => {  
      this.parameter = Object.assign(this.parameter,params)              
      this.getList()
    })
  }

  onSelectionChanged() {
    this.selectedRows = this.gridOptions.api.getSelectedRows()
  }

  enterFolder():void{
    return 
  }

  async getList(){
    if (this.gridOptions.api) this.gridOptions.api.showLoadingOverlay()
    try{      
      let list = await this._AuditLevelService.getList(this.parameter)
      this.gridOptions.api.deselectAll()
      this.gridOptions.api.setRowData(list.data)   
      this.parameter.totalElement = list.page.totalCount 
      this.gridOptions.api.setColumnDefs(this._AuditLevelService.getListColumn());
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      if (list.data.length == 0) this.gridOptions.api.showNoRowsOverlay()
    }catch(err){
      console.error(err)
    }
  }

  edit(data : GeneralArchiveSettingRowData){
    const dialogRef = this.dialog.open(createAuditLevelComponent, {
      width: '',
      disableClose : true,
      data:{
        type : 'edit',
        info : data
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    });
  }

  createAuditLevel(){
    const dialogRef = this.dialog.open(createAuditLevelComponent, {
      width: '',
      disableClose : true,
      data:{
        type : 'create'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    });
  }

  async delete(data? : GeneralArchiveSettingRowData){
    let res = await Swal({
      title: '确定删除所选评定等级吗?',
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
        let ids : string[] = data ? [data.id] : this.selectedRows.map(c=>c.id)
        await this._AuditLevelService.deleteAuditLevel(ids)        
        this.getList()
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }

}
