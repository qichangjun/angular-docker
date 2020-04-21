import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component,Input,OnInit,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { MenuItems } from '../../share/class/menu-items/menu-items';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash'
import { ScoreOrderService } from '../../work-ability-assessment/score-order/score-order.service';
import { MissionManageService } from '../../mission-manage/mission-manage.service';
import { SelfEvaluationService } from '../../work-ability-assessment/self-evaluation/self-evaluation.service';
import { generalArchivePlanService } from '../../general-manage-plan/general-archive-plan/general-archive-plan.service';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit,OnDestroy{
  snavMenuItems : any = []
  eventSub : any 
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @Input() snav : any;

  constructor(
    private _EventService: EventService,
    private _generalArchivePlanService : generalArchivePlanService,
    private _SelfEvaluationService : SelfEvaluationService,
    private _ScoreOrderService : ScoreOrderService,
    private _MissionManageService : MissionManageService,
    private _ActivatedRoute :ActivatedRoute,
    private router: Router,
    private dialog : MatDialog,
    public _configService : ConfigService,
    public _authenticationService : AuthenticationService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.snavMenuItems = this.menuItems.getMenuitem()
  }

  ngOnDestroy(){
    this.eventSub.unsubscribe()
  }

  ngOnInit(): void {
    this.eventSub = this._EventService.toggleEvent$.subscribe(update => {
      if(update && (update.type == 'quest' || update.type == 'general' || update.type == 'mission')){
        this.getUnitNumberInfoQuest()
        this.getUnitNumberInfoPresv()
        this.getMissionNumberStart()
        this.getEventQuestCountById()
        this.getStorageReviewCountById()
        this.getMIssionNumberStream()
      }
    })
    this.getUnitNumberInfoQuest()
    this.getUnitNumberInfoPresv()
    this.getMissionNumberStart()
    this.getEventQuestCountById()
    this.getStorageReviewCountById()
    this.getMIssionNumberStream()
  }

  async getEventQuestCountById(){
    let res = await this._SelfEvaluationService.getEventQuestCountById()
    this.snavMenuItems.find(c=>c.name=='工作能力评估').children.find(c=>c.name=='工作自评').count = res  
  }

  async getStorageReviewCountById(){
    let res = await this._generalArchivePlanService.getStorageReviewCountById()
    let status = res == 'B' || !res ? 'B' : false     
    this.snavMenuItems.find(c=>c.name=='综合管理计划').children.find(c=>c.name=='综合归档填报').count = status 
  }

  async getMIssionNumberStream(){
    let res = await this._MissionManageService.getMIssionNumberStream()    
    this.snavMenuItems.find(c=>c.name=='任务管理').children.find(c=>c.name=='我的任务').count = res  
  }

  async getMissionNumberStart(){
    let res = await this._MissionManageService.getUnFinishMissionCount()    
    this.snavMenuItems.find(c=>c.name=='任务管理').children.find(c=>c.name=='发起任务').count = res  
  }

  async getUnitNumberInfoQuest(){    
    let unitStatisticsInfo = await this._ScoreOrderService.getUnitNumberInfo('QUEST')      
    this.snavMenuItems.find(c=>c.name=='工作能力评估').children.find(c=>c.name=='评估指标').count = unitStatisticsInfo.SUBMIT_NUM  
  }

  async getUnitNumberInfoPresv(){
    let unitStatisticsInfo = await this._ScoreOrderService.getUnitNumberInfo('PRESV')      
    this.snavMenuItems.find(c=>c.name=='综合管理计划').children.find(c=>c.name=='综合归档审核').count = unitStatisticsInfo.SUBMIT_NUM  
  }

  editCurrentUser(){
   
  }
  showMenuItemChild(ral,menuitem){
    if (ral.isActive && _.isUndefined(menuitem.toggle)){
      menuitem.toggle = true 
    }
    return menuitem.toggle
  }
 
}