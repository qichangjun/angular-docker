import { Injectable } from '@angular/core';
import { Headers, Http, Jsonp, URLSearchParams } from '@angular/http';
import { MatSnackBar } from '@angular/material';

import { AuthenticationService } from './auth.service';
import { ConfigService } from './config.service';
import { ResponseHandleService } from './responseHandle.service';
import { ApiUrl } from '../../share/enum/ApiUrl.enum';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public snackBar: MatSnackBar,
    private jsonp:Jsonp,
    private http : Http,
    private _http : HttpClient,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }

  getImg() : Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
    headers.set('accessUser',this._authenticationService.getAccessUser())              
    headers.set('accessToken',this._authenticationService.getAccessToken())         
    params.append('photoUrl',this._authenticationService.getUserInfo().photoUrl) 
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getPhotoImg,{headers:headers,params:params,responseType:'blob'})
      .toPromise()
      .then(res =>
        res
      )
      .catch(error =>
        {
          console.log(error)
        }
      );    
  }

  getUnitInfo() : Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())               
    headers.set('accessToken',this._authenticationService.getAccessToken())         
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getUnitId,{headers:headers,params:params})
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        {
          return this._responseHandleService.handleError(error,'panelClass')
        }
      );    
  }

  getUserInfoBySSO() : Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())               
    headers.set('accessToken',this._authenticationService.getAccessToken())         
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getSSOInfoByToken,{headers:headers,params:params})
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        {
          return this._responseHandleService.handleError(error,'panelClass')
        }
      );    
  }

  getPermissionList() : Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())               
    headers.set('accessToken',this._authenticationService.getAccessToken())         
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getPermissionList,{headers:headers,params:params})
      .toPromise()
      .then(res =>{
          // console.log(res['_body'])
          return this._responseHandleService.extractData(res)
        }
        
      )
      .catch(error =>
        {
          return this._responseHandleService.handleError(error,'panelClass')
        }
      );    
  }


  getInfoByUserId(accessToken,userId) : Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())          
    headers.set('accessToken',accessToken)         
    params.append('userId',userId) 
    return this._http.get(this._configService.teamrowkApiUrl() + ApiUrl.getInfoByUserId,{headers:headers,params:params})
      .toPromise()
      .then(res =>
        this._responseHandleService.extractData(res)
      )
      .catch(error =>
        {
          this._responseHandleService.handleError(error,'panelClass')
        }
      );    
  }
}
