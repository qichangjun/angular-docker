import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';
import { ResponseHandleService } from '../../core/services/responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { symbolInfoAuditRemarksComponent } from '../assessment-symbol/symbol-info/grid/symbol-info-auditRemark.component';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScoreOrderDetailService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getSumquestscoreByUnitid(unitId): Promise<any> {
    let params = new HttpParams().set('unitid',unitId);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())              
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getSumquestscoreByUnitid, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getQuestLevelRankByUnitId(unitId): Promise<any> {
    let params = new HttpParams().set('unitId',unitId);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getQuestLevelRankByUnitId, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  getAvgScoreInfo(unitId):Promise<any>{
    return new Promise((resolve,reject)=>{
      Promise.all([this.getQuestGroupAvgScore(),
        this.getQuestGroupRankByUnitId(unitId),
        this.listquestgrpscoreByUnitid(unitId)]).then(res=>{
          res[2].forEach(c=>{            
            let row = res[0].find(grp=>grp.grpId == c.grpId)
            c.sum = parseInt(c.sum)
            c.avg = row ? row['ROUND(AVG(sum))'] : 0
            c.order = res[1][c.grpId]           
          })
        resolve(res[2])
      })
    })    
  }

  /**
   * 获取各评估域的平均分
   */
  getQuestGroupAvgScore(): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
       
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getQuestGroupAvgScore, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  /**
   * 通过单位id获取单位各评估域的排名
   * @param unitId 
   */
  getQuestGroupRankByUnitId(unitId): Promise<any> {
    let params = new HttpParams().set('unitId',unitId);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getQuestGroupRankByUnitId, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

  /**
   * 根据单位id查询各评估域的分数
   * @param unitId 
   */
  listquestgrpscoreByUnitid(unitId): Promise<any> {
    let params = new HttpParams().set('unitid',unitId);
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())      
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.listquestgrpscoreByUnitid, { params: params, headers: headers })
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );
  }

}
