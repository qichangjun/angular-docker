import { createKindComponent } from './dialog/createKind/createKind.dialog';
import { createSymbolItemComponent } from './dialog/createSymbolItem/createSymbolItem.dialog';
import { SymbolItemService } from './symbol-item-setting.service';
import { AuthenticationService } from './../../../../core/services/auth.service';
import { ApiUrl } from './../../../../share/enum/ApiUrl.enum';
import { ConfigService } from './../../../../core/services/config.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { Options as zTreeOption } from '../../../../share/component/z-tree/option.class';
import { ActivatedRoute, Router } from '@angular/router';
import { FileListGridOptions } from '../../../../share/class/girdOptions/gridOptions';
import { GridOptions } from "ag-grid";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import { SelfEvaluationService } from '../../../self-evaluation/self-evaluation.service';

@Component({
  selector: 'app-symbol-item-setting',
  templateUrl: './symbol-item-setting.component.html',
  styleUrls: ['./symbol-item-setting.component.scss']
})
export class SymbolItemSettingComponent implements OnInit {
  @ViewChild('zTree') zTree: any;
  queryParamsSubscription: any;
  ids: Array<any> = [];
  rowDatas : Array<any> = [];
  zTreeOption: zTreeOption  = {
    treeId:  'Ztree',
    async: {
      url: this._ConfigService.teamrowkApiUrl() + ApiUrl.getSymbolItemTree,
      autoParam: ["id=parentId"],
      otherParam: {},
      headers: {
        'accessToken': this._AuthenticationService.getAccessToken()
      }
    },
    data: {
      key: {
        isParent: "isParent"
      }
    },
    view: {
    }
  }
  parameter: {
    ids: string;
    currentPage?: number;
    pageSize : number | string;
    childCount　: number;
    totalElement : number;
  } = {
      childCount : 1,
      ids: '',
      pageSize: '50',
      currentPage: 1,
      totalElement : 0
  }
  loading : boolean = false;
  selectedRows : any[] = [];
  gridOptions: GridOptions = new FileListGridOptions(this)
  constructor(
    private _SelfEvaluationService : SelfEvaluationService,
    private dialog : MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _ConfigService : ConfigService,
    private _AuthenticationService : AuthenticationService,
    private _SymbolItemService : SymbolItemService,
  ) { 
   
  }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      if (params.ids) {
        this.ids = params.ids.split('*')
        this.parameter.ids = this.ids.join('*')
      } else {
        this.ids = [0]
        this.parameter.childCount = 1
        this.parameter.ids = this.ids.join('*')       
      }    
      this.parameter = Object.assign(this.parameter, params)
      this.getList()
    })
  }

  async clickTreeEvent(event) {
    event.ids.unshift(this.ids[0])
    let strIds = event.ids.join('*')
    this.parameter.ids = strIds
    this.parameter.currentPage = 1
    this.parameter.childCount = event.node.childCount
    this.router.navigate([], { queryParams: this.parameter });
  }

  onSelectionChanged() {
    this.selectedRows = this.gridOptions.api.getSelectedRows()
  }

  enterFolder(info, node?):void{
    if (info.type == 'kind'){
      this.parameter.ids = this.parameter.ids + '*' + info.id
      this.parameter.currentPage = 1
      this.parameter.childCount = 0
      this.router.navigate([], { queryParams: this.parameter })
    }   
    return 
  }

  createKind(){
    const dialogRef = this.dialog.open(createKindComponent, {
      width: '',
      disableClose : true,
      data:{
        type : 'create',
        id : 0
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
        this.parameter.childCount = 1
        this.refreshTreeNode(this.ids[this.ids.length - 1])
      }      
    });
  }

  refreshTreeNode(id){
    this.zTree.refreshNode(id,'self')
  }

  async getList(){
    if (this.gridOptions.api) this.gridOptions.api.showLoadingOverlay()
    try{   
      let res          
      if (this.parameter.childCount != 0){        
        res = await this._SymbolItemService.getKindList(this.parameter)  
        res.data.forEach(c => {
          c.type = 'kind'
        });
        this.rowDatas = res.data
        this.gridOptions.api.setColumnDefs(this._SymbolItemService.getKindColumn());
        this.gridOptions.rowHeight = 50
      }else{        
        res = await this._SymbolItemService.getSymbolItemList(this.parameter)
        res.data = res.data.map(c=>{
          c.quest.questItemList = c.questItemList
          return c.quest
        })
        res.data.forEach(c => {
          c.type = 'item'
        });           
        this.gridOptions.api.setColumnDefs(this._SymbolItemService.getListColumn());
        this.rowDatas = res.data
        this.gridOptions.onColumnResized = (e)=>{
          e.api.resetRowHeights()
        }
        this.gridOptions.gridAutoHeight = true         
      }
      this.gridOptions.api.deselectAll()
      this.gridOptions.api.setRowData(res.data)   
      this.parameter.totalElement = res.page.totalCount
      this.gridOptions.api.hideOverlay()
      this.gridOptions.api.doLayout()
      this.gridOptions.api.sizeColumnsToFit()
      this.gridOptions.api.resetRowHeights();
      if (res.length == 0) this.gridOptions.api.showNoRowsOverlay()      
    }catch(err){
      console.error(err)
    }
  }

  createSymbolItem(){
    const dialogRef = this.dialog.open(createSymbolItemComponent, {
      width: '',
      disableClose : true,
      data:{
        type : 'create',
        id : this.ids[this.ids.length - 1]
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getList()
      }      
    });
  }

  edit(data){
    if (data.type == 'kind'){
      const dialogRef = this.dialog.open(createKindComponent, {
        width: '',
        disableClose : true,
        data:{
          type : 'edit',
          id : this.ids[this.ids.length - 1],
          info : data
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res){
          this.refreshTreeNode(this.ids[this.ids.length - 1])
          this.getList()
        }      
      });
    }else{
      const dialogRef = this.dialog.open(createSymbolItemComponent, {
        width: '',
        disableClose : true,
        data:{
          type : 'edit',
          id : this.ids[this.ids.length - 1],
          info : data
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res){
          this.refreshTreeNode(this.ids[this.ids.length - 1])
          this.getList()
        }      
      });
    }
    
  }

  async deleteKind(data?){
    let res = await Swal({
      title: '确定删除所选分类吗?',
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
        let ids = data ? [data.id] : this.selectedRows.map(c=>c.id)
        await this._SymbolItemService.deleteKind(ids)        
        this.getList()
        this.refreshTreeNode(this.ids[this.ids.length - 1])
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }

  async deleteSymbolItem(data?){
    let res = await Swal({
      title: '确定删除所选指标项吗?',
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
        let ids = data ? [data.id] : this.selectedRows.map(c=>c.id)
        await this._SymbolItemService.deleteSymbolItem(ids)        
        this.getList()
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }

  async publishQuest(){
    let res = await Swal({
      title: '确定发布指标吗?',
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try {
        this.loading = true
        await this._SymbolItemService.publishQuest()        
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }
}
