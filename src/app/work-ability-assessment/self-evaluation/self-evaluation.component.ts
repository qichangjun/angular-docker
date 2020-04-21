import { TileOptions } from './../../share/class/tile/tile.class';
import { SelfEvaluationService } from './self-evaluation.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileListGridOptions } from '../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import Swal from 'sweetalert2';
import { SelfEvaluationUpdateService } from './self-evaluation-update-service';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-self-evaluation',
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.scss']
})
export class SelfEvaluationComponent implements OnInit {
  loading : boolean = false 
  gridOptionsList : Array<any> = []
  queryParamsSubscription : any
  // rowHeight : 200
  parameter : {
    sts :　'0' | '1' | '2' | '3'
  } = {
    sts : '0'
  }
  selectedRows : any = {}
  constructor(
    private _EventService : EventService,
    private _SelfEvaluationUpdateService : SelfEvaluationUpdateService,
    private _SelfEvaluationService : SelfEvaluationService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter, params)
      if (!params.sts){
        this.router.navigate([],{queryParams:this.parameter})
        return 
      }
      this.getList()
    })
  }

  ngOnInit() {
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
          if (this.parameter.sts == '0' || this.parameter.sts == '1') {
            gridOpiton.api.setColumnDefs(this._SelfEvaluationService.getListColumn());
          }else if (this.parameter.sts == '2'){
            gridOpiton.api.setColumnDefs(this._SelfEvaluationService.getFinishedListColumn());
          }else if (this.parameter.sts == '3'){
            gridOpiton.api.setColumnDefs(this._SelfEvaluationService.getBackListColumn());
          }          
          gridOpiton.api.hideOverlay()
          gridOpiton.api.doLayout()
          gridOpiton.api.sizeColumnsToFit()
          e.api.resetRowHeights()
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
        // gridOpiton.getRowHeight = (params) => {
        //   let lineEachWord =  this.parameter.sts == '0' || this.parameter.sts == '1' ? 25 : 16          
        //   let questListLength = params.data.evalEventQuestList.length
        //   if (questListLength == 0){
        //     return 200
        //   }
        //   let lineCount = 0 
        //   params.data.evalEventQuestList.forEach(quest=>{            
        //     let line = Math.ceil(this._SelfEvaluationService.getStringLen(quest.itemName) / lineEachWord)
        //     lineCount = lineCount + line 
        //   })                    
        //   return 20 * lineCount + 55          
        // }
        this.gridOptionsList.push({gridOpiton:gridOpiton,name:list[i].group.grpname,dataLength:list[i].questList.length})     
      }   
      this.loading = false
    }catch(err){
      this.gridOptionsList = []
      this.loading = false
      console.error(err)
    }
  }

  async postEvaluation(){
    let res = await Swal({
      title: '确定提交自评吗?',
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '提交',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try {
        this.loading = true
        let evalEventQuestLits = []
        this.gridOptionsList.forEach((grid:any)=>{          
          grid.gridOpiton.api.forEachNode((rowNode)=>{
            evalEventQuestLits.push(rowNode.data.evalEventQuest)            
          })
        })        
        await this._SelfEvaluationUpdateService.updateEvalEventQuest(evalEventQuestLits)   
        await this._SelfEvaluationService.postEvaluation()        
        this._EventService.toggleEvent({type:'quest'})
        this.getList()
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }

  async postEvaluationAgain(){
    let res = await Swal({
      title: '确定重新提交自评吗?',
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '重新提交',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try {
        this.loading = true
        let evalEventQuestLits = []
        this.gridOptionsList.forEach((grid:any)=>{          
          grid.gridOpiton.api.forEachNode((rowNode)=>{
            evalEventQuestLits.push(rowNode.data.evalEventQuest)            
          })
        })        
        await this._SelfEvaluationUpdateService.updateEvalEventQuest(evalEventQuestLits)   
        await this._SelfEvaluationService.postEvaluationAgain()     
        this._EventService.toggleEvent({type:'quest'})   
        this.getList()
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }

  async deleteEvaluationFile(file,i,evalEventFileList){
    let res = await Swal({
      title: '确定要删除改文件吗?',
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
        let ids = [file.id]
        await this._SelfEvaluationService.deleteEvaluationFile(ids)    
        evalEventFileList.splice(i,1)           
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }

  async saveEvaluation(){
    let res = await Swal({
      title: '确定要保存修改记录吗?',
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '保存',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try {
        this.loading = true
        let evalEventQuestLits = []
        this.gridOptionsList.forEach((grid:any)=>{          
          grid.gridOpiton.api.forEachNode((rowNode)=>{
            evalEventQuestLits.push(rowNode.data.evalEventQuest)            
          })
        })
        // console.log(evalEventQuestLits)
        await this._SelfEvaluationUpdateService.updateEvalEventQuest(evalEventQuestLits)        
        this.loading = false
      } catch (err) {
        console.log(err)
        this.getList()
        this.loading = false
      }
    }   
  }
}
