import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../core/services/auth.service';
import { ConfigService } from '../core/services/config.service';
import { ResponseHandleService } from '../core/services/responseHandle.service';
import { ApiUrl } from '../share/enum/ApiUrl.enum';
import { missionListOperationComponent } from './grid/mission-manage-operation.component';
import * as _moment from 'moment';
import { missionListPostOperationComponent } from './grid/mission-post-operation.component';
import { missionNameOperationComponent } from './grid/mission-name.component';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MissionManageService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter): Promise<any> {
    let params = new HttpParams()
    .set('pageSize',parameter.pageSize)
    .set('currentPage',parameter.currentPage)
    .set('status',parameter.status)
    .set('taskTitle',parameter.taskTitle);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionOfUnitSubmitCount(idList): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.getMissionOfUnitSubmitCount,idList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getPostMissionList(parameter): Promise<any> {
    let params = new HttpParams()
    .set('pageSize',parameter.pageSize)
    .set('currentPage',parameter.currentPage)
    .set('status',parameter.status)
    .set('taskTitle',parameter.taskTitle);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getPostMissionList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  addMission(info): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.addMission,info, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  updateMission(info): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.updateMission,info, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionInfo(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionInfo, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionFileList(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())    
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionFileList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionReceiver(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionReceiver, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }
  

  updateMissionState(idList,finishSts): Promise<any> {
    let params = new HttpParams().set('finishSts',finishSts);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.updateMissionState,idList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  deleteMission(idList): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.deleteMission,idList, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  reviewMission(remarksAudit,id): Promise<any> {
    let params = new HttpParams().set('id',id).set('remarksAudit',remarksAudit);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.reviewMission,remarksAudit, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  backMission(remarksAudit,id): Promise<any> {
    let params = new HttpParams().set('id',id).set('remarksAudit',remarksAudit);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.backMission,remarksAudit, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  postMission(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.postMission,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  updateMissionStrean(submitDec,id): Promise<any> {
    let params = new HttpParams().set('id',id).set('submitDec',submitDec);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())           
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.updateMissionStrean,submitDec, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  deleteMissionStreamFile(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.deleteMissionStreamFile,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionStreamDetail(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())           
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionStreamDetail, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionStreamFile(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())            
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionStreamFile, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionOfUnitStatusInfo(id,status): Promise<any> {
    let params = new HttpParams()
    .set('id',id)
    .set('status',status)
    .set('currentPage','1')
    .set('pageSize','999');
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionOfUnitStatusInfo, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMissionAuditInfo(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())         
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMissionAuditInfo,{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  confirmReceive(id): Promise<any> {
    let params = new HttpParams().set('id',id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())            
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.confirmReceive,{},{ params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getUnReadUnit(id,receiveSts): Promise<any> {
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    let params = new HttpParams().set('id',id)
    .set('receiveSts',receiveSts)
    .set('currentPage','1')
    .set('pageSize','999')    
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getUnReadUnit, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getUnFinishMissionCount(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getUnFinishMissionCount, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getMIssionNumberStream(): Promise<any> {
    let params = new HttpParams().set('unitId',this._authenticationService.getUnitInfo().id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())         
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getMIssionNumberStream, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
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
        headerName: "",
        field: "",
        cellRendererFramework: missionListOperationComponent,
        width: 100,
        suppressSizeToFit: true,
        suppressSorting : true,
      },
      {
        headerName: "任务名称",
        suppressSorting : true,
        field: "taskTitle",
        cellRendererFramework : missionNameOperationComponent,
        minWidth:150,
        suppressSizeToFit: true
      },
      {
        headerName: "开始时间",
        suppressSorting : true,
        field: "startAt",
        minWidth:150,
        cellRenderer: (data) => {          
          return data.value ? `${_moment(data.value).format("YYYY-MM-DD")}` : ''
        },
        suppressSizeToFit: true
      },
      {
        headerName: "截止时间",
        field: "endAt",
        minWidth:150,
        cellRenderer: (data) => {          
          return data.value ? `${_moment(data.value).format("YYYY-MM-DD")}` : ''
        },
        // suppressSizeToFit: true,
        suppressSorting : true,
      },
      {
        headerName: '',
        field: '',
        minWidth: 50,
        suppressResize: true,
        suppressSorting: true,
      }
    ]}

    getPostListColumn(){
      return [   
        {
          headerName: "",
          field: "",
          cellRendererFramework: missionListPostOperationComponent,
          width: 100,
          suppressSizeToFit: true,
          suppressSorting : true,
        },
        {
          headerName: "任务名称",
          suppressSorting : true,
          field: "taskTitle",
          minWidth:150,
          cellRenderer: (data) => {          
            return data.data.taskPO.taskTitle
          },
          // suppressSizeToFit: true
        },
        {
          headerName: "开始时间",
          suppressSorting : true,
          field: "startAt",
          minWidth:150,
          cellRenderer: (data) => {          
            return data.data.taskPO.startAt ? `${_moment(data.data.taskPO.startAt).format("YYYY-MM-DD")}` : ''
          },
          // suppressSizeToFit: true
        },
        {
          headerName: "截止时间",
          field: "endAt",
          minWidth:150,
          cellRenderer: (data) => {          
            return data.data.taskPO.endAt ? `${_moment(data.data.taskPO.endAt).format("YYYY-MM-DD")}` : ''
          },
          // suppressSizeToFit: true,
          suppressSorting : true,
        },
        {
          headerName: '',
          field: '',
          minWidth: 50,
          suppressResize: true,
          suppressSorting: true,
        }
      ]}
}
