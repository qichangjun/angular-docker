import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import { AuthenticationService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';
import { ApiUrl } from '../../enum/ApiUrl.enum';

@Injectable({
  providedIn: 'root'
})
export class RecordInfoService {
  constructor(
    private http : Http,
    private _authenticationService : AuthenticationService,
    private _configService : ConfigService,
    private _responseHandleService : ResponseHandleService
  ) { }


  // getDocumentId(recordId,documentUrl) : Promise<any> {
  //   let params = new HttpParams();
  //   let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())   
  //           
  //   params.set('recordId',recordId)
  //   params.set('documentUrl',documentUrl)
  //   return this._http.get(this._configService.ermsApiUrl() + ApiUrl.getDocumentId,{ headers:headers,params: params })
  //                   .toPromise()
  //                   .then(res =>
  //                     res['_body']
  //                   )
  //                   .catch(error =>
  //                     this._responseHandleService.handleError(error)
  //                   );
  // }
}
