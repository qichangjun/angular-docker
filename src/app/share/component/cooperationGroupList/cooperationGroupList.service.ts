import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';
import { ApiUrl } from '../../../share/enum/ApiUrl.enum';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CooperationGroupListService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }
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

  getToAuditUnit(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getToAuditUnit, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getAuditedUnit(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getAuditedUnit, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getAuditedGeneralArchiveUnit(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getAuditedGeneralArchiveUnit, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getToAuditGeneralArchiveUnit(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getToAuditGeneralArchiveUnit, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getCooperationGroupSelfEvaluationInfo():Promise<any> {
      return new Promise((resolve,reject)=>{
        Promise.all([this.getCooperationGroupLists(),this.getToAuditUnit(),this.getAuditedUnit(),this.getUnitQuestProcess()]).then((res)=>{                  
          res[0].forEach(cooperationGroup=>{
            cooperationGroup.unitList.forEach(unit=>{
              unit.toAuditInfo = res[1][unit.id] || false    
              unit.auditedInfo = res[2][unit.id] || false
              let unitQuestInfo = res[3][unit.id] ? res[3][unit.id][0] : false 
              unit.unitQuestInfo = unitQuestInfo
            })
          })          
          resolve(res[0])
        })
      })
  }

  getUnitQuestProcess():Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getUnitQuestProcess, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getCooperationGroupGeneralArchiveInfo():Promise<any> {
    return new Promise((resolve,reject)=>{
      Promise.all([this.getCooperationGroupLists(),this.getToAuditGeneralArchiveUnit(),this.getAuditedGeneralArchiveUnit()]).then((res)=>{          
        res[0].forEach(cooperationGroup=>{
          cooperationGroup.unitList.forEach(unit=>{
            unit.toAuditInfo = res[1][unit.id] || false
            unit.auditedInfo = res[2][unit.id] || false
          })
        })
        resolve(res[0])
      })
    })
}
}
