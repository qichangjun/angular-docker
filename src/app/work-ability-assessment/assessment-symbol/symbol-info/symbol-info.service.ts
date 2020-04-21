import { symbolInfoAuditRemarksComponent } from './grid/symbol-info-auditRemark.component';
import { symbolInfoOperationComponent } from './grid/symbol-info-operation.component';
import { selfEvaluationInfoUploadComponent } from './../../self-evaluation/grid/self-evaluation-info-upload.component';
import { selfEvaluationInfoRemarksComponent } from './../../self-evaluation/grid/self-evaluation-info-remark.component';
import { selfEvaluationInfoQuestComponent } from './../../self-evaluation/grid/self-evaluation-info-quest.component';
import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';
import { ApiUrl } from '../../../share/enum/ApiUrl.enum';
import { selfEvaluationAuditQuestComponent } from '../../self-evaluation/grid/self-evaluation-audit.component';
import { symbolInfoFinishOperationComponent } from './grid/symbol-info-finish-operation.component';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SymbolInfolService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter): Promise<any> {
    let params = new HttpParams()
    .set('currentPage',parameter.currentPage)
    .set('pageSize',parameter.pageSize);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getSymbolLevelLists, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getCooperationGroupLists(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getCooperationGroupLists, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  agreeSelfEvaluation(info): Promise<any> {
    let params = new HttpParams()
    .set('id',info.evalEventQuest.id)
    .set('auditRemark',info.evalEventQuest.remarksAudit);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())     
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.agreeSelfEvaluation,{
      id : info.evalEventQuest.id,
      auditRemark : info.evalEventQuest.remarksAudit
    }, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  disagreeSelfEvaluation(info): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.disagreeSelfEvaluation,info, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  confirmEvaluation(unitId): Promise<any> {
    let params = new HttpParams()
    .set('unitId',unitId);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())        
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.confirmEvaluation,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  finishReSelfEvaluation(info): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.finishReSelfEvaluation,info, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getFinishListColumn(){
    return [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        pinnedRowCellRendererParams: { style: { color: "blue" } },
        width: 50
      },{
        headerName: "评估点",
        suppressSorting : true,
        field: "questName",
        width:120
      },
      {
        headerName: "自评",
        suppressSorting : true,
        field: "dictionaryCode",
        width:280,  
        autoHeight : true,
        cellRendererFramework: selfEvaluationInfoQuestComponent,
      },
      {
        headerName: "证明材料",
        field: "weight",
        width:200,
        cellRendererFramework: selfEvaluationInfoUploadComponent,
        suppressSizeToFit: true,
        suppressSorting : true,
      },{
        headerName: "评定",
        field: "auditRemark",
        width:380,        
        suppressSorting : true,
        cellRendererFramework : selfEvaluationAuditQuestComponent,
      },     
      {
        headerName: "操作",
        field: "weight",
        width:150,
        autoHeight: true,
        cellRendererFramework: symbolInfoFinishOperationComponent,
        suppressSorting : true     
      }  
    ]
  }

  getCheckAuditListColumn(){
    return [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        pinnedRowCellRendererParams: { style: { color: "blue" } },
        width: 50        ,
        cellClass: (params) => {        
          return params.data.evalEventQuest.isFillOutAudit == 0 ? 'has_not_audited' : ''          
        }
      },{
        headerName: "评估点",
        suppressSorting : true,
        field: "questName",
        width:120        ,
        cellClass: (params) => {          
          return params.data.evalEventQuest.isFillOutAudit == 0 ? 'has_not_audited' : ''          
        }        
      },
      {
        headerName: "自评",
        suppressSorting : true,
        field: "dictionaryCode",
        width:350,      
        autoHeight : true,    
        cellRendererFramework: selfEvaluationInfoQuestComponent, 
        cellClass: (params) => {          
          return params.data.evalEventQuest.isFillOutAudit == 0 ? 'has_not_audited' : ''          
        }       
      },
      {
        headerName: "自评说明",  
        field: "dictionaryDescription",
        width:150,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : selfEvaluationInfoRemarksComponent,
        cellClass: (params) => {          
          return params.data.evalEventQuest.isFillOutAudit == 0 ? 'has_not_audited' : ''          
        }        
      },{
        headerName: "证明材料",
        field: "weight",
        width:200,
        cellRendererFramework: selfEvaluationInfoUploadComponent,
        suppressSizeToFit: true,
        suppressSorting : true,  
        cellClass: (params) => {          
          return params.data.evalEventQuest.isFillOutAudit == 0 ? 'has_not_audited' : ''          
        }      
      },
      {
        headerName: "评定说明",
        field: "auditRemark",
        width:160,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : symbolInfoAuditRemarksComponent,      
        cellClass: (params) => {          
          return params.data.evalEventQuest.isFillOutAudit == 0 ? 'has_not_audited' : ''          
        }  
      },      
      {
        headerName: "操作",
        field: "weight",
        width:90,
        cellRendererFramework: symbolInfoOperationComponent,
        suppressSorting : true,
        cellClass: (params) => {          
          return params.data.evalEventQuest.isFillOutAudit == 0 ? 'has_not_audited' : ''          
        }
      }
      // {
      //   headerName: '',
      //   field: '',
      //   minWidth: 10,
      //   suppressResize: true
      // }
    ]
  }
  getListColumn(){
    return [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        pinnedRowCellRendererParams: { style: { color: "blue" } },
        width: 50        ,

      },{
        headerName: "评估点",
        suppressSorting : true,
        field: "questName",
        width:120        ,
       
      },
      {
        headerName: "自评",
        suppressSorting : true,
        field: "dictionaryCode",
        width:350,      
        autoHeight : true,    
        cellRendererFramework: selfEvaluationInfoQuestComponent, 
     
      },
      {
        headerName: "自评说明",  
        field: "dictionaryDescription",
        width:150,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : selfEvaluationInfoRemarksComponent,
      
      },{
        headerName: "证明材料",
        field: "weight",
        width:200,
        cellRendererFramework: selfEvaluationInfoUploadComponent,
        suppressSizeToFit: true,
        suppressSorting : true,  
   
      },
      {
        headerName: "评定说明",
        field: "auditRemark",
        width:160,
        suppressSizeToFit: true,
        suppressSorting : true,
        cellRendererFramework : symbolInfoAuditRemarksComponent,      
 
      },      
      {
        headerName: "操作",
        field: "weight",
        width:90,
        autoHeight: true,
        cellRendererFramework: symbolInfoOperationComponent,
        suppressSorting : true,
      }
      // {
      //   headerName: '',
      //   field: '',
      //   minWidth: 10,
      //   suppressResize: true
      // }
    ]}
}
