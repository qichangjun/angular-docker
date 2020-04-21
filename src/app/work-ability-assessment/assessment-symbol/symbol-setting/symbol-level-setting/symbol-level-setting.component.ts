import { createSymbolLevelComponent } from './dialog/createSymbolLevel/createSymbolLevel.dialog';
import { SymbolLevelService } from './symbol-level-setting.service';
import { Component, OnInit } from '@angular/core';
import { FileListGridOptions } from '../../../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-symbol-level-setting',
  templateUrl: './symbol-level-setting.component.html',
  styleUrls: ['./symbol-level-setting.component.scss']
})
export class SymbolLevelSettingComponent implements OnInit {
  parameter : any = {
    pageSize : '50',
    currentPage : 1,
    totalElement : 0,
  }
  loading : boolean = false;
  selectedRows : SymbolLevelSettingData[] = [];
  gridOptions: GridOptions = new FileListGridOptions(this)
  constructor(
    private dialog : MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _SymbolLevelService : SymbolLevelService,
  ) { }

  ngOnInit() {
  }

  onSelectionChanged() {
    this.selectedRows = this.gridOptions.api.getSelectedRows()
  }

  enterFolder():void{
    return 
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe((params: any) => {  
      this.parameter = Object.assign(this.parameter,params)              
      this.getList()
    })
  }

  async getList(){
    if (this.gridOptions.api) this.gridOptions.api.showLoadingOverlay()
    try{      
      let res = await this._SymbolLevelService.getList(this.parameter)
      this.gridOptions.api.deselectAll()
      this.gridOptions.api.setRowData(res.data)   
      this.parameter.totalElement = res.page.totalCount 
      this.gridOptions.api.setColumnDefs(this._SymbolLevelService.getListColumn());
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      if (res.data.length == 0) this.gridOptions.api.showNoRowsOverlay()
    }catch(err){
      console.error(err)
    }
  }

  edit(data : SymbolLevelSettingData){
    const dialogRef = this.dialog.open(createSymbolLevelComponent, {
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
    const dialogRef = this.dialog.open(createSymbolLevelComponent, {
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

  async delete(data? :　SymbolLevelSettingData){
    let res = await Swal({
      title: '确定删除所选指标等级吗?',  
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
        await this._SymbolLevelService.deleteSymbolLevel(ids)        
        this.getList()
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }
}

export interface SymbolLevelSettingData {
  id? : string;
  dictionaryName: string;
  dictionaryCode: string
  dictionaryDescription: string;
  weight : number;
}