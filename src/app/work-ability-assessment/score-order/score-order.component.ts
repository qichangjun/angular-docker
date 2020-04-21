import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FileListGridOptions } from '../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import { ScoreOrderService } from './score-order.service';

@Component({
  selector: 'app-score-order',
  templateUrl: './score-order.component.html',
  styleUrls: ['./score-order.component.scss']
})
export class ScoreOrderComponent implements OnInit {
  parameter : any = {
    currentPage : 1,
    pageSize : '50',
    totalElement : 0,
  }
  loading : boolean = false;
  selectedRows : any[] = [];
  unitStatisticsInfo : any = {}
  gridOptions: GridOptions = new FileListGridOptions(this)
  constructor(
    private _ScoreOrderService : ScoreOrderService,
    private dialog : MatDialog,
    private route: ActivatedRoute,
    private router: Router    
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {  
      this.parameter = Object.assign(this.parameter,params)              
      this.getList()
      this.getUnitNumberInfo()
    })
  }

  onSelectionChanged() {
    this.selectedRows = this.gridOptions.api.getSelectedRows()
  }

  enterFolder():void{
    return 
  }

  async getUnitNumberInfo(){
    this.unitStatisticsInfo = await this._ScoreOrderService.getUnitNumberInfo('QUEST')
  }

  async getList(){
    if (this.gridOptions.api) this.gridOptions.api.showLoadingOverlay()
    try{      
      let unitMap = await this._ScoreOrderService.getAllUnitMap()
      let list = await this._ScoreOrderService.getList(this.parameter)
      list.data.forEach((c,i)=>{
        c.unitInfo = unitMap[c.unitId] ? unitMap[c.unitId][0] : {}
        c.index = i + 1 + this.parameter.pageSize*(this.parameter.currentPage - 1)
        c.questScoreSum = c.questScoreSum || 0
        c.questScoreSum = c.questScoreSum.toFixed(1)
      })
      this.parameter.totalElement = list.page.totalCount
      this.gridOptions.api.deselectAll()
      this.gridOptions.api.setRowData(list.data)         
      this.gridOptions.api.setColumnDefs(this._ScoreOrderService.getListColumn());
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      if (list.length == 0) this.gridOptions.api.showNoRowsOverlay()
    }catch(err){
      console.error(err)
    }
  }

}
