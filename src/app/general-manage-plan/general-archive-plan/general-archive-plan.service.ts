import { GeneralArchivePlanTreeData } from './general-archive-plan.component';
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
export class generalArchivePlanService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getList(parameter,parentId) {
    let unitId = parameter.unitId ? parameter.unitId : this._authenticationService.getUnitInfo().id
    let params = new HttpParams()
      .set('unitId',unitId)
      .set('parentId',parentId)
      .set('disabled',parameter.disabled)
    if (!parentId){
      params = params.delete('parentId')
    }
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())         
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.getStorageScheduleLIstByParentId,
      {
          pageSize : parameter.pageSize,
          currentPage : parameter.currentPage
      }
    , { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  addStorageSchedule(parameter): Promise<any> {
    let params = new HttpParams();    
    parameter.unitId = this._authenticationService.getUnitInfo().id    
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.addStorageSchedule,parameter, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getStorageReviewCountById(): Promise<any> {
    let params = new HttpParams().set('unitId',this._authenticationService.getUnitInfo().id)   ;
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getStorageReviewCountById, { params: params, headers: headers,responseType:'text' })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  deleteStorageSchedule(ids): Promise<any> {
    let params =  new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())  
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.deleteStorageSchedule,ids, {params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  updateStorageSchedule(parameter): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())  
    parameter.unitId = this._authenticationService.getUnitInfo().id    
    return this._http.put(this._configService.teamrowkApiUrl() + ApiUrl.updateStorageSchedule,parameter, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  reportStorageSchedule(): Promise<any> {
    let params = new HttpParams().set('unitId',this._authenticationService.getUnitInfo().id);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())     
    return this._http.post(this._configService.teamrowkApiUrl() + ApiUrl.reportStorageSchedule,{}, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  formatTreeNode(treeLists:any[],level:number):GeneralArchivePlanTreeData[]{
    return treeLists.map(c=>{
      let info = c
      info.children = []
      info.isLoadedChildren = false,
      info.loading = false
      info.editing = false 
      info.level = level + 1
      info.id = c.id 
      return {
        id : c.id,
        level : level + 1,
        parentId : c.parentId,
        toggle : false,
        info : info
      }
    })
  }

}

