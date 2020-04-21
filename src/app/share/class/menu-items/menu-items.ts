import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state?: string;
  nodes?:ChildrenItems[];
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [

  {
    state: 'workAbilityAssessment',
    name: '工作能力评估',
    type: 'drawer',
    icon: 'ti-clipboard',    
    children:[
      // {name:'基础信息',state:'basementInfo'},      
      {name:'单位统计分析',state:'ScoreOrderDetail',icon:'ti-bar-chart',menuCode:'TWWorkAbilityAssess:unitStatistics'},
      {name:'统计分析',state:'scoreOrder',icon:'ti-bar-chart',menuCode:'TWWorkAbilityAssess:statistics'},
      {name:'评估指标',state:'assessmentSymbol',icon:'ti-ruler-pencil',menuCode:'TWWorkAbilityAssess:assess'},
      {name:'工作自评',state:'selfEvaluation',icon:'ti-clipboard',menuCode:'TWWorkAbilityAssess:self'},      
    ],
    menuCode : 'TWWorkAbilityAssess'
  }, {
    state: 'generalManagePlan',
    name: '综合管理计划',
    type: 'drawer',
    icon: 'ti-harddrives',
    children:[
      {name:'统计分析',state:'generalArchiveOrder',icon:'ti-bar-chart',menuCode:'TWIntegratedManagement:statistics'},
      {name:'综合归档审核',state:'generalArchiveAudit',icon:'ti-stamp',menuCode:'TWIntegratedManagement:audit'},  
      {name:'综合归档填报',state:'generalArchivePlan',icon:'ti-write',menuCode:'TWIntegratedManagement:send'},
      {name:'综合归档设定',state:'generalArchiveSetting',icon:'ti-panel',menuCode:'TWIntegratedManagement:setting'},
      
    ],
    menuCode : 'TWIntegratedManagement'
  }, {
    state: 'sysSetting',
    name: '系统设定',
    type: 'drawer',
    icon: 'ti-settings',    
    children:[
      {name:'工作模块',state:'workingModel',icon:'ti-package',menuCode:'TWSysSetting:scoreSetting'}  
    ],
    menuCode : 'TWSysSetting'
  },{
    state: 'missionManage',
    name: '任务管理',
    type: 'drawer',
    icon: 'ti-settings',    
    children:[
      {name:'我的任务',state:'postMission',icon:'ti-book',menuCode:'TWTaskManagent:myTask'}  ,
      {name:'发起任务',state:'startMission',icon:'ti-location-arrow',menuCode:'TWTaskManagent:distributeTask'}  
    ],
    menuCode : 'TWTaskManagent'
  }
];

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
