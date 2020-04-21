import {Injectable} from "@angular/core";
import { Http, Headers, Response,URLSearchParams,Jsonp } from '@angular/http';
import { ResponseHandleService } from '../../../core/services/responseHandle.service';
import { AuthenticationService } from '../../../core/services/auth.service';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable()
export class zTreeService {
    constructor(
        private _http : HttpClient,
        private jsonp:Jsonp,
        private http : Http,
        private _authenticationService : AuthenticationService,
        private _responseHandleService : ResponseHandleService
    ){}
    getTreeDataPaths(url : string,ids : Array<any>,otherParam : Object) : Promise<any> {
        let other_param : any = Object.assign({},otherParam)
        other_param.parentId = ids.join('*')
        let params = new HttpParams({fromObject:other_param})
        let headers = new HttpHeaders().append('accessToken',this._authenticationService.getAccessToken())                            
        return this._http.get(url,{ params: params,headers:headers })
                        .toPromise()
                        .then(res =>
                          this._responseHandleService.extractData(res)
                        )
                        .catch(error =>
                          this._responseHandleService.handleError(error)
                        );
    }
}