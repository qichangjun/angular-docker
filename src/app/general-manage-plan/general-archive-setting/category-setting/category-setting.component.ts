import { GeneralArchiveSettingRowData } from './../general-archive-setting.interface';
import { createCategorySettingComponent } from './dialog/createCategorySetting/createCategorySetting.dialog';
import { CategorySettingService } from './category-setting.service';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FileListGridOptions } from '../../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category-setting',
  templateUrl: './category-setting.component.html',
  styleUrls: ['./category-setting.component.scss']
})
export class CategorySettingComponent implements AfterViewInit {
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
    private _CategorySettingService :CategorySettingService
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
      let list = await this._CategorySettingService.getList(this.parameter)
      this.gridOptions.api.deselectAll()
      this.gridOptions.api.setRowData(list.data)   
      this.parameter.totalElement = list.page.totalCount 
      this.gridOptions.api.setColumnDefs(this._CategorySettingService.getListColumn());
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      if (list.data.length == 0) this.gridOptions.api.showNoRowsOverlay()
    }catch(err){
      console.error(err)
    }
  }

  edit(data : GeneralArchiveSettingRowData){
    const dialogRef = this.dialog.open(createCategorySettingComponent, {
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

  createRetentionPeriod(){
    const dialogRef = this.dialog.open(createCategorySettingComponent, {
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
      title: '确定删除所选门类吗?',
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
        await this._CategorySettingService.deleteCategorySetting(ids)        
        this.getList()
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }
}

