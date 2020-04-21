import { reSelfEvaluationComponent } from './dialog/reSelfEvaluation/reSelfEvaluation.dialog';
import { SelfEvaluationService } from './../../self-evaluation/self-evaluation.service';
import { CategorySettingService } from './../../../general-manage-plan/general-archive-setting/category-setting/category-setting.service';
import { SymbolInfolService } from './symbol-info.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileListGridOptions } from '../../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import { EventService } from '../../../core/services/event.service';
@Component({
  selector: 'app-symbol-info',
  templateUrl: './symbol-info.component.html',
  styleUrls: ['./symbol-info.component.scss']
})
export class SymbolInfoComponent implements OnInit {
  loading : boolean = false 
  gridOptionsList : Array<any> = []
  cooperationGroupLists : any[] = []
  queryParamsSubscription : any
  rowHeight : 230
  parameter : {
    sts :　'1' | '2',
    currentPage : number
    pageSize : string
    unitId? : string
    cooperationGroupId? : string
    totalElement? : number,
  } = {
    sts : '1',
    currentPage : 1,
    pageSize : '50',
    totalElement : 0
  }
  selectedRows : any[] = []
  constructor(
    private _EventService : EventService,
    private dialog : MatDialog,
    private _SelfEvaluationService : SelfEvaluationService,
    private _CategorySettingService : CategorySettingService,
    private _SymbolInfolService : SymbolInfolService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter, params)
      if (!params.sts){
        this.router.navigate([],{queryParams:this.parameter})
        return 
      }
      if (!this.parameter.unitId && !this.parameter.cooperationGroupId){     
        return
      }
      this.getList()
    })
  }

  ngOnInit() {
    this.getCooperationGroupLists()
  }

  onSelectionChanged(e) {
    let selectedLists = e.api.getSelectedRows()
    if (selectedLists.length > 0 ){
      this.selectedRows[selectedLists[0].groupId] = selectedLists
    }
  }

  enterFolder():void{
    return 
  }

  async getCooperationGroupLists(){
    this.cooperationGroupLists = await this._SymbolInfolService.getCooperationGroupLists()
    if((!this.parameter.unitId || !this.parameter.cooperationGroupId) && this.cooperationGroupLists.length > 0 && this.cooperationGroupLists[0].unitList.length > 0){
      this.parameter.unitId = this.cooperationGroupLists[0].unitList[0].id
      this.parameter.cooperationGroupId = this.cooperationGroupLists[0].cooperationGroup.id
    }
  }

  async getList(){
    try{      
      this.loading = true
      this.gridOptionsList = []
      let list = await this._SelfEvaluationService.getSelfEvaluationListAndQuestItemList(this.parameter)
      for(let i = 0;i < list.length;i++){
        let gridOpiton : GridOptions = new FileListGridOptions(this)
        gridOpiton.onGridReady = (e) => {
          e.api.sizeColumnsToFit();
          e.api.showLoadingOverlay()
          e.api.deselectAll()
          e.api.setRowData(list[i].questList)   
          if (this.parameter.sts == '1'){
            gridOpiton.api.setColumnDefs(this._SymbolInfolService.getListColumn());
          }else if (this.parameter.sts == '2'){
            gridOpiton.api.setColumnDefs(this._SymbolInfolService.getFinishListColumn());
          }          
          gridOpiton.api.hideOverlay()
          gridOpiton.api.doLayout()
          gridOpiton.api.sizeColumnsToFit()
          gridOpiton.api.resetRowHeights();
          if (list[i].questList.length == 0) gridOpiton.api.showNoRowsOverlay()
          document.getElementById('tiMenuIcon').addEventListener('click',()=>{            
            setTimeout(()=>{                
                e.api.sizeColumnsToFit()
            },800)
          })
        }
        gridOpiton.onColumnResized = (e)=>{
          e.api.resetRowHeights()
        }
        gridOpiton.gridAutoHeight = true               
        this.gridOptionsList.push({gridOpiton:gridOpiton,name:list[i].group.grpname,dataLength:list[i].questList.length})
      }   
      this.loading = false
    }catch(err){
      this.loading = false
      console.error(err)
    }
  }

  async confirmEvaluation(){
    let res = await Swal({
      title: '是否要确认评定?',
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try{
        this.loading = true
        await this._SymbolInfolService.confirmEvaluation(this.parameter.unitId)
        this._EventService.toggleEvent({type:'quest'})
        this.loading = false 
        this.getList()
      }catch(err){
        this.gridOptionsList.forEach((gridOpiton)=>{
          gridOpiton.gridOpiton.api.setColumnDefs(this._SymbolInfolService.getCheckAuditListColumn());
          gridOpiton.gridOpiton.api.sizeColumnsToFit()
        })        
        this.loading = false
      }
    }  
  }

  async finishReSelfEvaluation(data,params){
    this.disagreeSelfEvaluation(data,params,true)
    // let res = await Swal({
    //   title: '确定要重新评定吗?',
    //   type: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#d9534f",
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   reverseButtons: true
    // })
    // if (res && res.value == true) {
    //   try{
    //     this.loading = true
    //     await this._SymbolInfolService.finishReSelfEvaluation(params.data.evalEventQuest)
    //     this.getList()
    //   }catch(err){
    //     this.loading = false
    //   }
    // }  
  }

  async agreeSelfEvaluation(data,params){    
    let res = await Swal({
      title: '确定要同意该自评吗?',
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try{
        this.loading = true
        await this._SymbolInfolService.agreeSelfEvaluation(data)
        data.evalEventQuest.isFillOutAudit = 1         
        params.node.updateData(data)        
        if (this.parameter.sts == '1'){
          params.api.setColumnDefs(this._SymbolInfolService.getListColumn());
          params.api.sizeColumnsToFit()
        }else if (this.parameter.sts == '2'){
          params.api.setColumnDefs(this._SymbolInfolService.getFinishListColumn());
          params.api.sizeColumnsToFit()
        } 
        this.loading = false 

      }catch(err){
        this.loading = false
      }
    }  
  }

  async disagreeSelfEvaluation(data,params,isFinished?){
    const dialogRef = this.dialog.open(reSelfEvaluationComponent, {
      width: '',
      disableClose : true,
      data:{
        info : Object.assign({},data),
        isFinished : isFinished
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        data.evalEventQuest.isFillOutAudit = 1         
        params.node.updateData(data)        
        if (this.parameter.sts == '1'){
          params.api.setColumnDefs(this._SymbolInfolService.getListColumn());
          params.api.sizeColumnsToFit()
        }else if (this.parameter.sts == '2'){
          params.api.setColumnDefs(this._SymbolInfolService.getFinishListColumn());
          params.api.sizeColumnsToFit()
        } 
      }      
    });
   
  }


  async checkSelfEvaluationInfo(params){       
    let res = await Swal({
      title: '自评说明',
      text:params.data.evalEventQuest.remarksUnit,
      type: "info",
      confirmButtonColor: "#d9534f",
      confirmButtonText: '确定',
      reverseButtons: true
    })
  }

  async checkAuditInfo(params){    
    let res = await Swal({
      title: '评定说明',
      text:params.data.evalEventQuest.remarksAudit,
      type: "info",
      confirmButtonColor: "#d9534f",
      confirmButtonText: '确定',
      reverseButtons: true
    })
  }
}
