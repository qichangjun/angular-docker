import { selfEvaluationInfoOperationComponent } from './grid/self-evaluation-info-operation.component';
import { selfEvaluationInfoRemarksComponent } from './grid/self-evaluation-info-remark.component';
import { QuestItem } from './../../share/component/questItem/questItem.component';
import { selfEvaluationInfoUploadComponent } from './grid/self-evaluation-info-upload.component';
import { selfEvaluationInfoQuestComponent } from './grid/self-evaluation-info-quest.component'
import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { symbolInfoAuditRemarksComponent } from '../assessment-symbol/symbol-info/grid/symbol-info-auditRemark.component';
import { selfEvaluationAuditQuestComponent } from './grid/self-evaluation-audit.component';
import { selfEvaluationBackRemarksComponent } from './grid/self-evaluation-back-remark.component';
import { CoreModule } from '../../core/core.module';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SelfEvaluationService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter): Promise<any> {   
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    let unitId = parameter.unitId ? parameter.unitId : this._authenticationService.getUnitInfo().id
    let params = new HttpParams().set('unitId',unitId).set('sts',parameter.sts);    
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getListAndGroupByUnitAndItemSts, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getQuestItemByUnitAndSts(parameter): Promise<any> {
    let unitId = parameter.unitId ? parameter.unitId : this._authenticationService.getUnitInfo().id
    let params = new HttpParams().set('unitId',unitId).set('sts',parameter.sts);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getQuestItemByUnitAndSts, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getEventQuestCountById(): Promise<any> {
    let params = new HttpParams().set('unitId',this._authenticationService.getUnitInfo().id) ;
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())      
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getEventQuestCountById, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getEvalEventQuestByUnitAndItemSts(parameter): Promise<any> {
    let unitId = parameter.unitId ? parameter.unitId : this._authenticationService.getUnitInfo().id
    let params = new HttpParams().set('unitId',unitId).set('sts',parameter.sts);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())        
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getEvalEventQuestByUnitAndItemSts, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  postEvaluation(): Promise<any> {
    let params = new HttpParams().set('unitId',this._authenticationService.getUnitInfo().id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.postEvalEventQuest,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  postEvaluationAgain(): Promise<any> {
    let params = new HttpParams().set('unitId',this._authenticationService.getUnitInfo().id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.postEvaluationAgain,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  deleteEvaluationFile(ids): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.deleteEvaluationFile,ids, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getEvaluationFile(parameter): Promise<any> {    
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    let unitId = parameter.unitId ? parameter.unitId : this._authenticationService.getUnitInfo().id
    let params = new HttpParams().set('unitId',unitId).set('sts',parameter.sts);    
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getEvaluationFile, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  



  getSelfEvaluationListAndQuestItemList(parameter): Promise<any> {
    return new Promise((resolve,reject)=>{
      Promise.all([this.getList(parameter),this.getQuestItemByUnitAndSts(parameter),this.getEvalEventQuestByUnitAndItemSts(parameter),this.getEvaluationFile(parameter)]).then((res)=>{
        let list : Array<SelfEvaluationLIstData> = res[0]
        let questItem = res[1]
        let evalEventQuestList = res[2]
        let evalEventFileList = res[3]
        list.forEach((c:SelfEvaluationLIstData)=>{
          c.questList.forEach(quest=>{            
            quest.sts = parameter.sts
            quest.evalEventQuest = evalEventQuestList[quest.id] ? evalEventQuestList[quest.id][0] : {}
            quest.evalEventQuestList = questItem[quest.id] || []
            quest.evalEventFileList = evalEventFileList[quest.evalEventQuest.id] || []
          })
        })
        resolve(list)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  getStringLen(Str){
    var i,len,code;    
    if(Str==null || Str == "") return 0;
    len = Str.length;
    for (i =0; i < Str.length;i++){
      code = Str.charCodeAt(i);
      if (code > 255){
        len++
      }
    }
    return Math.ceil(len / 2);
  }

  getFinishedListColumn(){
    return [
      // {
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //   suppressSizeToFit: true,
      //   pinnedRowCellRenderer: "customPinnedRowRenderer",
      //   pinnedRowCellRendererParams: { style: { color: "blue" } },
      //   width: 50
      // },
      {
        headerName: "评估点",
        suppressSorting : true,
        suppressSizeToFit: true,
        field: "questName",
        width:150
      },
      {
        headerName: "自评",
        suppressSorting : true,
        field: "dictionaryCode",
        suppressSizeToFit: true,
        autoHeight : true,    
        width:380,   
        cellRendererFramework: selfEvaluationInfoQuestComponent
      },
      {
        headerName: "自评说明",
        field: "dictionaryDescription",
        width:130,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : selfEvaluationInfoRemarksComponent
      },
      {
        headerName: "证明材料",
        field: "weight",
        width:130, 
        cellRendererFramework: selfEvaluationInfoUploadComponent,
        suppressSizeToFit: true,
        suppressSorting : true
      },{
        headerName: "评定",
        field: "auditRemark",
        width:380,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : selfEvaluationAuditQuestComponent
      },{
        headerName: "评定说明",
        field: "auditRemark",
        width:130,    
        suppressSizeToFit: false,
        suppressSorting : true,
        cellRendererFramework : symbolInfoAuditRemarksComponent
      }
    ]
  }

  getBackListColumn(){
    return [
      // {
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //   suppressSizeToFit: true,
      //   pinnedRowCellRenderer: "customPinnedRowRenderer",
      //   pinnedRowCellRendererParams: { style: { color: "blue" } },
      //   width: 50
      // },
      {
        headerName: "评估点",
        suppressSorting : true,
        field: "questName",
        width:150
      },
      {
        headerName: "自评",
        suppressSorting : true,
        field: "dictionaryCode",
        width:380,    
        cellRendererFramework: selfEvaluationInfoQuestComponent
      },
      {
        headerName: "自评说明",
        field: "dictionaryDescription",
        width:180,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : selfEvaluationInfoRemarksComponent
      },
      {
        headerName: "证明材料",
        field: "weight",
        width:200,
        autoHeight : true,   
        cellRendererFramework: selfEvaluationInfoUploadComponent,
        suppressSizeToFit: true,
        suppressSorting : true
      },{
        headerName: "退回说明",
        field: "weight",
        width:380,
        cellRendererFramework: selfEvaluationBackRemarksComponent,
        // suppressSizeToFit: true,
        suppressSorting : true
      },          
      // {
      //   headerName: '',
      //   field: '',
      //   minWidth: 50,
      //   suppressResize: true,
      //   suppressSorting: true,
      // }
    ]
  }

  getListColumn(){
    return [
      // {
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //   suppressSizeToFit: true,
      //   pinnedRowCellRenderer: "customPinnedRowRenderer",
      //   pinnedRowCellRendererParams: { style: { color: "blue" } },
      //   width: 50
      // },
      {
        headerName: "评估点",
        suppressSorting : true,
        field: "questName",
        width:150
      },
      {
        headerName: "自评",
        suppressSorting : true,
        field: "dictionaryCode",
        width:600,    
        autoHeight : true,    
        cellRendererFramework: selfEvaluationInfoQuestComponent
      },
      {
        headerName: "自评说明",
        field: "dictionaryDescription",
        width:300,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : selfEvaluationInfoRemarksComponent
      },
      {
        headerName: "证明材料",
        field: "weight",
        width:300,
        autoHeight : true,   
        cellRendererFramework: selfEvaluationInfoUploadComponent,
        // suppressSizeToFit: true,
        suppressSorting : true
      },
      // {
      //   headerName: '',
      //   field: '',
      //   minWidth: 50,
      //   suppressResize: true,
      //   suppressSorting: true,
      // }
    ]}
}

export interface SelfEvaluationLIstData {
  questList : Array<any>;
  evalEventQuestList : Array<any>;
  group : {
    id : string;
    grpname : string;
  }
}