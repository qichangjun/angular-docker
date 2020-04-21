import { MaturityProcessService } from './../general-archive-setting/maturity-process/maturity-process.service';
import { GeneralArchiveSettingRowData } from './../general-archive-setting/general-archive-setting.interface';
import { createStorageScheduleComponent } from './dialog/createStorageSchedule/createStorageSchedule.dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generalArchivePlanService} from './general-archive-plan.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RetentionPeriodSettingService } from './../general-archive-setting/retention-period-setting/retention-period-setting.service';
import { OpenLevelService } from './../general-archive-setting/open-level/open-level.service';
import { CategorySettingService } from './../general-archive-setting/category-setting/category-setting.service';

import Swal from 'sweetalert2';
import { generalArchiveAuditService } from '../general-archive-audit/general-archive-audit.service';
import { AuthenticationService } from '../../core/services/auth.service';
import { checkUnitAuditDetailComponent } from '../general-archive-audit/dialog/checkUnitAuditDetail/checkUnitAuditDetail.dialog';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-general-archive-plan',
  templateUrl: './general-archive-plan.component.html',
  styleUrls: ['./general-archive-plan.component.scss']
})
export class GeneralArchivePlanComponent implements OnInit {
  treeDatas: GeneralArchivePlanTreeData[] = []
  loading : boolean = false 
  recordClassLists: GeneralArchiveSettingRowData[] = []
  presPeriodLists: GeneralArchiveSettingRowData[] = []
  openClassLists: GeneralArchiveSettingRowData[] = []
  MaturityProcessLists: GeneralArchiveSettingRowData[] = []
  parameter = {
    currentPage : 1,
    pageSize : '20',
    unitId: '',
    disabled : 'false',
    cooperationGroupId: ''
  }
  queryParamsSubscription : any 
  currentId: string = ''
  editingInfo : any = {}
  auditInfo : any = {}
  constructor(
    private _AuthenticationService : AuthenticationService,
    private _generalArchiveAuditService : generalArchiveAuditService,
    private _RetentionPeriodSettingService: RetentionPeriodSettingService,
    private _OpenLevelService: OpenLevelService,
    private _CategorySettingService: CategorySettingService,
    private dialog : MatDialog,
    private _generalArchivePlanService : generalArchivePlanService,
    private _MaturityProcessService : MaturityProcessService,
    private route: ActivatedRoute,
    private router: Router,
    private _EventService : EventService
  ) { 
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter, params)
      this.initTree()
    })
  }

  ngOnInit() {
    this.getRetentionList()
    this.getrecordClassLists()
    this.getopenClassLists()
    this.getMaturyProcessLists()
    this.getAuditInfo()
  }

  changeDisableStatus(){
    this.parameter.disabled = this.parameter.disabled == 'true' ? 'false' : 'true'
    this.router.navigate([],{queryParams:this.parameter})
  }

  async getAuditInfo(){
    try{
      this.auditInfo = await this._generalArchiveAuditService.getUnitAuditDetail(this._AuthenticationService.getUnitInfo().id)
    }catch(err){
      this.auditInfo = {}
    }        
  }

  checkDetail(){
    const dialogRef = this.dialog.open(checkUnitAuditDetailComponent, {
      width: '',
      disableClose : true,
      data:{
        unitId : this._AuthenticationService.getUnitInfo().id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        return 
      }      
    });
  }


  async getRetentionList() {
    let res = await this._RetentionPeriodSettingService.getList({ pageSize: '99999', currentPage: 1 })
    this.presPeriodLists = res.data
  }
  async getrecordClassLists() {
      let res = await this._CategorySettingService.getList({ pageSize: '99999', currentPage: 1 })
      this.recordClassLists = res.data
  }
  async getopenClassLists() {
      let res = await this._OpenLevelService.getList({ pageSize: '99999', currentPage: 1 })
      this.openClassLists = res.data
  }

  async getMaturyProcessLists(){
    let res = await this._MaturityProcessService.getList({ pageSize: '99999', currentPage: 1 })
    this.MaturityProcessLists = res.data
}

  sortList(name : string){

  }

  async initTree() {
    let res = await this._generalArchivePlanService.getList(this.parameter,null)
    this.treeDatas = this._generalArchivePlanService.formatTreeNode(res.data, 0)
  }

  async loadChildren(menuInfo:GeneralArchivePlanTreeDataInfo, level:number, id:string) {
    this.currentId = id 
    if (menuInfo.isLoadedChildren) {
      return
    }
    // menuInfo.loading = true
    let res = await this._generalArchivePlanService.getList(this.parameter,id)
    menuInfo.children = this._generalArchivePlanService.formatTreeNode(res.data, level)
    // menuInfo.loading = false
    menuInfo.isLoadedChildren = true    
  }

  addStorageSchedule(id,info={}){
    const dialogRef = this.dialog.open(createStorageScheduleComponent, {
      width: '',
      disableClose : true,
      data:{
        type : 'create',
        parentInfo : info,
        parentId : id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
       if (!id){
         this.initTree()
       }else{        
        let node : GeneralArchivePlanTreeData = this.findNodeById({ info: { children: this.treeDatas } }, id)        
        node.info.isLoadedChildren = false
        node.info.toggle = true 
        this.loadChildren(node.info,node.level,node.id)
        // node.info.toggle = true 
       }
      }      
    });
  }

  editStorageSchedule(id,info,level){
    this.treeDatas.forEach((c)=>{
      this.disableAllEditStatus(c)
    })
    info.editing = true 
    this.editingInfo = Object.assign({},info) 
    this.editingInfo.disabled = this.editingInfo.disabled == 1 ? false : true 
    // const dialogRef = this.dialog.open(createStorageScheduleComponent, {
    //   width: '',
    //   disableClose : true,
    //   data:{
    //     type : 'edit',
    //     info : Object.assign({},info)
    //   }
    // });
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res){
    //     if (level == 1){
    //       this.initTree()
    //     }else{
    //       let parent : GeneralArchivePlanTreeData = this.findNodeParentById({ info: { children: this.treeDatas } }, id)
    //       parent.info.isLoadedChildren = false
    //       this.loadChildren(parent.info,parent.level,parent.id)
    //       this.loading = false
    //     }   
    //   }      
    // });
  }

  async updateStorageSchedule(){
    let info = Object.assign({},this.editingInfo)
    info.disabled = info.disabled ? 0 : 1
    info.isNeedFill = info.isNeedFill == true ? '1' : '0'
    await this._generalArchivePlanService.updateStorageSchedule(info) 
    this.treeDatas.forEach((c)=>{
      this.disableAllEditStatus(c)
    })
    if (info.level == 1){
      this.initTree()
    }else{
      let parent : GeneralArchivePlanTreeData = this.findNodeParentById({ info: { children: this.treeDatas } }, info.id)
      parent.info.isLoadedChildren = false
      this.loadChildren(parent.info,parent.level,parent.id)
      this.loading = false
    } 
  }

  disableAllEditStatus(data){
    data.info.editing = false 
    if (data.info.children){
      data.info.children.forEach(child=>{
        this.disableAllEditStatus(child)
      })
    }
  }

  async deleteStorageSchedule(id,info:GeneralArchivePlanTreeDataInfo,level){
    let res = await Swal({
      title: '确定删除所选保管期限表吗?',
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
          let ids = [id]
          await this._generalArchivePlanService.deleteStorageSchedule(ids)    
          if (level == 1){
            this.initTree()
          }else{
            let parent = this.findNodeParentById({ info: { children: this.treeDatas } }, id)
            parent.info.isLoadedChildren = false
            this.loadChildren(parent.info,parent.level,parent.id)
            this.loading = false
          }    
      } catch (err) {
        this.loading = false
      }
    }
  }

  async reportStorageSchedule(){
    let res = await Swal({
      title: '确定要报送选保管期限表吗?',
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '报送',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try{
        this.loading = true 
        await this._generalArchivePlanService.reportStorageSchedule()
        this.getAuditInfo()
        this._EventService.toggleEvent({type:'general'})   
        this.loading = false
      }catch(err){
        this.loading = false
      }
    }
    
  }
    
/**
   * 根据id寻找tree中指定节点的父节点
   * @param node 第一次调用传{ info: { children: this.treeDatas } }
   * @param id 
   */
  findNodeParentById(node={ info: { children: this.treeDatas }}, id) {
    if (node.info.children && node.info.children.length > 0) {
      for (let i = 0; i <= node.info.children.length; i++) {
        if (node.info.children[i] && node.info.children[i].id == id) {
          return node
        } else {
          let parentNode = this.findNodeParentById(node.info.children[i], id)
          if (parentNode) {
            return parentNode
          } else {
            continue
          }
        }
      }
    }
  }

  /**
   * 根据id寻找tree中指定节点
   * @param node 第一次调用传{ info: { children: this.treeDatas } }
   * @param id 
   */
  findNodeById(node={ info: { children: this.treeDatas } },id){
    if (node.info.children && node.info.children.length > 0) {
      for (let i = 0; i <= node.info.children.length; i++) {
        if (node.info.children[i].id == id) {
          return node.info.children[i]
        } else {
          let parentNode = this.findNodeById(node.info.children[i], id)
          if (parentNode) {
            return parentNode
          } else {
            continue
          }
        }
      }
    }
  }

  /**
   * 根绝门类id获取门类显示名
   * @param id 
   */
  getRecordClassName(id) : string{
    if (!this.recordClassLists.find(c=>c.id == id)){
      return ''
    }
    return this.recordClassLists.find(c=>c.id == id).dictionaryName
  }
  /**
   * 根绝保管期限id获取门类显示名
   * @param id 
   */
  getPresPeriodName(id) : string{
    if (!this.presPeriodLists.find(c=>c.id == id)){
      return ''
    }
    return this.presPeriodLists.find(c=>c.id == id).dictionaryName
  }
  /**
   * 根绝开放等级id获取门类显示名
   * @param id 
   */
  getOpenLevelNameName(id) : string{
    if (!this.openClassLists.find(c=>c.id == id)){
      return ''
    }
    return this.openClassLists.find(c=>c.id == id).dictionaryName
  }

  getDueTimeActName(id) : string{
    if (!this.MaturityProcessLists.find(c=>c.id == id)){
      return ''
    }
    return this.MaturityProcessLists.find(c=>c.id == id).dictionaryName
  }
}

export interface GeneralArchivePlanTreeData {
  id : string;
  level : number;
  parentId : string;  
  info : GeneralArchivePlanTreeDataInfo;
}
export interface GeneralArchivePlanTreeDataInfo {
  children : GeneralArchivePlanTreeData[];
  isLoadedChildren : boolean;  
  loading : boolean;
  toggle : boolean;
}
