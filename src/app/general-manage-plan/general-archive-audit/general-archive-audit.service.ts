import { PostReviewOpinionInfo } from './dialog/postReviewOpinion/postReviewOpinion.dialog';
import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class generalArchiveAuditService {
  constructor(
    private http : Http,
    private _http : HttpClient,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter,parentId): Promise<any> {
    let unitId = parameter.unitId ? parameter.unitId : this._authenticationService.getUnitInfo().id    
    let params = new HttpParams()    
    .set('parentId',parentId)
    .set('unitId',unitId)
    .set('disabled',parameter.disabled)
    .set('currentPage',parameter.currentPage)
    .set('pageSize',parameter.pageSize)
    if (!parentId){
      params = params.delete('parentId')
    }
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())    
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getStoragePendingReviewLIstByParentId,
     { params : params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getUnitAuditDetail(unitId : string): Promise<any> {
    let params = new HttpParams().set('unitId',unitId)
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())  
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getUnitAuditDetail,
     { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  postReviewOpinion(info :　PostReviewOpinionInfo[],submitTag): Promise<any> {
    let params = new HttpParams().set('submitTag',submitTag);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())          
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.postReviewOpinion,info, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  passAudit(submitTag): Promise<any> {
    let params = new HttpParams().set('submitTag',submitTag);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.passAudit,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  selectAuditLevel(submitTag,rateIdAudit): Promise<any> {
    let params = new HttpParams()
    .set('submitTag',submitTag)
    .set('rateIdAudit',rateIdAudit)
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.selectAuditLevel,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

}

