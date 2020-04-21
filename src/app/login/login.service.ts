import { Injectable } from '@angular/core';
import { Http,URLSearchParams,Headers } from '@angular/http';
import { AuthenticationService } from '../core/services/auth.service';
import { ConfigService } from '../core/services/config.service';
import { ResponseHandleService } from '../core/services/responseHandle.service';
import { ApiUrl } from '../share/enum/ApiUrl.enum';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
declare var Cookies: any;
declare var SockJS: any;
declare var Stomp: any;
@Injectable({
  providedIn: 'root'
})
export class loginService {
  constructor(
    private _http : HttpClient,
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }
  
  checkToken() : Promise<any>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        let accessToken = Cookies.getJSON('accessToken')
        if (accessToken == '11111'){
          resolve(true)
        }else{
          let cookiePara={ expires: 999 }
          console.log(11111)
          Cookies.set('accessToken', '11111', cookiePara); 
          resolve(true)
        }        
      },1000)
    }).then(()=>{
      return true 
    })
  }

  login(parameter: any) : Promise<any> {
    let params = new HttpParams();
    let post_data = {"loginName":parameter.username,"password":parameter.password}
    return this._http.post(this._configService.adminApiUrl() + ApiUrl.login,post_data,{params:params})
      .toPromise()
      .then(res =>
        this._responseHandleService.extractDataSuccess(res)
      )
      .catch(error =>
        this._responseHandleService.handleError(error)
      );    
  }

  connectSocketMessage() {
    var ws = new SockJS(`http://${window.location.host}/teamworkapi/teamworkapiEndpoints`);
    var client = Stomp.over(ws)
    return client
  }

  getPermissionList() : Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())                         
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

}

