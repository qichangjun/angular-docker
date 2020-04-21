
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FileListGridOptions } from '../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import { WorkingModelervice } from './working-model.service';
import { editWorkingModelScoreComponent } from './dialog/editWorkingModelScore/editWorkingModelScore.dialog';

@Component({
  selector: 'app-working-model',
  templateUrl: './working-model.component.html',
  styleUrls: ['./working-model.component.scss']
})
export class WorkingModelComponent implements OnInit {
  parameter : any = {
    currentPage : 1,
    pageSize : '50',
    totalElement : 0,
  }
  loading : boolean = false;
  selectedRows : any[] = [];
  gridOptions: GridOptions = new FileListGridOptions(this)
  constructor(
    private dialog : MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _WorkingModelervice : WorkingModelervice
  ) { }

  ngOnInit() {
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
      let list = await this._WorkingModelervice.getList(this.parameter)
      this.gridOptions.api.deselectAll()
      this.gridOptions.api.setRowData(list.data)   
      this.parameter.totalElement = list.page.totalCount 
      this.gridOptions.api.setColumnDefs(this._WorkingModelervice.getListColumn());
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      if (list.data.length == 0) this.gridOptions.api.showNoRowsOverlay()
    }catch(err){
      console.error(err)
    }
  }

  edit(data){
    const dialogRef = this.dialog.open(editWorkingModelScoreComponent, {
      width: '',
      disableClose : true,
      data:{
        info : data         
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    });
  }
}
