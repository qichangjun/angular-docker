import { postReviewOpinionComponent } from './dialog/postReviewOpinion/postReviewOpinion.dialog';
import { checkUnitAuditDetailComponent } from './dialog/checkUnitAuditDetail/checkUnitAuditDetail.dialog';
import { generalArchiveAuditService } from './general-archive-audit.service';
import { generalArchivePlanService } from './../general-archive-plan/general-archive-plan.service';
import { GeneralArchiveSettingRowData } from './../general-archive-setting/general-archive-setting.interface';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RetentionPeriodSettingService } from './../general-archive-setting/retention-period-setting/retention-period-setting.service';
import { OpenLevelService } from './../general-archive-setting/open-level/open-level.service';
import { CategorySettingService } from './../general-archive-setting/category-setting/category-setting.service';
import Swal from 'sweetalert2';
import { EventService } from '../../core/services/event.service';
@Component({
  selector: 'app-general-archive-audit',
  templateUrl: './general-archive-audit.component.html',
  styleUrls: ['./general-archive-audit.component.scss']
})
export class GeneralArchiveAuditComponent implements OnInit {
  @ViewChild('cooperationList') cooperationList: any;
  treeDatas: GeneralArchivePlanTreeData[] = []
  loading : boolean = false 
  recordClassLists: GeneralArchiveSettingRowData[] = []
  presPeriodLists: GeneralArchiveSettingRowData[] = []
  openClassLists: GeneralArchiveSettingRowData[] = []
  parameter = {
    currentPage : 1,
    pageSize : '20',
    unitId: '',
    disabled : 'false',
    cooperationGroupId: ''
  }
  queryParamsSubscription : any 
  currentId: string = ''
  auditInfo : any = {}
  constructor(
    private _generalArchiveAuditService : generalArchiveAuditService,
    private _RetentionPeriodSettingService: RetentionPeriodSettingService,
    private _OpenLevelService: OpenLevelService,
    private _CategorySettingService: CategorySettingService,
    private dialog : MatDialog,
    private _generalArchivePlanService : generalArchivePlanService,
    private route: ActivatedRoute,
    private router: Router,
    private _EventService : EventService
  ) { 
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.parameter = Object.assign(this.parameter, params)
      this.initTree()
      if(this.parameter.unitId){
        this.getAuditInfo()
      }
      
    })
  }

  ngOnInit() {
    this.getRetentionList()
    this.getrecordClassLists()
    this.getopenClassLists()
  }

  changeDisableStatus(){
    this.parameter.disabled = this.parameter.disabled == 'true' ? 'false' : 'true'
    this.router.navigate([],{queryParams:this.parameter})
  }

  async getAuditInfo(){
    try{
      this.auditInfo = await this._generalArchiveAuditService.getUnitAuditDetail(this.parameter.unitId)
    }catch(err){
      this.auditInfo = {}
    }        
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

  sortList(name : string){

  }

  async initTree() {
    try{
      let res = await this._generalArchiveAuditService.getList(this.parameter,null)
      this.treeDatas = this._generalArchivePlanService.formatTreeNode(res.data, 0)
    }catch(err){
      this.treeDatas = []
    }
    
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
        if (node.info.children[i].id == id) {
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

  checkDetail(){
    const dialogRef = this.dialog.open(checkUnitAuditDetailComponent, {
      width: '',
      disableClose : true,
      data:{
        unitId : this.parameter.unitId
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res){
        return 
      }      
    });
  }

  postReviewOpinion(){
    const dialogRef = this.dialog.open(postReviewOpinionComponent, {
      width: '',
      disableClose : false,
      data:{
        submitTag : this.treeDatas[0].info.submitTag
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAuditInfo()
      this.initTree()      
      this._EventService.toggleEvent({type:'general'})
      // if (res){
      //   return 
      // }      
    });
  }

  async passAudit(){
    let res = await Swal({
      title: '确定要通过审核吗?',
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: '通过',
      cancelButtonText: '取消',
      reverseButtons: true
    })
    if (res && res.value == true) {
      try{
        this.loading = true 
        await this._generalArchiveAuditService.passAudit(this.treeDatas[0].info.submitTag)
        this.initTree()
        this.getAuditInfo()        
        this._EventService.toggleEvent({type:'general'})
        this.loading = false
      }catch(err){
        this.loading = false
      }
    }
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
  submitTag? : string;
}
